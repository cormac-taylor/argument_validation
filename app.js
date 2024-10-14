
import {
  arrayAnalysis,
  mergeKeyValuePairs,
  deepArrayEquality,
} from "./arrayUtils.js";
import { replaceCharsAtIndexes, anagrams, charSwap } from "./stringUtils.js";
import {
  processObjects,
  similarKeysValues,
  flipKeysForStringsAndNumbers,
} from "./objectUtils.js";

// arrayUtils.js

// arrayAnalysis tests
try {
  console.log(arrayAnalysis([12, Infinity, 49, 734]));
} catch (e) {
  console.error(e);
} // Throws an error

try {
  console.log(arrayAnalysis([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]));
} catch (e) {
  console.error(e);
} // expect: { average: 36.4, middleValue: 36.5, frequentValues: [11, 54], span: 125, lowest: -25, highest: 100, totalCount: 10, totalSum: 364 }

// mergeKeyValuePairs tests
try {
  console.log(
    mergeKeyValuePairs(["key1", "value1"], "not an array", ["key2", "value2"])
  );
} catch (e) {
  console.error(e);
} // Throws an error

try {
  console.log(
    mergeKeyValuePairs(
      ["foo", 10],
      ["bar", "hello"],
      ["foo", "world"],
      ["baz", 30],
      ["foo", 5],
      ["bar", 15],
      ["baz", "20"]
    )
  );
} catch (e) {
  console.error(e);
} // Should return: {bar: "15, hello", baz: "20, 30", foo: "5, 10, world"}

// deepArrayEquality tests
try {
  console.log(deepArrayEquality([1, 2], { a: 1 }));
} catch (e) {
  console.error(e);
} // expect: throws error

try {
  console.log(
    deepArrayEquality(
      ["null", null, {}, [[undefined, []], undefined, null]],
      ["null   ", null, {}, [[undefined, []], undefined, null]]
    )
  );
} catch (e) {
  console.error(e);
} // expect: true

// stringUtils

// replaceCharsAtIndexes tests
try {
  console.log(replaceCharsAtIndexes("string", [1, 6]));
} catch (e) {
  console.error(e);
} // expect: Error

try {
  console.log(replaceCharsAtIndexes('bookkeeper', [1, 3, 5]));
} catch (e) {
  console.error(e);
} // expect: "missmssspps"

// anagrams tests
try {
  console.log(anagrams(" ", "cat"));
} catch (e) {
  console.error(e);
} // expect: Error

try {
  console.log(anagrams("Listen to the silent night", "listen"));
} catch (e) {
  console.error(e);
} // expect: ["Listen", "silent"]

// charSwap tests
try {
  console.log(charSwap("  h  ", "world"));
} catch (e) {
  console.error(e);
} // expect: Error

try {
  console.log(charSwap("hi", "bye"));
} catch (e) {
  console.error(e);
} // expect: "ei byh"

// objectUtils

// processObjects tests
const first = { x: 2, y: 3 };
const second = { a: 70, x: 4, z: 5 };
const third = { x: 1, y: 9, q: 10 };
const fourth = {};

try {
  console.log(processObjects([first, fourth], (x) => x + 1));
} catch (e) {
  console.error(e);
} // expect: Error

try {
  console.log(processObjects([first, second, third], (x) => x * 2));
} catch (e) {
  console.error(e);
} // expect: { x: 64, y: 108, a: 140, z: 10, q: 20 }

// similarKeysValues tests
try {
  console.log(similarKeysValues([1, 2, 3], { a: 1, b: 2, c: "3" }));
} catch (e) {
  console.error(e);
} // expect: Error

try {
  console.log(
    similarKeysValues(
      { a: { x: 1, y: { x: "1", y: 3 } }, b: 3 },
      { a: { x: "1", y: { x: 1, y: "2" } }, b: "3" }
    )
  );
} catch (e) {
  console.error(e);
} // expect: { a: { x: 1, y: { x: '1' } }, b: 3 }

// flipKeysForStringsAndNumbers tests
try {
  console.log(flipKeysForStringsAndNumbers({}));
} catch (e) {
  console.error(e);
} // expect: Error

try {
  console.log(flipKeysForStringsAndNumbers({ a: [1, 1], b: 1 }));
} catch (e) {
  console.error(e);
} // { '1': 'a_0a_1b' }
