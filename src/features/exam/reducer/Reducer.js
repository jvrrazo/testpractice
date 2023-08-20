import { createSlice } from '@reduxjs/toolkit'

export const exam = createSlice({
  name: 'exam',
  initialState: {
    current: 1,
    start: false,
    total: 0,
    answerKey: [{
      questionNumber: 0,
        choices: [
          ]}
    ],
    answered: 0,
    result: {
      correct: 0,
      incorrect: 0,
    },
    maxSelections: 0,
    jsonData: null,
  },
  reducers: {
    setJSON: (state,action) => {
        state.jsonData = action.payload.action
    },

    questionRestart:(state) => {
      state.current = 1;
    },

    questionsAttempted: (state, action) => {
      const move = action.payload.action
      if (state.current < (state.total) && move === 'next') {
        state.current +=  1
      }
      if (state.current > 1 && move === 'prev') {
        state.current -=  1
      }
    },
    startExam: (state, action) => {
      state.start = action.payload.action
      if (state.start === false) {
        state.current = 1;
        state.answered = 0;
        state.result.incorrect = 0;
        state.result.correct = 0;
        state.answerKey = [];
      }
      
      state.total = action.payload.total
    },
    addOption: (state, action) => {
      if (state.answerKey.length < state.maxSelections) {
        state.answerKey.push(action.payload);
      }
    },
    removeOption: (state, action) => {
    // Finding index using the questionNumber for comparison
    const index = state.answerKey.findIndex(answer => answer.questionNumber === action.payload.questionNumber);
    if (index !== -1) {
        state.answerKey.splice(index, 1);
    }
},
    setResult: (state, action) => {
      state.result.correct = action.payload.correct;
      state.result.incorrect = action.payload.incorrect;
    },
    setMaxSelections: (state, action) => {
      state.maxSelections = action.payload;
    },
    
    saveAnswer: (state, action) => {
      const { questionNumber, choices } = action.payload;
  
      // Find the index of the question if it already exists in answerKey
      const index = state.answerKey.findIndex(q => q.questionNumber === questionNumber);
      console.log(questionNumber);
    //  const index = questionNumber-1;

      if (choices.length === 0) {
          if (index !== -1) {
              // Remove the question from answerKey if no choices are selected
              state.answerKey.splice(questionNumber, 1);
          }
      } else {
          if (index !== -1) {
              // Update the choices if the question already exists
              console.log(choices);
              state.answerKey[index].choices = choices;
          } else {
              // Add new question and choices if it doesn't exist
              state.answerKey.push({ questionNumber, choices });
          }
      }
  }
  }
});

/** Action creators are generated for each case reducer function  */
export const { 
  questionsAttempted,
  setAnswerKey,
  setResult,
  startExam,
  addOption,
  removeOption,
  setMaxSelections,
  saveAnswer 
} = exam.actions

export const selectAnswerKey = state => state.exam.answerKey;
export const selectMaxSelections = state => state.exam.maxSelections;

export default exam.reducer
