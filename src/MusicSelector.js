import React, { useState, useEffect } from 'react';

function MusicSelector({ selectedSong }) {
  const [audio, setAudio] = useState(null);

  // Set up the audio and ensure cleanup when the component unmounts
  useEffect(() => {
    // If there's already an audio instance, stop it first
    if (audio) {
      audio.pause();
    }

    // Create a new Audio instance and start playing it
    const newAudio = new Audio(selectedSong);
    newAudio.loop = true;
    newAudio.play();

    // Set the new audio object
    setAudio(newAudio);

    // Cleanup when the component unmounts or selectedSong changes
    return () => {
      if (newAudio) {
        newAudio.pause(); // Stop audio when the song changes or component unmounts
      }
    };
  }, [selectedSong]); // Now we only watch selectedSong, because audio is managed within useEffect

  return null; // This component doesn't need any visual output
}

export default MusicSelector;
