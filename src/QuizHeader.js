import React from 'react';
import './QuizHeader.css';  // Import new CSS for styling

function QuizHeader({ screen }) {
  return (
    <div className={`quiz-header ${screen}`}>
      {screen === 'welcome' && (
        <div className="welcome-header">
          <h1>🚀 Welcome to the Quiz! 🧠</h1>
          <p>Get ready to test your knowledge and prove you're a true genius!</p>
        </div>
      )}
      {screen === 'quiz' && (
        <div className="quiz-header-started">
          <h1>🔥 Good Luck!</h1>
          <p>Answer the questions as quickly as you can! 🏃‍♂️</p>
        </div>
      )}
    </div>
  );
}

export default QuizHeader;


