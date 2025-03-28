import React, { useState, useEffect } from 'react';
import InputHandler from './InputHandler';

const KeyListener = () => {
  const [keyPress, setKeyPress] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeyPress(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <InputHandler keyPress={keyPress} />;
};

export default KeyListener;
