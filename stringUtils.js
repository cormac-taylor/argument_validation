
let isValidNumber = (num) => {
  return typeof num === "number" && !isNaN(num) && isFinite(num);
};

let isValidString = (str, minLen) => {
  return typeof str === "string" && str.trim().length >= minLen;
};

let isValidArray = (arr) => {
  return Array.isArray(arr);
};

let replaceCharsAtIndexes = (str, idxArr) => {
  if (!isValidString(str, 1)) {
    throw "First argument must be a String with > 0 non-space characters.";
  }
  if (!isValidArray(idxArr)) {
    throw "Second argument must be an Array.";
  }

  let result = str.trim();
  for (const item of idxArr) {
    if (!isValidNumber(item)) {
      throw "Array must contain non-NaN and finite numbers.";
    }

    if (item <= 0 || result.length - 1 <= item || !Number.isInteger(item)) {
      throw "Array must contain valid integers for the first parameter of type String.";
    }
  }

  for (let idx of idxArr) {
    let relIdx = -1;
    for (let i = idx + 1; i < result.length; i++) {
      if (result[i] === result[idx]) {
        result = `${result.substring(0, i)}${
          result[idx + relIdx]
        }${result.substring(i + 1)}`;
        relIdx *= -1;
      }
    }
  }

  return result;
};

let anagrams = (str, target) => {
  if (!isValidString(str, 1)) {
    throw "First argument must be a String with > 0 non-space characters.";
  }
  if (!isValidString(target, 1)) {
    throw "Second argument must be a String with > 0 non-space characters.";
  }

  const words = str.trim().split(" ");
  const tar = target.trim().toLowerCase();

  const tarFreq = getFrequenceMap(tar);
  const tarKeys = Object.keys(tarFreq);

  const result = [];
  for (let word of words) {
    if (word.length === tar.length) {
      const wordFreq = getFrequenceMap(word.toLowerCase());
      const wordKeys = Object.keys(wordFreq);

      if (tarKeys.length === wordKeys.length) {
        let isAnagram = true;
        for (const tarKey of tarKeys) {
          if (
            !wordKeys.includes(tarKey) ||
            wordFreq[tarKey] !== tarFreq[tarKey]
          ) {
            isAnagram = false;
          }
        }
        if (isAnagram) {
          result.push(word);
        }
      }
    }
  }

  return result;
};

let getFrequenceMap = (str) => {
  const result = {};

  for (let c of str) {
    if (result[c] === undefined) {
      result[c] = 1;
    } else {
      result[c]++;
    }
  }

  return result;
};

let charSwap = (str1, str2) => {
  if (!isValidString(str1, 2)) {
    throw "First argument must be a String with > 1 non-space characters.";
  }
  if (!isValidString(str2, 2)) {
    throw "Second argument must be a String with > 1 non-space characters.";
  }

  const firstStr = str1.trim();
  const secondStr = str2.trim();
  const n = Math.floor(Math.min(firstStr.length, secondStr.length) / 2);

  return `${secondStr.slice(-n)}${firstStr.slice(n)} ${secondStr.slice(
    0,
    secondStr.length - n
  )}${firstStr.slice(0, n)}`;
};

export { replaceCharsAtIndexes, anagrams, charSwap };
