import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';

function Result() {
  const state = useSelector((state) => state);
  const { result } = state.exam;
  const correct = result.correct > result.incorrect ? true : false;
  if (state.exam.start === true) {
    return (
      <div className="container fs-3">
        <div className="row">
          <div className="col col-lg-4">
            <p className={correct ? 'h1' : 'h3'}>Correct</p>
          </div>
          <div className="col-auto">
            <Badge bg="success">{result.correct}</Badge>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-4">
            <p className={!correct ? 'h1' : 'h3'}>Incorrect</p>
          </div>
          <div className="col-auto">
            <Badge bg="danger">{result.incorrect}</Badge>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-4">
            <p className="h3">Attempted </p>
          </div>
          <div className="col-auto">
            <Badge bg="primary">
              {Object.keys(state.exam.answerKey).length}
            </Badge>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-4">
            <p className="h3">Total</p>
          </div>
          <div className="col-auto">
            <Badge bg="primary">{state.exam.total}</Badge>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center mt-5">
        <h4>Please start the exam then click on Result to check your score.</h4>
      </div>
    );
  }
}

export { Result };
