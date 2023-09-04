import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';

type QuestionProps = {
  id: string;
  question: React.ReactNode;
};

type StepsFormProps = {
  questions: QuestionProps[];
  onSubmit: () => void;
};

const StepsForm: React.FC<StepsFormProps> = ({ questions, onSubmit }) => {
  const [current, setCurrent] = useState(0);
  const [isFilled, setIsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentQuestion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Add validation checks here
    // setCurrent and setIsFilled based on validation
  }, [current]);

  const nextQuestion = () => {
    // Validate the current question here
    if (current === questions.length - 1) {
      setIsFilled(true);
      onSubmit();
      return;
    }
    setCurrent(current + 1);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <div className="stepsForm">
      <ProgressBar current={current} total={questions.length} />
      <div ref={currentQuestion} className="question">
        {questions[current].question}
      </div>
      <button onClick={nextQuestion}>Next</button>
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default StepsForm;
