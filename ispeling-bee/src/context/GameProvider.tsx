'use client';

import React, { ReactNode, useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { GameContext } from './GameContext';
import { epoch } from './config/config';
import { calculatePoints, incrementDups, isPangram, generatePointsMessage, generateAnswerObj } from './utils/gameLogic';
import { IGameContext, IAnswer } from './config/interfaces';
import { toast } from 'react-toastify';
import { isSameDay, differenceInDays } from 'date-fns';

export const GameProvider = ({ children } : { children: ReactNode }) => {
    const MIN_SCORE: number = 33;

    const [correctGuesses, setCorrectGuesses] = useState<Set<string>>(new Set());
    const [todaysAnswersArray, setTodaysAnswersArray] = useState<string[]>([]);
    const [todaysLetters, setTodaysLetters] = useState<string>('');
    const [todaysMiddleLetter, setTodaysMiddleLetter] = useState<string>('');
    const [todaysAnswersObj, setTodaysAnswersObj] = useState<IAnswer>({
        answers: [],
        letters: '',
        middleLetter: '',
    })
    const [gameDate, setGameDate] = useState<Date>(epoch);
    const [lastGameDate, setLastGameDate] = useState<Date>(new Date());
    const [yesterdaysAnswersArray, setYesterdaysAnswersArray]= useState<string[]>([]);
    const [yesterdaysLetters, setYesterdaysLetters] = useState<string>('');
    const [yesterdaysMiddleLetter, setYesterdaysMiddleLetter] = useState<string>('');
    const [yesterdaysAnswersObj, setYesterdaysAnswersObj] = useState<IAnswer>({
        answers: [],
        letters: '',
        middleLetter: '',
    })
    const [theme, setTheme] = useState<string>('light');
    const [scoreLevels, setScoreLevels] = useState<number[]>([]);
    const [progressIndex, setProgressIndex] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [gameDateString, setGameDateString] = useState('');
    const [gameDateObj, setGameDateObj] = useState(new Date());
    const prevMaxScore = useRef<number | null>(null);

    const maxScore: number = useMemo(() => {
        return todaysAnswersArray.reduce((acc: number, word: string) => {
            return acc + calculatePoints(word)
        }, 0);
    }, [todaysAnswersArray]);
    
    const correctGuessesArray: string[] = useMemo(() => [...correctGuesses], [correctGuesses]);
    
    const userScore: number = useMemo(() => {
        return correctGuessesArray.reduce(
            (acc: number, word: string): number => {
                return acc + calculatePoints(word)
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
    
    const showMessage = useCallback((message: string, type: "success" | "error" = "success") => {
        toast[type](message);
    }, []);

    const submitGuess = useCallback((guess: string) => {
        if (guess.length < 4) {
            showMessage("Too short!", "error");
            return;
        };

        if (!guess.includes(todaysMiddleLetter)) {
            showMessage("Missing middle letter", "error");
            return; 
        }
        
        if (!todaysAnswersArray.includes(guess)) {
            showMessage("Not in word list", "error");
            return;
        };
        
        if (correctGuesses.has(guess)) {
            showMessage("Already found", "error");
            return;
        }

        setCorrectGuesses((prevGuesses: Set<string>) => {
            const newGuesses: Set<string> = new Set(prevGuesses);
            newGuesses.add(guess);
            return newGuesses;
        });

        const points: number = calculatePoints(guess);

        if (isPangram(guess)) {
            showMessage(`Pangram! +${points}`, "success")
        } else {
            showMessage(generatePointsMessage(points), "success")
        } 
        
    }, [correctGuesses, todaysMiddleLetter, todaysAnswersArray, showMessage]);

    const startGame = ({ allAnswers }: { allAnswers: Array<IAnswer>}) => {
        const today = new Date();

        if (isSameDay(gameDate, today)) return false;

        // Store current gameDate before updating
        const prevLastGameDate = gameDate;

        // Reset state for a new game
        setGameDate(today);
        setLastGameDate(prevLastGameDate);
        setCorrectGuesses(new Set());

        // Generate today's and yesterday's answer objects
        const { todaysAnswersObj, yesterdaysAnswersObj } = generateAnswerObj({
            allAnswers,
            gameDate: today
        })

        // Fixes a bug where yesterday’s answers were incorrect on the first of the month.
        // Set today's and yesterday's answer objects
        updateYesterdaysAnswers(yesterdaysAnswersObj);

        updateTodaysAnswers(todaysAnswersObj)

    };

    // (Quick & Dirty Debugging lastGameDate accuracy)
    useEffect(() => {
        console.log("lastGameDate updated:", lastGameDate);
    }, [lastGameDate]);
    
    const updateYesterdaysAnswers = useCallback((yesterdaysAnswersObj: IAnswer) => { 
            if (differenceInDays(gameDate, lastGameDate) === 1) {
                // Use today's answers if yesterday's data is missing (bug fix for month transitions)
                setYesterdaysAnswersArray(todaysAnswersArray);
                setYesterdaysLetters(todaysLetters);
                setYesterdaysMiddleLetter(todaysMiddleLetter);
                setYesterdaysAnswersObj({
                    answers: yesterdaysAnswersArray,
                    letters: yesterdaysLetters,
                    middleLetter: yesterdaysMiddleLetter
                })
            } else {
                // Otherwise, use the provided yesterdaysAnswerObj
                setYesterdaysAnswersArray(yesterdaysAnswersObj.answers);
                setYesterdaysLetters(yesterdaysAnswersObj.letters);
                setYesterdaysMiddleLetter(yesterdaysAnswersObj.middleLetter);
                setYesterdaysAnswersObj(yesterdaysAnswersObj);
            }
    }, [gameDate, lastGameDate, todaysAnswersArray, todaysLetters, todaysMiddleLetter, 
        yesterdaysAnswersArray, yesterdaysLetters, yesterdaysMiddleLetter]);

    const updateTodaysAnswers = useCallback((todaysAnswersObj: IAnswer) => {
        // Set today's answers
        setTodaysAnswersArray(todaysAnswersObj.answers);
        setTodaysLetters(todaysAnswersObj.letters);
        setTodaysMiddleLetter(todaysAnswersObj.middleLetter);
        setTodaysAnswersObj(todaysAnswersObj);
    }, [])



    const value: IGameContext = useMemo(() => ({
        // State variables
        correctGuesses, setCorrectGuesses,
        todaysAnswersArray, setTodaysAnswersArray,
        todaysLetters, setTodaysLetters,
        todaysMiddleLetter, setTodaysMiddleLetter,
        todaysAnswersObj, setTodaysAnswersObj,
        gameDate, setGameDate,
        lastGameDate, setLastGameDate,
        yesterdaysAnswersArray, setYesterdaysAnswersArray,
        yesterdaysLetters, setYesterdaysLetters,
        yesterdaysMiddleLetter, setYesterdaysMiddleLetter,
        yesterdaysAnswersObj, setYesterdaysAnswersObj,
        theme, setTheme,
        progressIndex, setProgressIndex,
        progressPercentage, setProgressPercentage,
        scoreLevels, setScoreLevels,
        gameDateString, setGameDateString,
        gameDateObj, setGameDateObj,


        // Calculated values
        MIN_SCORE, maxScore,
        correctGuessesArray, userScore,
        themeColor, 
        
        // Actions
        submitGuess,
        showMessage,
        startGame,
        updateYesterdaysAnswers,
        updateTodaysAnswers

    }), [correctGuesses, todaysAnswersArray, todaysLetters, todaysMiddleLetter, todaysAnswersObj, gameDate, 
        lastGameDate, yesterdaysAnswersArray, yesterdaysLetters, yesterdaysMiddleLetter, yesterdaysAnswersObj, 
        theme, MIN_SCORE, maxScore, scoreLevels, correctGuessesArray, userScore,
        progressIndex, progressPercentage, themeColor, gameDateObj, gameDateString, 
        submitGuess, showMessage, startGame, updateYesterdaysAnswers, updateTodaysAnswers]);
    

    return (        
        <GameContext.Provider value={value}>
        {children}
        </GameContext.Provider>
    )
};
