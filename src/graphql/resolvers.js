
const { Types, model } = require('mongoose');

const User = require("../models/User");
const Quest = require("../models/Quest");
const { json } = require('express');
const qr = require('qrcode');


module.exports = {


    Query: {

        getUserByEmail: async (_, { email }) => {
            const findedUser = await User.findOne({ email: email }).exec();

            return {
                id: findedUser.id,
                displayName: findedUser.displayName,
                password: findedUser.password,
                email: findedUser.email,
            }

        },
        users: async (_, { }) => {
            const allUsers = await User.find()
            console.log(allUsers)
            return allUsers
        },
        getallquiz : async(_, {amount }) => {
            const allQuiz = await Quest.find().sort({ createdAt: -1}).limit(amount)
            console.log(allQuiz)
            return allQuiz
        },
    


        async getQuizQuestion(_, { question }) {
            const quizQuestion = await Quest.findOne({ question });
            return quizQuestion;
        },

    },
    Mutation: {
        async createUser(_, { userInput: { displayName, password, email } }) {
            const user = {
                displayName: displayName,
                password: password,
                email: email,
            }

            const newUser = new User(user)
            res = await newUser.save()

            return res
        },
        async addQuizQuestion(_, { questionInput: {  moduleName, question, answers } }) {
            const questiontype = {

                moduleName: moduleName,
                question: question,
                answers: answers
            }

            const quizQuestion = new Quest(questiontype);

            res2 = await quizQuestion.save();
            return res2;
        },



        async editUser(_, { ID, userInput: { displayName, password } }) {
            const wasEdited = (await User.updateOne({ _id: ID }, { displayName: displayName, password: password })).modifiedCount;
            return wasEdited; //1 if smt was editied , 0 if nothing was editied
        }
    }

}