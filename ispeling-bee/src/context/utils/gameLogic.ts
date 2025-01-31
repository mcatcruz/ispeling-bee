// Pure functions that do not rely on React state

const calculatePoints = (word: string): number => {
    if (word.length === 4) return 1;
    if (isPangram(word)) return word.length + 7;
    return word.length;
  };

const isPangram = (word: string): boolean => {
    return new Set(word).size === 7;
  };

const incrementDups = (arr: Array<number>): Array<number> => {
  const encounters = new Set();
  return arr.map((num) => {
    while (encounters.has(num)) {
      num += 1;
    }
    encounters.add(num);
    return num;
  });
};


const generatePointsMessage = (points: number): string => {
  const message = pointsMessages[points] || "awesome";
  return `${message}! +${points}`;
},

// from store.ts
// cellClassName({ row, columnIndex }: { row: any; columnIndex: number }) {
//   const word = row[columnIndex + 1];
//   if (word && this.isPangram({ word })) {
//     return "pangram";
//   }

// // from utils.ts
// import { differenceInDays } from "date-fns";
// import { Answer } from "./models/answer";

// // generic js functions
// // https://levelup.gitconnected.com/lodash-methods-that-can-be-easily-implemented-in-plain-javascript-bbe22509827e
// const chunk = ({
//   arr,
//   size,
// }: {
//   arr: Array<any>;
//   size: number;
// }): Array<Array<any>> => {
//   const chunkedArr = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunkedArr.push(arr.slice(i, i + size));
//   }
//   return chunkedArr;
// };

// // TODO: sort alphabetically and vertically instead of horizontally?
// // returns array of objects
// // [{1: 'a', 2: 'b', 3:'c'}, {1:'d', 2:'e'}]
// const gridify = ({
//   arr,
//   size,
// }: {
//   arr: Array<any>;
//   size: number;
// }): Array<Object> => {
//   return chunk({ arr, size }).map((arr) => {
//     const obj: { [key: string]: any } = {};
//     arr.forEach((value, index: number) => {
//       obj[`${index + 1}`] = value;
//     });
//     return obj;
//   });
// };

// // allow random generator to be seeded for more predictable results of createFiles.ts
// const createRandomGenerator = ({
//   seed = 1,
// }: { seed?: number } = {}): Function => {
//   // https://stackoverflow.com/a/19303725/6305204
//   // produces random floats between 0 and 1.0
//   const random = (): number => {
//     const x = Math.sin(seed++) * 10000;
//     return x - Math.floor(x);
//   };
//   return random;
// };

// // https://stackoverflow.com/a/46545530/6305204
// const shuffle = (array: Array<any>, seed: number = 1): Array<any> => {
//   const randomFloat = createRandomGenerator({ seed });
//   return array
//     .map((value) => ({ value, sort: randomFloat() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);
// };

// // https://stackoverflow.com/a/22015771/6305204
// const zip = (arr1: Array<any>, arr2: Array<any>): Array<any> => {
//   return arr1.map((e, i) => {
//     return [e, arr2[i]];
//   });
// };
// const generateAnswerObjs = ({
//   allAnswers,
//   gameDate,
// }: {
//   allAnswers: Array<Answer>;
//   gameDate: Date;
// }): { todaysAnswerObj: Answer; yesterdaysAnswerObj: Answer } => {
//   // use days since arbitrary epoch to ensure yesterdays answers is always 1 behind todays.
//   const daysSinceEpoch = differenceInDays(gameDate, epoch);
//   // pick next puzzle input, % len puzzles to restart if out of index (circular)
//   const todaysAnswerObj = allAnswers[daysSinceEpoch % allAnswers.length];
//   const yesterdaysAnswerObj =
//     allAnswers[(daysSinceEpoch - 1) % allAnswers.length];
//   return { todaysAnswerObj, yesterdaysAnswerObj };
// };

export {
  calculatePoints,
  isPangram,
  incrementDups,
  generatePointsMessage,
  // chunk,
  // generateAnswerObjs,
  // gridify,

  // shuffle,
  // zip,
};
