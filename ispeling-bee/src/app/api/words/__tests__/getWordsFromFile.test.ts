import * as fs from "fs/promises";
import { getWordsFromFile } from "../process";

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


})