const { model, Schema, Types } = require('mongoose');

const questionSchema = new Schema({
    questionName: {
        type: String,
        require: true
    },

    moduleName: {
        type: String,
        require: true
    },
    
    question : {
     type: String,
     required: true
    },

    answers: {
        type: [{
            letter: String,
            text: String,
            isCorrect: Boolean
          },{
            letter: String,
            text: String,
            isCorrect: Boolean
          },{
            letter: String,
            text: String,
            isCorrect: Boolean
          },{
            letter: String,
            text: String,
            isCorrect: Boolean
          }],
          required: true
    },

}, { timestamps: true })

module.exports = model('Quest', questionSchema);
