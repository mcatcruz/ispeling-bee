// Verify that it sorts words correctly in alphabetical order.
// Check edge cases like:
// Empty array.
// Mixed casing (e.g., ['Ako', 'ako', 'Ikaw']).
// Special characters or numbers in the list.

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
import { alphabetizeWords, filterRemovedWords } from "../process";

describe('filterRemovedWords function', () => {
    const mockWordsObject = { 
        originalWords: ['ako', 'ikaw', 'puta'], 
        addedWords: ['ako', 'siya', 'hindot'], 
        removedWords: ['puta', 'hindot']
    };

    beforeEach(() => {
        jest.clearAllMocks()
    });

})