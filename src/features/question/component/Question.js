import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { saveAnswer } from '../../exam';
import { FaCheck, FaTimes } from 'react-icons/fa';

function Question({ question, maxSelections, testType, answerKey }) {
  const choices = question.choices;
  const questionNumber = question.number;
  const answers = question.answer;

  const isSingleChoice = question.answer.length === 1;
  const isTestPractice = testType === 'practice';

  // Initialize the selectedOptions from the answerKey or set it as an empty array.
  const existingAnswer = answerKey.find(
    (answer) => answer.questionNumber === question.number
  );
  const [selectedOptions, setSelectedOptions] = useState(
    existingAnswer ? existingAnswer.choices : []
  );

  const dispatch = useDispatch();

  const handleCheckboxChange = (choice) => {
    let updatedOptions = [...selectedOptions];
    if (Array.isArray(selectedOptions) && selectedOptions.includes(choice)) {
      updatedOptions = updatedOptions.filter((opt) => opt !== choice);
    } else if (updatedOptions.length < maxSelections) {
      updatedOptions.push(choice);
    }
    setSelectedOptions(updatedOptions);

    dispatch(saveAnswer({ questionNumber, choices: updatedOptions }));
  };

  const handleRadioChange = (choice) => {
    setSelectedOptions([choice]);
    dispatch(saveAnswer({ questionNumber, choices: [choice] }));
  };

  const isCorrect = (choice) => {
    return selectedOptions.includes(choice) && answers.includes(choice);
  };

  const isIncorrect = (choice) => {
    return selectedOptions.includes(choice) && !answers.includes(choice);
  };

  if (!question) return null;

  return (
    <div className="question w-100 p-4">
      <div className="question-text">
        <strong>
          {question.number}. {question.q}
        </strong>
      </div>

      <Form>
        {Object.keys(choices).map((choice) => (
          <Form.Check
            key={choice}
            id={choice}
            type={isSingleChoice ? 'radio' : 'checkbox'}
            checked={
              Array.isArray(selectedOptions) && selectedOptions.includes(choice)
            }
            onChange={
              isSingleChoice
                ? () => handleRadioChange(choice)
                : () => handleCheckboxChange(choice)
            }
            label={
              !isTestPractice ? (
                <span>{choices[choice]}</span>
              ) : (
                <span
                  className={`${isCorrect(choice) ? 'text-success' : ''} 
                    ${isIncorrect(choice) ? 'text-danger' : ''} 
                    `}
                >
                  {choices[choice]}
                  {isCorrect(choice) && <FaCheck className={'ms-2'} />}
                  {isIncorrect(choice) && <FaTimes className={'ms-2'} />}
                </span>
              )
            }
          />
        ))}
      </Form>
    </div>
  );
}

export { Question };
