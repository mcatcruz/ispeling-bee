
export interface IGameState {
    correctGuesses: Set<string>;
    todaysAnswers: Array<string>;
    todaysLetters: string;
    todaysMiddleLetter: string;
    gameDate: Date;
    lastGameDate: Date;
    yesterdaysAnswers: Array<string>;
    yesterdaysLetters: string;
    yesterdaysMiddleLetter: string;
    theme: string; // TODO
};

export interface IGameContext extends IGameState {
    setCorrectGuesses: (guesses: Set<string>) => void;
    setTodaysAnswers: (todaysAnswers: Array<string>) => void;
    setTodaysLetters: (todaysLetters: string) => void;
    setTodaysMiddleLetter: (todaysMiddleLetter: string) => void;
    setGameDate: (gameDate: Date) => void;
    setLastGameDate: (lastGameDate: Date) => void;
    setYesterdaysAnswers: (yesterDaysAnswers: Array<string>) => void;
    setYesterdaysLetters: (yesterdaysLetters: string) => void;
    setYesterdaysMiddleLetter: (yesterdaysMiddleLetter: string) => void;
    setTheme: (theme: string) => void;
    setProgressIndex: (progressIndex: number) => void;
    setProgressPercentage: (progressPercentage: number) => void;
    setScoreLevels: (scoreLevels: Array<number>) => void;
    setGameDateString: (gameDateString: string) => void;
    setGameDateObj: (gameDateObj: Date) => void; 

    maxScore: number;
    scoreLevels: Array<number>;
    correctGuessesArray: Array<string>;
    progressIndex: number;
    progressPercentage: number;
    userScore: number;
    themeColor: string;
    gameDateObj: Date;
    gameDateString: string;

    submitGuess: (guess: string) => void;
    showMessage: (message: string, type?: "success" | "error") => void;
}