
export interface IGameState {
    correctGuesses: Set<string>;
    currentAnswers: Array<string>;
    currentLetters: string;
    currentMiddleLetter: string;
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
    setAnswers: (currentAnswers: Array<string>) => void;
    setCurrentLetters: (currentLetters: string) => void;
    setCurrentMiddleLetter: (currentMiddleLetter: string) => void;
    setGameDate: (gameDate: Date) => void;
    setLastGameDate: (lastGameDate: Date) => void;
    setYesterdaysAnswers: (yesterDaysAnswers: Array<string>) => void;
    setYesterdaysLetters: (yesterdaysLetters: string) => void;
    setYesterdaysMiddleLetter: (yesterdaysMiddleLetter: string) => void;
    setTheme: (theme: string) => void;
    setPointsMessages: (pointsMessages: { [key: number]: string }) => void;
}