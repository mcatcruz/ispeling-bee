import React, { ReactNode, useState, useMemo, useRef, useEffect } from 'react';
import { GameContext } from './GameContext';
import { epoch } from './config/config';
import { calculatePoints, incrementDups } from './utils/gameLogic';
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

    const maxScore: number = useMemo(() => {
        return todaysAnswers.reduce((acc: number, word: string) => {
            return acc + calculatePoints({ word })
        }, 0);
    }, [todaysAnswers]);

    const minScore: number = 33; 
    
    const [scoreLevels, setScoreLevels] = useState<number[]>([]);
    const prevMaxScore = useRef<number | null>(null);

    useEffect(() => {
        if (prevMaxScore.current !== maxScore ) {
            const levels = [
                0,
                5,
                Math.floor(maxScore * 0.1),
                Math.floor(maxScore * 0.2),
                Math.floor(maxScore * 0.3),
                Math.floor(maxScore * 0.4),
                Math.floor(maxScore * 0.5),
                Math.floor(maxScore * 0.55),
                Math.floor(maxScore * 0.6),
            ].sort((a, b) => a - b);

            setScoreLevels(incrementDups(levels)); // Ensures unique levels
            prevMaxScore.current = maxScore; // Store last computed maxScore

        }
    }, [maxScore]);

    const correctGuessesArray: string[] = [...correctGuesses];

    const userScore = () => {
        return correctGuessesArray.reduce(
            (acc: number, word: string): number => {
                return acc + calculatePoints({ word })
            }, 0
        )
    };

    const progressIndex = 

    const progressPercentage;

    const themeColor;

    const gameDateObj;

    const gameDateString;
    
    const value: IGameContext = useMemo(() => ({
        correctGuesses, setCorrectGuesses,
        todaysAnswers, setTodaysAnswers,
        todaysLetters, setTodaysLetters,
        todaysMiddleLetter, setTodaysMiddleLetter,
        gameDate, setGameDate,
        lastGameDate, setLastGameDate,
        yesterdaysAnswers, setYesterdaysAnswers,
        yesterdaysLetters, setYesterdaysLetters,
        yesterdaysMiddleLetter, setYesterdaysMiddleLetter,
        theme, setTheme,
        pointsMessages, setPointsMessages,

        maxScore, minScore, scoreLevels,
        correctGuessesArray, userScore,
        progressIndex, progressPercentage,
        themeColor, gameDateObj, gameDateString,

    }), [correctGuesses, todaysAnswers, todaysLetters, todaysMiddleLetter, gameDate, 
        lastGameDate, yesterdaysAnswers, yesterdaysLetters, yesterdaysMiddleLetter, theme, 
        pointsMessages, maxScore, minScore, scoreLevels, correctGuessesArray, userScore,
        progressIndex, progressPercentage, themeColor, gameDateObj, gameDateString]);

    return (        
        <GameContext.Provider value={value}>
        {children}
        </GameContext.Provider>
    )
};
