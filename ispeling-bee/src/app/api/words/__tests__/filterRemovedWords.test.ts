// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

import * as fs from "fs/promises";

import { filterRemovedWords } from "../process";

describe('filterRemovedWords function', () => {
    const mockWordsObject = { 
        originalWords: ['ako', 'ikaw', 'puta'], 
        addedWords: ['ako', 'siya', 'hindot'], 
        removedWords: ['puta', 'hindot']
    };

    beforeEach(() => {
        jest.clearAllMocks()
    });

    it('should remove all words from removedWords', async () => {
        const mockCombinedFileContents =
            mockWordsObject['addedWords'].length > 0 ? [...new Set([...mockWordsObject['originalWords'], ...mockWordsObject['addedWords']])] : mockWordsObject['originalWords'];

        const result = await filterRemovedWords({ originalAndAddedWords: mockCombinedFileContents, removedWords: mockWordsObject['removedWords'] });

        expect(result).toEqual(['ako', 'ikaw', 'siya'])
    })
    
    it('should not remove any words if removedWords is empty', async () => {
        mockWordsObject.removedWords = [];

        const mockCombinedFileContents =
        mockWordsObject['addedWords'].length > 0 ? [...new Set([...mockWordsObject['originalWords'], ...mockWordsObject['addedWords']])] : mockWordsObject['originalWords'];
        
        const result = await filterRemovedWords({ originalAndAddedWords: mockCombinedFileContents, removedWords: mockWordsObject['removedWords'] });

        expect(result).toEqual(mockCombinedFileContents);
    })

    it('should not remove any words if there are no matches between originalAndAddedWords and removedWords', async () => {
        mockWordsObject.removedWords = ['gago', 'tanga'];

        const mockCombinedFileContents = 
        mockWordsObject['addedWords'].length > 0 ? [...new Set([...mockWordsObject['originalWords'], ...mockWordsObject['addedWords']])] : mockWordsObject['originalWords'];

        const result = await filterRemovedWords({ originalAndAddedWords: mockCombinedFileContents, removedWords: mockWordsObject['removedWords'] });

        expect(result).toEqual(mockCombinedFileContents);
    })

});