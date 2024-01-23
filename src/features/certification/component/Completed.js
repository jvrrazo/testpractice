import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Answer from '../../answers/Answer';

export default function Completed() {
  const state = useSelector((state) => state);
  const activeCert = state.certificate.active;
  const certificate = state.certificate;

  const answers = certificate.active.jsonData.map((question) => (
    <Answer key={question.number} question={question} />
  ));

  useEffect(() => {
    console.log('certificate', certificate.active.jsonData);
  }, []);

  return (
    <div>
      <h2>Congratulations, you finished</h2>
      {answers}
    </div>
  );
}
