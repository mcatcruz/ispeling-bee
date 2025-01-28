// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

import * as fs from "fs/promises";

import { savePuzzleWordsToFile } from "../process";

describe('savePuzzleWordsToFile function', () => {
    const mockWriteFile = jest.mocked(fs.writeFile);
    const mockFilePath = 'mockFilePath.txt';
    let mockSortedWords: string[]

    beforeEach(() => {
        jest.clearAllMocks();

        mockSortedWords = ['ako', 'ikaw', 'siya'];
    });

    it('should create a new file and content matches mockSortedWords, each string in a new line', async () => {

        const logSpy = jest.spyOn(console, 'log').mockImplementation();

        await expect(savePuzzleWordsToFile(mockSortedWords, mockFilePath));

        expect(mockWriteFile).toHaveBeenCalledTimes(1);
        expect(mockWriteFile).toHaveBeenCalledWith(mockFilePath, mockSortedWords.join('\n'), 'utf-8');
        expect(logSpy).toHaveBeenCalledWith(`Puzzle words list saved to ${mockFilePath}`);

        logSpy.mockRestore();
    });

    it('should handle file write errors', async () => {

        const mockError = new Error("Error saving puzzle words to file");

        // Mock the rejected value for fs.writeFile
        mockWriteFile.mockRejectedValueOnce(mockError);

        // Spy on the console.error to validate the catch block logging
        const errorSpy = jest.spyOn(console, 'error').mockImplementation();

        // Test that the function throws the correct error
        await expect(savePuzzleWordsToFile(mockSortedWords, mockFilePath)).rejects.toThrow(mockError);

        // Validate that console.error was called with the expected arguments
        expect(errorSpy).toHaveBeenCalledWith("Error saving puzzle words to file: ", mockError);
        
        errorSpy.mockRestore();
    });
})
