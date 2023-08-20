import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { saveAnswer } from '../../exam';

function Question(props) {
  const question = props.question;
  const maxSelections = props.maxSelections;
  const choices = question.choices;
  const questionNumber = question.number;
  
  // Initialize the selectedOptions from the answerKey or set it as an empty array.
  const existingAnswer = props.answerKey.find(answer => answer.questionNumber === question.number);
  const [selectedOptions, setSelectedOptions] = useState(existingAnswer ? existingAnswer.choices : []);
  
  const dispatch = useDispatch();

  const handleCheckboxChange = (choice) => {
    let updatedOptions = [...selectedOptions];
    if (Array.isArray(selectedOptions) && selectedOptions.includes(choice)) {
      updatedOptions = updatedOptions.filter(opt => opt !== choice);
    } else if (updatedOptions.length < maxSelections) {
      updatedOptions.push(choice);
    }
    setSelectedOptions(updatedOptions);
    
    dispatch(saveAnswer({ questionNumber, choices: updatedOptions }));
  };

  if (question) {
    return (
      <div className="question w-100 p-4">
        <div className="question-text">
          <strong>
            {question.number}.  {question.q}
          </strong>
        </div>

        <Form>
          {
            Object.keys(choices).map(choice => (
              <Form.Check
                key={choice}
                type="checkbox"
                label={choices[choice]}
                checked={Array.isArray(selectedOptions) && selectedOptions.includes(choice)}
                onChange={() => handleCheckboxChange(choice)}
              />
            ))
          }
        </Form>
      </div>
    );
  } else {
    return null;
  }
}

export { Question };