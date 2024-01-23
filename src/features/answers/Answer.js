import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Answer({ question }) {
  const givenAnswer = useSelector((state) =>
    state.exam.answerKey.find((a) => a.questionNumber === question.number)
  );
  const isCorrect = question.answer.every((a) =>
    givenAnswer.choices.includes(a)
  );

  return (
    <Card key={question.number} className="my-4 p-4">
      <h6 className={`text-${isCorrect ? 'success' : 'danger'} `}>
        {`Question ${question.number}:  ${isCorrect ? 'Correct' : 'Wrong'}`}
      </h6>
      <p>{question.q}</p>
      <div>
        {Object.keys(question.choices).map((choice) => (
          <p
            key={`${question.number}-${choice}`}
            className={`border p-1 m-1 
            ${
              question.answer.includes(choice)
                ? 'border-success bg-success bg-opacity-10'
                : ''
            }
            ${
              !isCorrect && givenAnswer.choices.includes(choice)
                ? 'border-danger bg-danger bg-opacity-10'
                : ''
            }
            
            `}
          >
            <input
              class="form-check-input mx-2"
              type={question.answer.length === 1 ? 'radio' : 'checkbox'}
              value={choice}
              disabled
              checked={givenAnswer.choices.includes(choice)}
            />
            {choice.toUpperCase()}. {question.choices[choice]}{' '}
            {isCorrect && question.answer.includes(choice) && (
              <span className="text-success text-end fw-bold">Correct</span>
            )}
            {!isCorrect && givenAnswer.choices.includes(choice) && (
              <span className="text-danger text-end fw-bold">Wrong</span>
            )}
          </p>
        ))}
      </div>
      {question.explanation && (
        <>
          <h6>Explanation</h6>
          <p>{question.explanation}</p>
        </>
      )}
    </Card>
  );
}
