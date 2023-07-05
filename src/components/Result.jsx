import React from 'react';

const Result = ({ questions, answers, onRestart }) => {
  const calculateScore = () => {
    let score = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });

    return score;
  };

  const score = calculateScore();

  return (
    <div>
      <h2>Your Result</h2>
      <p>Score: {score} / {questions.length}</p>
      <button onClick={onRestart}>Try again</button>
    </div>
  );
};

export default Result;

