import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import './App.css'
import triviaImage from './images/trivia.jpg';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://wd40-trivia.onrender.com/api/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResult(false);
  };

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="App">
      <h1>My first trivia app</h1>
      <img src={triviaImage} alt='trivia' className="trivia-image"></img>
      {showResult ? (
        <Result
          questions={questions}
          answers={answers}
          onRestart={handleRestart}
        />
      ) : (
         <div className="question-container">
        <Question
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentIndex]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
        </div>
      )}
    </div>
  );
}

export default App;
