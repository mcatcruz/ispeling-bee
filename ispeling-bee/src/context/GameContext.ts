
// Use useState or useReducer + useEffect to sync state variables with local storage
// Use setState to update state

// Create a custom ReactContext hook so that we can hsare the states throughout the app
import { createContext } from 'react';
import { IGameContext, IGameState } from './config/interfaces';
import { epoch } from './config/utils';

const initialState: IGameState = {
    correctGuesses: new Set(),
    currentAnswers: [],
    currentLetters: '',
    currentMiddleLetter: '',
    gameDate: epoch,
    lastGameDate: new Date(),
    yesterdaysAnswers: [],
    yesterdaysLetters: '',
    yesterdaysMiddleLetter: '',
    theme: 'light', // TODO
    pointsMessages: {
        1: "good",
        5: "nice",
        6: "great",
        7: "excellent",
        8: "amazing",
    },
}

export const GameContext = createContext<IGameContext | null>(null);


