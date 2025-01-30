import React, { ReactNode, useState } from 'react';
import { GameContext } from './GameContext';
import { epoch } from './config/config';


export const GameProvider = (({ children } : { children: ReactNode }) => {
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

    const value = {
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
    }

    return (        
        <GameContext.Provider value={value}>
        {children}
        </GameContext.Provider>
    )
});
