# **Structure of words Folder**

This folder contains all logic related to processing and managing the word lists for the puzzle generation system.


## Folder and File Overview
* words/ → Central hub for all word processing logic, including reading, filtering, and updating word lists.
* process.ts → Orchestrates the word processing pipeline:
  - Reads the main word lists.
  - Combines original and added words.
  - Filters out removed words.
  - Sorts the final list alphabetically for puzzle generation.
* refresh/ → Handles refreshing the word list on demand.
  - refresh/route.ts →  Defines the API logic to trigger the refresh process, ensuring the word list is updated without restarting the app.
* config/ → Hub for txt files, file paths, and interfaces
  - config/config.ts → Stores file paths for the main word list, added words, removed words, and the processed puzzle word list.
  - config/interfaces.ts → Defines TypeScript interfaces for structured data, ensuring type safety in word processing functions.
* __tests__ → Testing suites for functions in process.ts
    - __tests__/utils/ – Tests for helper functions that handle sorting and filtering of words.
    - __tests__/files/ – Tests for file reading/writing logic to ensure proper handling of word lists.
    - __tests__/integration/ – Tests for higher-level processes that combine multiple functions to generate and save puzzle words.

## Word Processing Workflow
1. Reading Word Files → Reads the original, added, and removed word lists.
2. Consolidating Words → Combines and filters the word lists to remove duplicates and unwanted words.
3. Sorting Words → Sorts the finalized list alphabetically.
4. Saving to File → Saves the processed word list for puzzle generation.
5. On-Demand Refresh → API route (refresh/route.ts) allows updating the word list without restarting the app.

## Key Functions
* `readWordFiles()` → Reads and loads word lists from text files.
* `consolidateWordFiles()` → Combines, filters, and sorts the word lists.
* `filterRemovedWords()` → Removes unwanted words from the list.
* `sortWordsAlphabetically()` → Sorts the final list alphabetically.
* `savePuzzleWordsToFile()` → Saves the processed word list to a text file for puzzle generation.
* `processPuzzleWords()` → Runs the entire word processing workflow.

## Tests
Tests follow a structured format to separate different types of tests. Mock implementations are used where necessary to isolate function behavior.
* To run all tests: ```npm test```
* To run tests with coverage: ```jest --coverage```

