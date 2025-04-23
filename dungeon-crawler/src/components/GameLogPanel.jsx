import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const GameLogPanel = () => {
  const log = useSelector((state) => state.log);
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  return (
    <div className="game-log">
      {log.map((entry, index) => (
        <div key={index}>{entry.message}</div>
      ))}
      <div ref={logEndRef} />
    </div>
  );
};

export default GameLogPanel;
