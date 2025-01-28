// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

import * as fs from "fs/promises";

jest.mock('../../process', () => ({
    ...jest.requireActual("../../process"), 
    readWordFiles: jest.fn(),
    consolidateWordFiles: jest.fn(),
    savePuzzleWordsToFile: jest.fn(),
}));

import { consolidateWordFiles, processPuzzleWords, readWordFiles, savePuzzleWordsToFile } from  "../../process";
import { FILE_PATHS } from "../../config/config";

describe('processPuzzleWords function', () => {
    const mockReadWordFiles = jest.mocked(readWordFiles);
    const mockConsolidateWordFiles = jest.mocked(consolidateWordFiles);
    const mockSavePuzzleWordsToFile = jest.mocked(savePuzzleWordsToFile);

    const mockDependencies =  { 
        readWordFiles: mockReadWordFiles, 
        consolidateWordFiles: mockConsolidateWordFiles, 
        savePuzzleWordsToFile: 
        mockSavePuzzleWordsToFile 
    }

    const mockSortedWords = ["ako", "ikaw", "siya"];
    const mockWordsObject = {
        originalWords: ["ako", "ikaw", "puta"],
        addedWords: ["siya", "ako"],
        removedWords: ["puta"],
    };

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();

        mockReadWordFiles.mockResolvedValue(mockWordsObject);
        mockConsolidateWordFiles.mockResolvedValue(mockSortedWords);
        mockSavePuzzleWordsToFile.mockResolvedValue();
    })
 
    it("should integrate all functions and process puzzle words successfully", async () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation();

        await processPuzzleWords(FILE_PATHS, mockDependencies);

        expect(mockReadWordFiles).toHaveBeenCalledWith(FILE_PATHS);
        expect(mockConsolidateWordFiles).toHaveBeenCalledWith(mockWordsObject);
        expect(mockSavePuzzleWordsToFile).toHaveBeenCalledWith(mockSortedWords, FILE_PATHS.puzzleWordsPath);
        expect(logSpy).toHaveBeenCalledWith("Puzzle words processed and saved successfully!");

        logSpy.mockRestore();
    });

    it("should propagate errors from readWordFiles", async () => {
        const mockReadError = new Error("Error reading word files");
        mockReadWordFiles.mockRejectedValueOnce(mockReadError);

        await expect(processPuzzleWords(FILE_PATHS,mockDependencies)).rejects.toThrow(mockReadError);
    })

    it("should propagate errors from consolidateWordFiles", async () => {
        const mockConsolidateError = new Error("Error consolidating word files");
        mockConsolidateWordFiles.mockRejectedValueOnce(mockConsolidateError);

        await expect(processPuzzleWords(FILE_PATHS, mockDependencies)).rejects.toThrow(mockConsolidateError);
    });

    it("should propagate errors from savePuzzleWordsToFile", async () => {
        const mockSavePuzzleError = new Error("Error saving puzzle words to file");
        mockSavePuzzleWordsToFile.mockRejectedValueOnce(mockSavePuzzleError);

        await expect(processPuzzleWords(FILE_PATHS, mockDependencies)).rejects.toThrow(mockSavePuzzleError);
    });
})