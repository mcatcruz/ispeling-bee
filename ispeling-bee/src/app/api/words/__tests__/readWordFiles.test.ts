import * as fs from "fs/promises";
import { FILE_PATHS } from "../config/config";
import { readWordFiles } from "../process";
import { IFilePaths } from "../config/interfaces";

// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

describe('readWordFiles function', () => {
    const mockOriginalWords = "ako\nikaw\nputa";
    const mockRemovedWords = "puta";
    const mockAddedWords = "siya";

    beforeEach(() => {
        (fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
            console.log(`Reading mock file: ${filePath}`);  // Debug log
            if (!filePath) {
                 // Simulate a file not found error for empty paths
                throw new Error("ENOENT: no such file or directory, open ''")
            }
            if (filePath === FILE_PATHS.originalWordsPath) return Promise.resolve(mockOriginalWords);
            if (filePath === FILE_PATHS.removedWordsPath) return Promise.resolve(mockRemovedWords);
            if (filePath === FILE_PATHS.addedWordsPath) return Promise.resolve(mockAddedWords);
            return Promise.resolve('');
        });
    
        (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
        });

        afterEach(() => {
            jest.clearAllMocks();
        })


    it('should return an object containing words from txt files', async () => {
        const result = await readWordFiles(FILE_PATHS);

        expect(result).toEqual({
            originalWords: ['ako', 'ikaw', 'puta'],
            removedWords: ['puta'],
            addedWords: ['siya']
        });
        
    });

})



