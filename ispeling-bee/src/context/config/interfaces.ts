export interface IAnswer {
    answers: Array<string>;
    letters: string;
    middleLetter: string;
}

export interface IAllAnswers {
    allAnswers: Array<IAnswer>;
}

export interface IGameState {
    correctGuesses: Set<string>;
    todaysAnswersArray: Array<string>;
    todaysLetters: string;
    todaysMiddleLetter: string;
    todaysAnswersObj: IAnswer;
    gameDate: Date;
    lastGameDate: Date;
    yesterdaysAnswersArray: Array<string>;
    yesterdaysLetters: string;
    yesterdaysMiddleLetter: string;
    yesterdaysAnswersObj: IAnswer;
    theme: string; // TODO
};

export interface IGameContext extends IGameState {
    setCorrectGuesses: (guesses: Set<string>) => void;
    setTodaysAnswersArray: (todaysAnswersArray: Array<string>) => void;
    setTodaysLetters: (todaysLetters: string) => void;
    setTodaysMiddleLetter: (todaysMiddleLetter: string) => void;
    setTodaysAnswersObj: (todaysAnswerObj: IAnswer) => void;
    setGameDate: (gameDate: Date) => void;
    setLastGameDate: (lastGameDate: Date) => void;
    setYesterdaysAnswersArray: (yesterdaysAnswersArray: Array<string>) => void;
    setYesterdaysLetters: (yesterdaysLetters: string) => void;
    setYesterdaysMiddleLetter: (yesterdaysMiddleLetter: string) => void;
    setYesterdaysAnswersObj: (yesterdaysAnswerObj: IAnswer) => void;
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
    startGame: (allAnswers: IAllAnswers) => void;
    updateYesterdaysAnswers: (yesterdaysAnswerObj: IAnswer) => void;
}