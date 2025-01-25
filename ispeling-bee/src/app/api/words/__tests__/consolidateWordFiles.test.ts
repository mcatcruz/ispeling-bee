// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));


import * as fs from "fs/promises";

jest.mock('../process', () => ({
    ...jest.requireActual("../process"), 
    filterRemovedWords: jest.fn(),
    alphabetizeWords: jest.fn()
}));

import { consolidateWordFiles, filterRemovedWords, alphabetizeWords } from "../process";

describe('consolidateWordFiles function', () => {
    const mockFilterRemovedWords = jest.mocked(filterRemovedWords);
    const mockAlphabetizeWords = jest.mocked(alphabetizeWords);
    const mockWordsObject = { 
        originalWords: ['ako', 'ikaw', 'puta'], 
        addedWords: ['ako', 'siya'], 
        removedWords: ['puta']
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.only('should return an array of alphabetized strings with no duplicates', async () => {
        mockFilterRemovedWords.mockImplementation(({ originalAndAddedWords }) => {
            return originalAndAddedWords.filter(word => word !== 'puta');
        });

        mockAlphabetizeWords.mockImplementation(({ filteredWords }) => {
            return [...filteredWords].sort();
        });

        const result = await consolidateWordFiles(mockWordsObject, 
                { filterRemovedWords: mockFilterRemovedWords, alphabetizeWords: mockAlphabetizeWords});

        expect(result).toEqual(['ako', 'ikaw','siya']);
        
        expect(mockFilterRemovedWords).toHaveBeenCalledTimes(1);
        expect(mockAlphabetizeWords).toHaveBeenCalledTimes(1);

    });

    it('should use originalWords if addedWords array is empty', async () => {
        mockWordsObject['addedWords'] = [];

        const result = await consolidateWordFiles(mockWordsObject);
        
        expect(result).toEqual(['ako','ikaw']);
    })

    it('should use combinedFileContents if removedWords is empty', async () => {
        mockWordsObject['removedWords'] = [];

        const result = await consolidateWordFiles(mockWordsObject);

        expect(filterRemovedWords).toHaveBeenCalledTimes(0);
        expect(result).toEqual(['ako', 'ikaw', 'puta', 'siya'])

    });
    
})

