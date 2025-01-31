import React, { ReactNode, useState, useMemo, useRef, useEffect } from 'react';
import { GameContext } from './GameContext';
import { epoch } from './config/config';
import { calculatePoints, incrementDups, isPangram, generatePointsMessage } from './utils/gameLogic';
import { IGameContext } from './config/interfaces';

export const GameProvider = ({ children } : { children: ReactNode }) => {
    const MIN_SCORE: number = 33;

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
    const [scoreLevels, setScoreLevels] = useState<number[]>([]);
    const [progressIndex, setProgressIndex] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [gameDateString, setGameDateString] = useState('');
    const [gameDateObj, setGameDateObj] = useState(new Date());
    const prevMaxScore = useRef<number | null>(null);

    const maxScore: number = useMemo(() => {
        return todaysAnswers.reduce((acc: number, word: string) => {
            return acc + calculatePoints({ word })
        }, 0);
    }, [todaysAnswers]);
    
    const correctGuessesArray: string[] = useMemo(() => [...correctGuesses], [correctGuesses]);
    
    const userScore: number = useMemo(() => {
        return correctGuessesArray.reduce(
            (acc: number, word: string): number => {
                return acc + calculatePoints({ word })
            }, 0
        )
    }, [correctGuessesArray]);

    useEffect(() => setGameDateObj(typeof gameDate === "string" ? new Date(gameDate) : gameDate), [gameDate]);

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

    useEffect(() => {
            setProgressIndex(scoreLevels.filter((v: number) => v <= userScore).length - 1);
    }, [scoreLevels, userScore]);

    useEffect(() => {
        const PROGRESS_PERCENTAGES: number[] = [0, 20, 40, 50, 60, 70, 80, 90, 100];
        setProgressPercentage(PROGRESS_PERCENTAGES[progressIndex])
    }, [progressIndex]);
    
    useEffect(() => {
        setGameDateString(gameDateObj.toISOString().split("T")[0])
    }, [gameDateObj]); 

    const themeColor: string = theme === "light" ? "white" : "#1c1b22";
    
    const value: IGameContext = useMemo(() => ({
        // State variables
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
        progressIndex, setProgressIndex,
        progressPercentage, setProgressPercentage,
        scoreLevels, setScoreLevels,
        gameDateString, setGameDateString,
        gameDateObj, setGameDateObj,


        // Calculated values
        MIN_SCORE, maxScore,
        correctGuessesArray, userScore,
        themeColor,

    }), [correctGuesses, todaysAnswers, todaysLetters, todaysMiddleLetter, gameDate, 
        lastGameDate, yesterdaysAnswers, yesterdaysLetters, yesterdaysMiddleLetter, theme, 
        pointsMessages, MIN_SCORE, maxScore, scoreLevels, correctGuessesArray, userScore,
        progressIndex, progressPercentage, themeColor, gameDateObj, gameDateString]);
    
    const submitGuess = (guess: string) => {
        if (guess.length < 4) {
            showMessage("Too short!");
            return;
        };

        if (!guess.includes(todaysMiddleLetter)) {
            showMessage("Missing middle letter");
            return; 
        }
        
        if (!todaysAnswers.includes(guess)) {
            showMessage("Not in word list");
            return;
        };
        
        if (correctGuesses.has(guess)) {
            showMessage("Already found");
            return;
        }

        correctGuesses.add(guess);

        const points = calculatePoints({word: guess});
        if (isPangram({word: guess})) {
            showMessage(`Pangram! + ${points}`); 
        } else {
            showMessage(generatePointsMessage(points))
        }
    };
    const startGame;
    const setYesterdaysAnswersandLastGameDate;
    const showMessage;



    return (        
        <GameContext.Provider value={value}>
        {children}
        </GameContext.Provider>
    )
};
