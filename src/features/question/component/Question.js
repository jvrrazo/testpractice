import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { saveAnswer } from '../../exam';
import { FaCheck, FaTimes } from 'react-icons/fa';

function Question(props) {
  const question = props.question;
  const maxSelections = props.maxSelections;
  const choices = question.choices;
  const questionNumber = question.number;
  const answers = question.answer;

  
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
          <strong >
            {question.number}.  {question.q}
          </strong>
        </div>

        <Form>
          {
            Object.keys(choices).map(choice => (
              
              <Form.Check style={{ color: 'red' }}
                key={choice}
                type="checkbox"
                
                checked={Array.isArray(selectedOptions) && selectedOptions.includes(choice)}
                onChange={() => handleCheckboxChange(choice)}


                label={
                  <span 
                    style={{ 
                      color: answers.includes(choice) && selectedOptions.includes(choice) ? 'green' :
                             !answers.includes(choice) && selectedOptions.includes(choice) ? 'red' : 'black'
                    }}>
                    {choices[choice]}
                    { answers.includes(choice) && selectedOptions.includes(choice) && <FaCheck style={{ marginLeft: '8px' }}/> }
                    { !answers.includes(choice) && selectedOptions.includes(choice) && <FaTimes style={{ marginLeft: '8px' }}/> }
                  </span>
                }
                
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