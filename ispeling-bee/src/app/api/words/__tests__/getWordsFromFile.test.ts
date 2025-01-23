import * as fs from "fs/promises";
import { getWordsFromFile } from "../process";

// Mock file data
jest.mock("fs/promises", () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

describe('getWordsFromFile function', () => { 
    const mockOriginalWords: string = "ako \n ikaw\n puta";
    const mockReadFile = fs.readFile as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReadFile.mockImplementation((filePath: string) => {
            if (filePath === 'nonExistentFile.txt') {
                throw new Error("ENOENT: no such file or directory");
            }
            return Promise.resolve("mock content");
        });

    });


    it('should throw an error if fs.readFile fails (file not found)', async () => {
        const mockError = new Error("ENOENT: no such file or directory");

        mockReadFile.mockRejectedValueOnce(mockError);

        const errorSpy = jest.spyOn(console, 'error').mockImplementation();

        console.log("Mock function called with:", mockReadFile.mock.calls);

        await expect(getWordsFromFile('nonExistentFile.txt')).rejects.toThrow(mockError);

        expect(errorSpy).toHaveBeenCalledWith(`Error reading file path: nonExistentFile.txt: `, expect.any(Error));
        
        errorSpy.mockRestore();
    });

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

            mockReadFile.mockResolvedValue(mockOriginalWords);

            const result = await getWordsFromFile('mockOriginalWordsPath.txt');

            expect(result).toEqual(["ako", "ikaw", "puta"]);  

        });

        it('should return an empty array and log a warning if valid txt file is empty', async () => {
            mockReadFile.mockResolvedValue('');
            
            const filePath: string = "mockEmptyFilePath.txt"
            
            const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

            const result = await getWordsFromFile(filePath);

            expect(result).toEqual([]);
            
            expect(warnSpy).toHaveBeenCalled();
            expect(console.warn).toHaveBeenCalledWith(`File at ${filePath} is empty.`);
            
            warnSpy.mockRestore();
        });

        it('should return an empty array and log a warning if txt file is empty after processing', async () => {
            mockReadFile.mockResolvedValue(" \n \n \n");

            const filePath: string = "mockWhitespaceFilePath.txt"

            const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

            const result = await getWordsFromFile(filePath);

            expect(result).toEqual([]);
            
            expect(warnSpy).toHaveBeenCalled();
            expect(console.warn).toHaveBeenCalledWith(`File at ${filePath} contains no valid words.`);

            warnSpy.mockRestore();
        });


})