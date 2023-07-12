import { createSlice } from '@reduxjs/toolkit'

export const certification = createSlice({
  name: 'certificate',
  initialState: {
    active: {
      "title": "",
      "length": 0,
      "format": 0,
      "href": "",
      "active": false,
      "description": [],
      "links": [],
      "file": "",
      "test": "",
      "jsonData": null,
    }
  },
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload
    },

    setJSON: (state,action) => {
      state.active.jsonData = action.payload.questions
      state.active.format = action.payload.format
     },

    /*setFormat: (state,action) => {
      state.active.format = action.payload
     },*/

  }
});

/** Action creators are generated for each case reducer function  */
export const { 
  setActive,
  setJSON
} = certification.actions

export default certification.reducer
