// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

import * as fs from "fs/promises";


jest.mock('../process', () => ({
    ...jest.requireActual("../process"), 
    filterRemovedWords: jest.fn()
}));
import { alphabetizeWords } from "../process";

describe('alphabetizeWords function', () => {
    
    let mockWordsObject: { originalWords: string[]; addedWords: string[]; removedWords: string[] };
    let mockCombinedFileContents: string[];
    let mockFilteredWords: string[]
    

    beforeEach(() => {
        jest.clearAllMocks()

        mockWordsObject = { 
            originalWords: ['ako', 'ikaw', 'puta'], 
            addedWords: ['ako', 'siya'], 
            removedWords: ['puta']
        };

        mockCombinedFileContents = 
        mockWordsObject['addedWords'].length > 0 ? [...new Set([...mockWordsObject['originalWords'], ...mockWordsObject['addedWords']])] : mockWordsObject['originalWords'];
        
         // Filter out removed words
         const mockRemovedWordsSet = new Set(mockWordsObject['removedWords']);
         mockFilteredWords = mockCombinedFileContents.filter((word) => !mockRemovedWordsSet.has(word));
    });

    it('should sort words correctly in alphabetical order', () => {
        const result = alphabetizeWords({ filteredWords: mockFilteredWords });

        expect(result).toEqual(['ako', 'ikaw','siya']);
    });

    it('should return an empty array if filteredWords is empty', () => {
        mockFilteredWords = []

        const result = alphabetizeWords( {filteredWords: mockFilteredWords})

        expect(result).toEqual([]);

    });
})