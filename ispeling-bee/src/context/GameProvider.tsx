import React, { ReactNode, useState, useMemo } from 'react';
import { GameContext } from './GameContext';
import { epoch } from './config/config';
import { calculatePoints } from './utils/gameLogic';
import { IGameContext } from './config/interfaces';

export const GameProvider = ({ children } : { children: ReactNode }) => {
    const [correctGuesses, setCorrectGuesses] = useState<Set<string>>(new Set());
    const [todaysAnswers, setTodaysAnswers] = useState<string[]>([]);
    const [todaysLetters, setTodaysLetters] = useState<string>('');
    const [todaysMiddleLetter, setTodaysMiddleLetter] = useState<string>('');
    const [gameDate, setGameDate] = useState<Date>(epoch);
    const [lastGameDate, setLastGameDate] = useState<Date>(new Date());
    const [yesterdaysAnswers, setYesterdaysAnswers]= useState<string[]>([]);
    const [yesterdaysLetters, setYesterdaysLetters] = useState<string>('');
    const [yesterdaysMiddleLetter, setYesterdaysMiddleLetter] = useState<string>('');
    const [theme, setTheme] = useState<string>('light');
    const [pointsMessages, setPointsMessages] = useState<{ [key: number]: string }>({
        1: "good",
        5: "nice",
        6: "great",
        7: "excellent",
        8: "amazing",
    })

    const maxScore = useMemo(() => {
        return todaysAnswers.reduce((acc: number, word: string) => {
            return acc + calculatePoints(word);
        }, 0);
    }, [todaysAnswers]);
    
    const value: IGameContext = useMemo(() => ({
        correctGuesses,
        setCorrectGuesses,
        todaysAnswers,
        setTodaysAnswers,
        todaysLetters,
        setTodaysLetters,
        todaysMiddleLetter,
        setTodaysMiddleLetter,
        gameDate,
        setGameDate,
        lastGameDate,
        setLastGameDate,
        yesterdaysAnswers,
        setYesterdaysAnswers,
        yesterdaysLetters,
        setYesterdaysLetters,
        yesterdaysMiddleLetter,
        setYesterdaysMiddleLetter,
        theme,
        setTheme,
        pointsMessages,
        setPointsMessages
    }), [correctGuesses, todaysAnswers, todaysLetters, todaysMiddleLetter, gameDate, 
        lastGameDate, yesterdaysAnswers, yesterdaysLetters, yesterdaysMiddleLetter, theme, pointsMessages]);

    return (        
        <GameContext.Provider value={value}>
        {children}
        </GameContext.Provider>
    )
};
