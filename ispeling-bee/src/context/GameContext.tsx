
// Use useState to sync state variables with local storage
// Use setState to update state

'use client';

import { createContext } from 'react';
import { IGameContext, IGameState } from './config/interfaces';
import { epoch } from './config/config';

const initialState: IGameState = {
    correctGuesses: new Set(),
    todaysAnswers: [],
    todaysLetters: '',
    todaysMiddleLetter: '',
    gameDate: epoch,
    lastGameDate: new Date(),
    yesterdaysAnswers: [],
    yesterdaysLetters: '',
    yesterdaysMiddleLetter: '',
    theme: 'light', // TODO
}

export const GameContext = createContext<IGameContext | null>(null);


