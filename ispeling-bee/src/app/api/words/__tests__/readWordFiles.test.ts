import * as fs from "fs/promises";
import { FILE_PATHS } from "../config/config";
import { readWordFiles } from "../process";

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
        (fs.readFile as jest.Mock).mockImplementation((filePath:string) => {
            console.log(`Mocked reading file: ${filePath}`);
    
            switch (filePath) {
                case FILE_PATHS.originalWordsPath:  
                    return Promise.resolve(mockOriginalWords);
                case FILE_PATHS.removedWordsPath:      
                    return Promise.resolve(mockRemovedWords);
                case FILE_PATHS.addedWordsPath:
                    return Promise.resolve(mockAddedWords);
                default:
                    return Promise.resolve('');
            }
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



