import { useCallback, useRef } from 'react';

const useSound = (enabled = true) => {
  const audioContextRef = useRef(null);

  const createOscillator = useCallback((frequency, duration) => {
    if (!enabled) return;
    
    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      console.error('Audio error:', error);
    }
  }, [enabled]);

  const playComparisonSound = useCallback(() => enabled && createOscillator(440, 0.1), [createOscillator, enabled]);
  const playSwapSound = useCallback(() => enabled && createOscillator(330, 0.1), [createOscillator, enabled]);
  const playSortedSound = useCallback(() => enabled && createOscillator(660, 0.1), [createOscillator, enabled]);
  const playCompletionSound = useCallback(() => {
    if (!enabled) return;
    setTimeout(() => createOscillator(440, 0.1), 0);
    setTimeout(() => createOscillator(550, 0.1), 100);
    setTimeout(() => createOscillator(660, 0.2), 200);
  }, [createOscillator, enabled]);

  return {
    playComparisonSound,
    playSwapSound,
    playSortedSound,
    playCompletionSound
  };
};

export default useSound;