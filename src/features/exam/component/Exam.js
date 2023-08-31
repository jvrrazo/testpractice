import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Alert } from 'react-bootstrap';

import { Question } from '../../question';
import { questionsAttempted, setAnswerKey, setResult } from '../../exam';

function Exam() {
  const [userWarning, setUserWarning] = useState(false);
  
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const activeCert = state.certificate.active;
  const { exam } = state;

  const toggleQuestions = (action) => {
    const currentAnswer = exam.answerKey.find(q => q.questionNumber === exam.current);

    // Check if the current answer is either undefined or empty
    if (!currentAnswer || (Array.isArray(currentAnswer.choices) && currentAnswer.choices.length === 0)) {
        setUserWarning(true);
        return;  // Don't proceed to the next/previous question
    }

    // If there's a valid answer, reset warning and navigate
    setUserWarning(false);

    if (action === 'next') {
        if (exam.current < exam.total) {
            dispatch(questionsAttempted({ action })); 
        }
    } else if (action === 'prev' && exam.current > 1) {
        dispatch(questionsAttempted({ action }));
    }
};

  const checkResult = (questions) => {
    const currentAnswer = exam.answerKey.find(q => q.questionNumber === exam.current);

    // Check if the current answer is either undefined or empty
    if (!currentAnswer || (Array.isArray(currentAnswer.choices) && currentAnswer.choices.length === 0)) {
        setUserWarning(true);
        return;  // Don't proceed to the next/previous question
    }

    // If there's a valid answer, reset warning and navigate
    setUserWarning(false);

    
    let correct = 0; 
    let incorrect = 0;
    const { answerKey } = exam;

    Object.keys(answerKey).forEach((qNum) => {
      const answers = questions[qNum - 1].answer;
      const ac1 = Object.values(answers).some(answer => answer === answerKey[qNum]);

      if (ac1) {
        correct++;
      } else {
        incorrect++;
      }
    });

    dispatch(setResult({ incorrect, correct }));
  }
  
  let questions = exam.start ? activeCert.jsonData : [];
  let maxSelection = questions[exam.current - 1]?.answer.length;

  console.log(exam.answered+" "+exam.total);

  return (
    <div className="mt-5">
      {userWarning && (
        <Alert variant={'danger'}>
          Please select an option from below to proceed.
        </Alert>
      )}
      <Card className="exam">
        <Question
          key={exam.current}
          testType={activeCert.type}
          question={questions[exam.current - 1]}
          answerKey={exam.answerKey}
          maxSelections={maxSelection}
        />
        <div className="exam-nav m-2 text-center">
          <Button className="mb-1 mb-sm-1" onClick={() => toggleQuestions('prev')} variant="primary">
            Prev
          </Button>{' '}
          <Button className="mb-1 mb-sm-1" onClick={() => toggleQuestions('next')} variant="primary">
            Next
          </Button>{' '}
          {exam.current >= exam.total && (
            <Button className="mb-1 mb-sm-1" onClick={() => checkResult(questions)} variant="secondary">
              Result
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

export { Exam };