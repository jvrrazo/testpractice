import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Alert } from 'react-bootstrap';
import { Question } from '../../question';
import { questionsAttempted, setAnswerKey, setResult } from '../../exam';

// Function to check if the current question is answered
const isCurrentQuestionAnswered = (current, answerKey) => {
  const currentAnswer = answerKey.find(q => q.questionNumber === current);
  return currentAnswer && (Array.isArray(currentAnswer.choices) && currentAnswer.choices.length !== 0);
};

function Exam() {
  const [userWarning, setUserWarning] = useState(false);
  
  const { certificate: { active: activeCert }, exam } = useSelector(state => state);
  const dispatch = useDispatch();

  const toggleQuestions = (action) => {
    if (!isCurrentQuestionAnswered(exam.current, exam.answerKey)) {
      setUserWarning(true);
      return;
    }
    
    setUserWarning(false);

    if (action === 'next' && exam.current < exam.total) {
      dispatch(questionsAttempted({ action }));
    } else if (action === 'prev' && exam.current > 1) {
      dispatch(questionsAttempted({ action }));
    }
  };

  const checkResult = (questions) => {
    if (!isCurrentQuestionAnswered(exam.current, exam.answerKey)) {
      setUserWarning(true);
      return;
    }
  
    if (!questions || questions.length === 0) {
      console.error("Questions array is empty or not defined.");
      return;
    }
  
    
    setUserWarning(false);
  
    
    let correct   = 0;
    let incorrect = 0; 
    const { answerKey } = exam;
    
   // console.log(answerKey);
    
    questions.forEach((questionObj) => {
     // console.log(`Question: ${questionObj.q}`);
    
      Object.entries(questionObj.choices).forEach(([key, value]) => {
        console.log(`Choice ${key}: ${value}`);
      });
    
      //console.log(`Answer: ${JSON.stringify(questionObj.answer)}`);
      //console.log(`Number: ${questionObj.number}`);
     
    
      if(answerKey[questionObj.number-1].questionNumber === questionObj.number) {
        const userAnswer = [...answerKey[questionObj.number-1].choices]; 
        const correctAnswer = [...questionObj.answer]; 
    
       
        console.log(`User Answer: ${JSON.stringify(userAnswer)}`);
        console.log(`Correct Answer: ${JSON.stringify(correctAnswer)}`);
        console.log('---');
       
        if(JSON.stringify(userAnswer.sort()) === JSON.stringify(correctAnswer.sort())) {
          correct++; 
        }else{
          incorrect++;
        }
      }
    });
    
    console.log(`Total correct answers: ${correct}`);

    dispatch(setResult({ incorrect, correct }));

  };
  
  const questions = exam.start ? activeCert.jsonData : [];
  const maxSelection = questions[exam.current - 1]?.answer.length;

  return (
    <div className="mt-5">
      {userWarning && (
        <Alert variant="danger">
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