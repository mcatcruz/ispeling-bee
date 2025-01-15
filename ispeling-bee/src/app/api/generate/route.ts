import { NextResponse } from "next/server";

// Test words
const words: string[] = ["abakada", "mabuhay", "kamusta"];

const generatePuzzle = () => {
    const selectedWord: string = words[Math.floor(Math.random() * words.length)];
    const uniqueLetters: string = [...new Set(selectedWord)].join("");
    const middleLetter: string = uniqueLetters[Math.floor(Math.random() * uniqueLetters.length)];

    return { 
        availableLetters: uniqueLetters, 
        middleLetter, 
        answers: words.filter(word => word.includes(middleLetter))    
    }
}




export async function GET() {
    try {
        const puzzle = generatePuzzle()
        return NextResponse.json(puzzle);
    } catch (error) {
        console.error("Error generating new puzzles: ", error)
        return NextResponse.json({error: "Failed to generate new puzzles."}, {status: 500});
    }
}