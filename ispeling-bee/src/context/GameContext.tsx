
// Use useState to sync state variables with local storage
// Use setState to update state

import { createContext, useMemo } from 'react';
import { IGameContext, IGameState } from './config/interfaces';
import { epoch } from './config/config';
import { calculatePoints } from './utils/gameLogic';

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
    pointsMessages: {
        1: "good",
        5: "nice",
        6: "great",
        7: "excellent",
        8: "amazing",
    },
}

const maxScore = useMemo(() => {
    return todaysAnswers.reduce((acc: number, word: string): number => {
        return acc + calculatePoints(word), 0);
    }, [todaysAnswers]);

const minScore = 

export const GameContext = createContext<IGameContext | null>(null);


