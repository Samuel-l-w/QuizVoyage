import React, { useState, useEffect } from 'react';
import QuizHeader from './QuizHeader';
import questions from './questions';
import './App.css';

function QuizComponent({ onStartQuiz, effectsVolume }) {
  const [screen, setScreen] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedbackColor, setFeedbackColor] = useState('');
  const [answers, setAnswers] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setScreen('results');
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    const randomized = shuffleArray(questions);
    setShuffledQuestions(randomized);
    setCurrentQuestion(0);
    setAnswers({});
    setFeedbackColor('');
    setTimer(60);
    setIsTimerRunning(true);
    setScreen('quiz');

    if (onStartQuiz) {
      onStartQuiz();
    }
  };

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === shuffledQuestions[currentQuestion].answer;
    setFeedbackColor(isCorrect ? 'green' : 'red');
    setAnswers({ ...answers, [currentQuestion]: selectedAnswer });

    // Play sound effect
    const sound = new Audio(isCorrect ? '/sounds/correct.mp3' : '/sounds/wrong.mp3');
    sound.volume = effectsVolume ?? 1; // Use volume from props
    sound.play();

    setTimeout(() => {
      setFeedbackColor('');
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setScreen('results');
      }
    }, 1000);
  };

  // Progress percentage calculation
  const progressPercentage = (currentQuestion / shuffledQuestions.length) * 100;

  // Calculate the score
  const correctAnswers = Object.values(answers).filter(
    (answer, index) => answer === shuffledQuestions[index].answer
  ).length;

  // Define a motivational message based on score
  const getMotivationalMessage = () => {
    if (correctAnswers === shuffledQuestions.length) {
      return "Perfect! You're a quiz master!";
    } else if (correctAnswers >= shuffledQuestions.length * 0.7) {
      return "Great job! Keep it up!";
    } else if (correctAnswers >= shuffledQuestions.length * 0.4) {
      return "Good effort! Try again!";
    } else {
      return "Don't give up! Practice makes perfect!";
    }
  };

  return (
    <div className={`quiz-container ${screen} ${feedbackColor}`}>
      <QuizHeader screen={screen} />

      {screen === 'welcome' && (
        <div className="welcome-screen">
          <button onClick={startQuiz}>🔥 Let's Go!</button>
        </div>
      )}

      {screen === 'quiz' && shuffledQuestions.length > 0 && (
        <div className="quiz-screen">
          <h3>{shuffledQuestions[currentQuestion].question}</h3>
          {shuffledQuestions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
          <div className={`timer ${timer <= 10 ? 'danger' : ''}`}>
            <p>Time Left: {timer}s</p>
          </div>
          <div className="progress-container">
            <p>Question {currentQuestion + 1} of {shuffledQuestions.length}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {screen === 'results' && (
        <div className="results-screen">
          <h2>Quiz Results</h2>
          <p>
            You answered{' '}
            <span className="correct-answers">{correctAnswers}</span> out of{' '}
            {shuffledQuestions.length} correctly!
          </p>
          <p>{getMotivationalMessage()}</p>

          {/* Display a retry button */}
          <button onClick={startQuiz} className="retry-btn">
            Try Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizComponent;


