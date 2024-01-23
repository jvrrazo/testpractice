import { createSlice } from '@reduxjs/toolkit';

export const exam = createSlice({
  name: 'exam',
  initialState: {
    current: 1,
    start: false,
    finished: false,
    total: 0,
    answerKey: [],
    answered: 0,
    result: {
      correct: 0,
      incorrect: 0,
    },
    maxSelections: 0,
    jsonData: null,
  },
  reducers: {
    setJSON: (state, action) => {
      state.jsonData = action.payload.action;
    },

    questionRestart: (state) => {
      state.current = 1;
    },

    questionsAttempted: (state, action) => {
      const move = action.payload.action;
      if (state.current < state.total && move === 'next') {
        state.current += 1;
      }
      if (state.current > 1 && move === 'prev') {
        state.current -= 1;
      }
    },

    startExam: (state, action) => {
      state.start = action.payload.action;
      if (state.start === false) {
        state.current = 1;
        state.answered = 0;
        state.result.incorrect = 0;
        state.result.correct = 0;
        state.answerKey = [];
        state.finished = false;
      }

      state.total = action.payload.total;
    },
    addOption: (state, action) => {
      if (state.answerKey.length < state.maxSelections) {
        state.answerKey.push(action.payload);
      }
    },
    removeOption: (state, action) => {
      // Finding index using the questionNumber for comparison
      const index = state.answerKey.findIndex(
        (answer) => answer.questionNumber === action.payload.questionNumber
      );
      if (index !== -1) {
        state.answerKey.splice(index, 1);
      }
    },

    setResult: (state, action) => {
      state.result.correct = action.payload.correct;
      state.result.incorrect = action.payload.incorrect;
      state.finished = true;
    },

    setMaxSelections: (state, action) => {
      state.maxSelections = action.payload;
    },

    saveAnswer: (state, action) => {
      const { questionNumber, choices } = action.payload;
      //  console.log("questionNumber"+questionNumber);
      const index = state.answerKey.findIndex(
        (q) => q.questionNumber === questionNumber
      );

      //   console.log(index);

      if (choices.length === 0) {
        if (index !== -1) {
          // Remove the question from answerKey if no choices are selected
          // state.answered -= 1;
          state.answerKey.splice(index, 1);
        }
      } else {
        if (index !== -1) {
          // Update the choices if the question already exists
          state.answerKey[index].choices = choices;
        } else {
          // Add new question and choices if it doesn't exist
          // state.answered += 1;
          state.answerKey.push({ questionNumber, choices });
        }
      }

      //console.log("After:", JSON.stringify(state.answerKey));
    },
  },
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
} = exam.actions;

export const selectAnswerKey = (state) => state.exam.answerKey;
export const selectMaxSelections = (state) => state.exam.maxSelections;

export default exam.reducer;
