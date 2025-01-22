// This script adds new words and removes offensive words from FILIPINO_WORDS_MAIN.txt
// FILIPINO_WORDS_MAIN.txt was created using Aspell + Filipino wordlist and Tagalog Dictionary Scraper
// http://aspell.net/
// https://github.com/raymelon/tagalog-dictionary-scraper/blob/master/tagalog_dict.txt

import { FILE_PATHS } from "./config/config";
import * as fs from "fs/promises";
import { IFilePaths, IWordLists } from "./config/interfaces";


/**
 * Reads a text file and returns an array of words.
 *
 * @param {string} filePath - The path to the text file.
 * @returns {Promise<string[]>} A promise that resolves to an array of lowercase, trimmed words.
 *                              Filters out empty lines.
 * @throws {Error} If the file cannot be read.
 */

export const getWordsFromFile = async (filePath: string): Promise<string[]> => {
    try {

        // Validate file extension
        if (!filePath.endsWith('.txt')) {
            throw new Error("Invalid file type. Only supports files ending in .txt.");
        }

        // Read the file
        const txtFileContent = await fs.readFile(filePath, 'utf-8');
        
        if (!txtFileContent) {
            console.warn(`File at ${filePath} is empty.`);
            return [];
        };

        // Process and return file content
        const words = txtFileContent
            .split("\n")
            .map((word: string) => word.trim().toLowerCase())
            .filter((word: string) => word != "");
        
        if (words.length === 0) {
            console.warn(`File at ${filePath} contains no valid words.`)
        };

        return words;

    } catch (error) {
        console.error(`Error reading file path: ${filePath}: `, error);
        throw error;
    }
}

/**
 * Reads the original, removed, and added word files and returns their contents as arrays.
 *
 * @param {IFilePaths} params - Object containing file paths for the original, removed, and added word lists.
 * @returns {Promise<IWordLists>}
 *          A promise that resolves to an object with arrays of words from each file.
 * @throws {Error} If any file cannot be read, the function will throw an error and stop execution.
 */


export const readWordFiles = async (params: IFilePaths): Promise<IWordLists> => {
    const { originalWordsPath, removedWordsPath, addedWordsPath } = params;

    try {
        const originalWords = await getWordsFromFile(originalWordsPath);
        const removedWords = await getWordsFromFile(removedWordsPath);
        const addedWords = await getWordsFromFile(addedWordsPath);

        return { originalWords, removedWords, addedWords };
    } catch (error) {
        console.error("Error reading files: ", error);
        throw new Error("Error reading files.");
    }
}

/**
 * Consolidates word lists by combining the original and added words,
 * removing any words found in the removed words list, and sorting the result alphabetically.
 *
 * Steps:
 * 1. Combines original and added words into a deduplicated list.
 * 2. Filters out words that appear in the removed words list.
 * 3. Sorts the final list in alphabetical order.
 *
 * @param {IWordLists} params - An object containing:
 *   - originalWords: Array of words from the master word list.
 *   - removedWords: Array of words to be excluded.
 *   - addedWords: Array of additional words to be included.
 *
 * @returns {Promise<string[]>} A promise that resolves to a sorted array of unique, filtered words.
 *
 * @throws {Error} If an error occurs during the consolidation process.
 */

export const consolidateWordFiles = async (params: IWordLists): Promise<string[]> => {
    const { originalWords, removedWords, addedWords } = params;

    try {
        const combinedFileContents = [...new Set([...originalWords, ...addedWords])];
        const filteredWords = filterRemovedWords( { originalAndAddedWords: combinedFileContents,  removedWords });
        const sortedWords = sortWordsAlphabetically({ filteredWords } );

        return sortedWords
    } catch (error) {
        console.error("Error consolidating puzzle words list: ", error);
        throw error;
    }
}

/**
 * Filters out words that appear in the removed words list from a combined list of original and added words.
 *
 * Steps:
 * 1. Converts the removed words list into a Set for efficient lookup.
 * 2. Filters the combined word list to exclude any words found in the removed words list.
 *
 * @param {Object} params - An object containing:
 *   - originalAndAddedWords: Array of words from the combined original and added word lists.
 *   - removedWords: Array of words to be excluded from the final list.
 *
 * @returns {string[]} An array of filtered words.
 *
 * @throws {Error} If an error occurs during the filtering process.
 */

export const filterRemovedWords = (params: { originalAndAddedWords: string[], removedWords: string[] }): string[] => {
    const {originalAndAddedWords, removedWords} = params
    try {
        const removedWordsSet = new Set(removedWords);
        const filteredWords = originalAndAddedWords.filter((word: string) => !removedWordsSet.has(word));
    
        return filteredWords;

    } catch (error) {
        console.error("Error filter words list: ", error);
        throw error;
    }
}

/**
 * Sorts an array of filtered words in alphabetical order.
 *
 * Steps:
 * 1. Takes an array of filtered words.
 * 2. Sorts the words alphabetically in ascending order (A-Z).
 *
 * @param {Object} params - An object containing:
 *   - filteredWords: Array of words to be sorted.
 *
 * @returns {string[]} A sorted array of words in alphabetical order.
 *
 * @throws {Error} If an error occurs during the sorting process.
 */

export const sortWordsAlphabetically = (params: { filteredWords: string[] }): string[] => {
    const { filteredWords } = params;

    try {
        return filteredWords.sort();

    } catch (error) {
        console.error("Error alphabetizing words list: ", error);
        throw error;
    } 
}

/**
 * Saves the sorted puzzle words to a specified file.
 *
 * Steps:
 * 1. Joins the sorted words into a single string, separating each word with a newline.
 * 2. Writes the content to the provided file path asynchronously.
 *
 * @param {string[]} sortedWords - An array of alphabetically sorted puzzle words to be saved.
 * @param {string} filePath - The file path where the puzzle words will be saved.
 *
 * @returns {Promise<void>} A promise that resolves when the file is successfully written.
 *
 * @throws {Error} If an error occurs while writing to the file.
 */

export const savePuzzleWordsToFile = async (sortedWords: string[], filePath: string): Promise<void> => {
    try {
        await fs.writeFile(filePath, sortedWords.join("\n"), "utf-8");
        console.log(`Puzzle words list saved to ${filePath}`);
    } catch (error) {
        console.error("Error saving puzzle words to file: ", error);
        throw error;
    }
}

/**
 * Processes the puzzle words by reading, consolidating, and saving them to a file.
 *
 * Workflow:
 * 1. Reads the original, added, and removed word files.
 * 2. Consolidates the word lists by combining, filtering, and sorting them.
 * 3. Saves the final list of puzzle words to the specified file path.
 *
 * @returns {Promise<void>} A promise that resolves when the entire process completes successfully.
 *
 * @throws {Error} If any step in the process (reading, consolidating, or saving) fails.
 */

export const processPuzzleWords = async (): Promise<void> => {
    try {
        const wordFiles = await readWordFiles(FILE_PATHS);
        const consolidatedWordFiles = await consolidateWordFiles(wordFiles);
        await savePuzzleWordsToFile(consolidatedWordFiles, FILE_PATHS.puzzleWordsPath);

        console.log("Puzzle words processed and saved successfully!")

    } catch (error) {
        console.error( "Error processing puzzle words: ", error);
    }
}

processPuzzleWords();