// This script adds new words and removes offensive words from FILIPINO_WORDS_MAIN.txt
// FILIPINO_WORDS_MAIN.txt was created using Aspell + Filipino wordlist and Tagalog Dictionary Scraper
// http://aspell.net/
// https://github.com/raymelon/tagalog-dictionary-scraper/blob/master/tagalog_dict.txt

import { FILE_PATHS } from "./config";
import { promises as fs } from "fs";


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
 * Reads original, added, and removed words from their respective files,
 * processes them, and creates a combined, filtered, and sorted list of words.
 *
 * Steps:
 * - Reads the three input files in parallel.
 * - Combines original and added words.
 * - Removes words listed in the removed words file.
 * - Sorts the resulting list alphabetically.
 *
 * @param   {CreateAllWordsParams}
 * @returns {Promise<void>} A promise that resolves to undefined if an error occurs.
 * @throws {Error} If any file cannot be read or processed.
 */

const createFilipinoWordsPuzzle = async ()