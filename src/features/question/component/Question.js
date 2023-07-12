import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

function Question(props) {
  const question = props.question;
  const answerKey = props.answerKey;
  const choices = question.choices;
  const answers = question.answer;
  const userSelectedChoice = answerKey[question.number] !== undefined
    ? answerKey[question.number] : -1;

  const renderIcon = (choice) => {
    const x2 = Object.values(answers).includes(choice) ? null : <FaTimesCircle className="radio-icon" />;
    return x2;
  };

  const renderText = (choice) => {
    return { color: selectedOption === choice ? 'black' : 'red' }
  }

  const [selectedOption, setSelectedOption] = useState(false);
  const handleOptionChange = (event, number, choice) => {
    props.markChoice(number, choice);
    setSelectedOption(null);
    const x2 = Object.values(answers).includes(choice) ? setSelectedOption(event.target.value) : null;
  };

  if (question) {
    return (
      <div className="question w-100 p-4">
        <div className="question-text">
          <strong>
            {question.number}.  {question.q}
          </strong>
        </div>
        {
          Object.keys(choices).map(choice => {
            return (
              <Form.Check
                key={Math.random()}
                className="question-option my-3"
                type="radio"
                name="question"
                checked={choice === userSelectedChoice ? 1 : 0}
                value={choice}
                onChange={(e) => handleOptionChange(e, question.number, choice)}
                label={<span>
                  {choices[choice]}
                  
                  {choice === userSelectedChoice ?
                    renderIcon(choice) : null}
                </span>}
                style={choice === userSelectedChoice ?
                  renderText(choice) : null}
              >
              </Form.Check>
            );
          }
          )
        }

      </div>
    );
  }
  else {
    return (<React.Fragment />)
  }
}

export { Question };