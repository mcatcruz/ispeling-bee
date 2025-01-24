
// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));
import * as fs from "fs/promises";

// Mock getWordsFromFile
jest.mock('../process', () => ({
    ...jest.requireActual("../process"), 
    getWordsFromFile: jest.fn()
}));

import { readWordFiles } from "../process";
import { getWordsFromFile } from "../process";

import { FILE_PATHS } from "../config/config";


describe('readWordFiles function', () => {
    const mockGetWordsFromFile = jest.mocked(getWordsFromFile);
    
    beforeEach(() => {

        // Mock getWordsFromFile responses
        mockGetWordsFromFile
            .mockResolvedValueOnce(['ako', 'ikaw', 'puta'])
            .mockResolvedValueOnce(['puta'])
            .mockResolvedValueOnce(['siya'])

    });

    afterEach(() => {
        jest.clearAllMocks();
    })
        
    it('should return an object containing words from txt files', async () => {
        const result = await readWordFiles(FILE_PATHS, mockGetWordsFromFile);

        expect(result).toEqual({
            originalWords: ['ako', 'ikaw', 'puta'],
            removedWords: ['puta'],
            addedWords: ['siya']
        });
        
    });

    it.only('should call getWordsFromFile for each file path file', async () => {
        await readWordFiles(FILE_PATHS, mockGetWordsFromFile);

        expect(getWordsFromFile).toHaveBeenCalledTimes(3);

        expect(getWordsFromFile).toHaveBeenCalledWith(FILE_PATHS.originalWordsPath);
        expect(getWordsFromFile).toHaveBeenCalledWith(FILE_PATHS.removedWordsPath);
        expect(getWordsFromFile).toHaveBeenCalledWith(FILE_PATHS.removedWordsPath);

    });

    it('should propagate errors from getWordsFile', async () => {
        const error = new Error('File read failed');

        mockGetWordsFromFile.mockRejectedValueOnce(error)

        await expect(readWordFiles(FILE_PATHS)).rejects.toThrow('File read failed');

    })

})