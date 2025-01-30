
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
    pointsMessages: { [key: number]: string };
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
    setPointsMessages: (pointsMessages: { [key: number]: string }) => void;

    maxScore: number;
    minScore: number;
    scoreLevels: Array<number>;
    correctGuessesArray: Array<string>;
    progressIndex: number;
    progressPercentage: number;
    userScore: number;
    themeColor: string;
    gameDateObj: Date;
    gameDateString: string;
}