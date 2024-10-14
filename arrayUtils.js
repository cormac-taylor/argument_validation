
let isValidNumber = (num) => {
  return typeof num === "number" && !isNaN(num) && isFinite(num);
};

let isValidString = (str, minLen) => {
  return typeof str === "string" && str.trim().length >= minLen;
};

let isValidArray = (arr) => {
  return Array.isArray(arr);
};

let isValidNonEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length !== 0;
};

let isValidObject = (obj) => {
  return !Array.isArray(obj) && typeof obj === "object";
};

let arrayAnalysis = (arr) => {
  if (!isValidNonEmptyArray(arr)) {
    throw "Argument must be a non-empty Array.";
  }

  let sum = 0;
  for (let item of arr) {
    if (!isValidNumber(item)) {
      throw "Array must contain only non-NaN and finite numbers.";
    }
    sum += item;
  }

  arr.sort((x, y) => x - y);
  const result = {};

  result["average"] = sum / arr.length;

  if (arr.length % 2 === 1) {
    result["middleValue"] = arr[Math.floor(arr.length / 2)];
  } else {
    result["middleValue"] = (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
  }

  const freqMap = {};
  let maxFreq = 0;
  let maxFreqVals = [];
  for (let item of arr) {
    if (freqMap[item] === undefined) {
      freqMap[item] = 1;
    } else {
      freqMap[item]++;
    }

    if (maxFreq === freqMap[item]) {
      maxFreqVals.push(item);
    } else if (maxFreq < freqMap[item]) {
      maxFreq = freqMap[item];
      maxFreqVals = [item];
    }
  }

  if (maxFreqVals.length === arr.length) {
    result["frequentValues"] = null;
  } else if (maxFreqVals.length === 1) {
    result["frequentValues"] = maxFreqVals[0];
  } else {
    result["frequentValues"] = maxFreqVals;
  }

  result["span"] = arr[arr.length - 1] - arr[0];
  result["lowest"] = arr[0];
  result["highest"] = arr[arr.length - 1];
  result["totalCount"] = arr.length;
  result["totalSum"] = sum;

  return result;
};

let mergeKeyValuePairs = (...arrays) => {
  if (!isValidNonEmptyArray(arrays)) {
    throw "Must provide at least one argument.";
  }

  for (let i = 0; i < arrays.length; i++) {
    if (!isValidNonEmptyArray(arrays[i]) || arrays[i].length !== 2) {
      throw "All parameters must be Arrays exactly of length 2.";
    }

    for (let j = 0; j < 2; j++) {
      if (!(isValidNumber(arrays[i][j]) || isValidString(arrays[i][j], 1))) {
        throw "All Array entries must contain valid strings (non-empty or not only spaces) or valid numbers (non-NaN) only.";
      }
      if (isValidString(arrays[i][j], 1)) {
        arrays[i][j] = arrays[i][j].trim();
      }
    }
  }

  const result = {};
  for (let arr of arrays) {
    if (result[arr[0]] === undefined) {
      result[arr[0]] = [[], []];
    }

    if (!isNaN(arr[1]) && !isNaN(parseFloat(arr[1]))) {
      result[arr[0]][0].push(Number(arr[1]));
    } else {
      result[arr[0]][1].push(arr[1]);
    }
  }

  for (const [key, val] of Object.entries(result)) {
    val[0] = val[0].filter((v, i, a) => a.indexOf(v) === i);
    val[0] = val[0].sort((x, y) => x - y);

    val[1] = val[1].filter((v, i, a) => a.indexOf(v) === i);
    val[1] = val[1].sort();

    result[key] = val[0].concat(val[1]);
    result[key] = result[key].join(", ");
  }

  return result;
};

let deepArrayEquality = (...arrays) => {
  if (!isValidNonEmptyArray(arrays) || arrays.length < 2) {
    throw "Too few arguments. Must have at least 2 items to compare.";
  }

  for (let arr of arrays) {
    if (!isValidNonEmptyArray(arr)) {
      throw "All parameters must be non-empty Arrays.";
    }
  }

  for (let arr of arrays.slice(1)) {
    if (!deepEqualityHelper(arrays[0], arr)) {
      return false;
    }
  }
  return true;
};

let deepEqualityHelper = (ds1, ds2) => {
  if ((isBUN(ds1) || isValidNumber(ds1)) && ds1 === ds2) {
    return true;
  }
  if (isValidString(ds1, 1) && ds1.trim() === ds2.trim()) {
    return true;
  }

  if (isValidArray(ds1) && isValidArray(ds2)) {
    if (ds1.length !== ds2.length) {
      return false;
    }

    for (let i = 0; i < ds1.length; i++) {
      if (!deepEqualityHelper(ds1[i], ds2[i])) {
        return false;
      }
    }
    return true;
  }

  if (isValidObject(ds1) && isValidObject(ds2)) {
    const keys1 = Object.keys(ds1);
    const keys2 = Object.keys(ds2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqualityHelper(ds1[key], ds2[key])) {
        return false;
      }
    }
    return true;
  }

  return false;
};

let isBUN = (item) => {
  return (
    typeof item === "boolean" || typeof item === "undefined" || item === null
  );
};

export { arrayAnalysis, mergeKeyValuePairs, deepArrayEquality };
