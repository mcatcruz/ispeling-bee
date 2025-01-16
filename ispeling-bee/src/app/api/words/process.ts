// This script adds new words and removes offensive words from FILIPINO_WORDS_MAIN.txt
// FILIPINO_WORDS_MAIN.txt was created using Aspell + Filipino wordlist and Tagalog Dictionary Scraper
// http://aspell.net/
// https://github.com/raymelon/tagalog-dictionary-scraper/blob/master/tagalog_dict.txt

import { FILE_PATHS } from "./config";
import { promises as fs } from "fs";
import { IFilePaths } from "./config/interfaces";


/**
 * Reads a text file and returns an array of words.
 *
 * @param {string} filePath - The path to the text file.
 * @returns {Promise<string[]>} A promise that resolves to an array of lowercase, trimmed words.
 *                              Filters out empty lines.
 * @throws {Error} If the file cannot be read.
 */

const getWordsFromFile = async (filePath: string): Promise<string[]> => {
    try {
        const txtFileContent = await fs.readFile(filePath, 'utf-8');

        return txtFileContent
            .split("\n")
            .map((word: string) => word.trim().toLowerCase())
            .filter((word: string) => word != "");

    } catch (error) {
        console.error(`Error reading file path: ${filePath}: `, error);
        return [];
    }
}

/**
 * Reads the original, removed, and added word files and returns their contents as arrays.
 *
 * @param {IFilePaths} params - Object containing file paths for the original, removed, and added word lists.
 * @returns {Promise<{ originalWords: string[]; removedWords: string[]; addedWords: string[] }>}
 *          A promise that resolves to an object with arrays of words from each file.
 * @throws {Error} If any file cannot be read, the function will throw an error and stop execution.
 */


const readWordFiles() = async (params: IFilePaths): Promise<{ originalWords: string[]; removedWords: string[]; addedWords: string[] }> => {
    const { originalWordsPath, removedWordsPath, addedWordsPath } = params;

    try {
        const originalWords = await getWordsFromFile(originalWordsPath);
        const removedWords = await getWordsFromFile(removedWordsPath);
        const addedWords = await getWordsFromFile(addedWordsPath);

        return { originalWords, removedWords, addedWords };
    } catch (error) {
        console.error("Error reading files: ", error);
        throw error;
    }
}

const consolidateWordFiles() = async (params: originalWords, addedWords) => {
    
}



Filter Words: filterRemovedWords(combinedWords, removedWords)
Sort Words: sortWordsAlphabetically(filteredWords)
Save to File: saveAllWordsToFile(sortedWords)