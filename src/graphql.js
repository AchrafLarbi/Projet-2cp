import { gql } from "@apollo/client";

export const CREATE_QUIZ = gql`
  mutation Mutation($quizinput: QuizInput) {
  createQuiz(quizinput: $quizinput) {
    correctAnswer
    id
    moduleName
    propositions
    question
    selectedAnswer
    time
  }
}
`;


 export const GET_QUIZ_QUESTIONS = gql`
 query Quizs {
  quizs {
    correctAnswer
    createdAt
    id
    moduleName
    propositions
    question
    selectedAnswer
    time
  }
}
`;

export const GET_QUIZ_ITEMS_BY_QUESTION_ID = gql`
  query GetQuizIPropaByQuestionId($questionId: ID!) {
    getQuizPropaByQuestionId(questionId: $questionId) {
      quizItems {
        correctAnswer
        id
        question
        selectedAnswer
        userid
      }
      totalCount
    }
  }
`;

 export const GET_AVERAGE_TIME = gql`
  query GetAverageTime($questionId: ID!) {
    getAverageTime(questionId: $questionId)
  }
`;


export const GET_USER_BY_ID = gql`
  query GetUserByID($getUserByIdId: ID!) {
    getUserByID(id: $getUserByIdId) {
      displayName
      email
    }
  }
`;
export const DELETE_QUIZ = gql`
mutation DeleteQuiz($quizId: ID!) {
  deleteQuiz(quizId: $quizId) {
    message
  }
}
`;
export const DELETE_Quiz_propa = gql`
mutation Mutation($questionid: ID!) {
  deleteQuizPropa(questionid: $questionid) {
    message
  }
}
`;
