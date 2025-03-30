import React, { useEffect } from 'react';

const KeyPressListener = ({ onKeyPress }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (onKeyPress) {
        onKeyPress(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);

  return null;
};

export default KeyPressListener;
