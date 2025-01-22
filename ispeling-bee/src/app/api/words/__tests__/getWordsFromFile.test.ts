import * as fs from "fs/promises";
import { getWordsFromFile } from "../process";
import { warn } from "console";

// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

describe('getWordsFromFile function', () => { 
    const mockOriginalWords = "ako \n ikaw\n puta";

    beforeEach(() => {
            jest.clearAllMocks();
        })

        it('should throw an error if file path does not end in .txt', async () => {
            const incorrectFilePath: string  = "originalWordsPath.pdf"

            await expect(getWordsFromFile(incorrectFilePath)).rejects.toThrow(
                "Invalid file type. Only supports files ending in .txt."
            );
    
        });

        it('should throw an error if file path is empty', async () => {

            await expect(getWordsFromFile("")).rejects.toThrow("File path cannot be empty.");
    
        });
    

        it('should return an array of trimmed, lowercase words', async () => {

            (fs.readFile as jest.Mock).mockResolvedValue(mockOriginalWords);

            const result = await getWordsFromFile('mockOriginalWordsPath.txt');

            expect(result).toEqual(["ako", "ikaw", "puta"]);  

        });

        it('should return an empty array and log a warning if valid txt file is empty', async () => {
            (fs.readFile as jest.Mock).mockResolvedValue('');
            
            const filePath = "mockEmptyFilePath.txt"
            
            const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

            const result = await getWordsFromFile(filePath);

            expect(result).toEqual([]);
            
            expect(warnSpy).toHaveBeenCalled();
            expect(console.warn).toHaveBeenCalledWith(`File at ${filePath} is empty.`);
            
            warnSpy.mockRestore();
        });

        it('should return an empty array and log a warning if txt file is empty after processing', async () => {
            (fs.readFile as jest.Mock).mockResolvedValue(" \n \n \n");

            const filePath = "mockWhitespaceFilePath.txt"

            const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

            const result = await getWordsFromFile(filePath);

            expect(result).toEqual([]);
            
            expect(warnSpy).toHaveBeenCalled();
            expect(console.warn).toHaveBeenCalledWith(`File at ${filePath} contains no valid words.`);

            warnSpy.mockRestore();
        });

})