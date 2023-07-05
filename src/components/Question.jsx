import React from 'react';

const Question = ({
  question,
  answers,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const handleRadioChange = (e) => {
    onAnswer(e.target.value);
  };

  return (
    <div>
      <h2>Question {currentIndex + 1}</h2>
      <p>{question}</p>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`question-${currentIndex}`}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleRadioChange}
              />
              {answer}
            </label>
          </li>
        ))}
      </ul>
      <button disabled={currentIndex === 0} onClick={onPrevious}>
        Previous
      </button>
      <button disabled={currentIndex === totalQuestions - 1} onClick={onNext}>
        Next
      </button>
      {currentIndex === totalQuestions - 1 && (
        <button onClick={onSubmit}>Submit</button>
      )}
    </div>
  );
};

export default Question;
