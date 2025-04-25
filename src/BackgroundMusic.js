import { useEffect, useRef } from 'react';

function BackgroundMusic({ selectedSong, playMusic, volume }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (playMusic) {
        audioRef.current.play().catch(err => console.log(err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playMusic, selectedSong]);

  // Set the volume whenever it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Set the volume to the passed prop value
    }
  }, [volume]);

  return (
    <audio ref={audioRef} src={selectedSong} loop />
  );
}

export default BackgroundMusic;

