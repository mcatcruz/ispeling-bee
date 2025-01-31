'use client';

import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

const MessageTest = () => {
    const gameContext = useContext(GameContext);

    if (!gameContext) return null;

    const { showMessage } = gameContext;

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <button 
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={() => showMessage("This is a test message!", "success")}
            >
                Show Success Message
            </button>
            <button 
                className="p-2 bg-red-500 text-white rounded-md mt-2"
                onClick={() => showMessage("This is an error message!", "error")}
            >
                Show Error Message
            </button>
        </div>
    );
};

export default MessageTest;
