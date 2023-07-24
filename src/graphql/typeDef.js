const { gql } = require('apollo-server');


module.exports = gql`
            


            type AnswerChoice {
                 letter: String!
                 text: String!
                 isCorrect: Boolean!
            } 
            # creation of database tables 

            type User {
            # univ
                id: ID!
                displayName: String!
                password: String!
                email: String!
            } 
            type Quest {
            id: ID!
            moduleName: String!
            question: String!
            answers: [AnswerChoice!]!
            }
 



            # query declaration goes here 

            type Query {
                #par id
                getQuizQuestion(question:String): Quest!
                getUserByEmail(email:String!): User!
                users: [User]
                getallquiz(amount: Int!): [Quest]
            }


            # mutation declaration  
            type Mutation {
                addQuizQuestion(questionInput: QuestionInput): Quest!
                createUser(userInput: UserInput ): User!
                editUser(ID: ID!, userInput: UserInput): Boolean
            }

            input AnswerChoiceInput {
                letter: String!
                 text: String!
                 isCorrect: Boolean!
            }
            


            input QuestionInput {
                moduleName: String!
                question: String!
                answers: [AnswerChoiceInput!]!  

            }
       
            input UserInput  {
                displayName: String!
                password: String!
                email: String!
            }

            schema {
                query: Query
                mutation: Mutation
             
            }


 
`