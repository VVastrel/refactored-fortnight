import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGameObjectToSquare } from '../redux/reducers/squaresReducer.js';
import Character from '../models/Character.js';

// TODO: Clean upt this mess

const PlayerCharacter = () => {
  const dispatch = useDispatch();
  const playerPosition = useSelector((state) => state.player.playerPosition);
  const squareId = `${playerPosition.x}-${playerPosition.y}`;

  useEffect(() => {
    // create new player character
    const character = new Character('player-1', 'Player', 'Hero', { hitPoints: 100, damage: 10 });

    // add player to the map
    dispatch(addGameObjectToSquare({ squareId: squareId, gameObject: character }));
  }, [dispatch, squareId]);

  return null;
};

export default PlayerCharacter;
