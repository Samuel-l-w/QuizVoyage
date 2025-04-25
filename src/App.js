import React, { useState } from 'react';
import QuizHeader from './QuizHeader';
import QuizComponent from './QuizComponent';
import BackgroundMusic from './BackgroundMusic';

function App() {
  const [playMusic, setPlayMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);    // Background music volume
  const [effectsVolume, setEffectsVolume] = useState(1);   // Sound effects volume
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Toggle for settings panel

  return (
    <div className="App">
      {/* Background Music Component */}
      <BackgroundMusic selectedSong="sounds/song1.mp3" playMusic={playMusic} volume={musicVolume} />

      {/* Quiz Header */}
      <QuizHeader />

      {/* Quiz Component */}
      <QuizComponent onStartQuiz={() => setPlayMusic(true)} effectsVolume={effectsVolume} />

      {/* Falling emojis for fun background effect */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="falling-emoji"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`, // Random delay to make them fall at different times
          }}
        >
          🎉
        </div>
      ))}

      {/* Settings Button */}
      <button 
        className="settings-btn"
        onClick={() => setIsSettingsOpen(prev => !prev)} 
        title="Settings"
      >
        ⚙️
      </button>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div className="settings-panel">
          <h3>Settings</h3>
          <div className="volume-controls">
            <label>
              🎵 Music Volume:
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              />
            </label>
            <label>
              🔊 Effects Volume:
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={effectsVolume}
                onChange={(e) => setEffectsVolume(parseFloat(e.target.value))}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
