
let isValidNumber = (num) => {
  return typeof num === "number" && !isNaN(num) && isFinite(num);
};

let isValidString = (str, minLen) => {
  return typeof str === "string" && str.trim().length >= minLen;
};

let isValidNonEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length !== 0;
};

let isValidObject = (obj) => {
  return !Array.isArray(obj) && typeof obj === "object";
};

let isValidNonEmptyObject = (obj) => {
  return (
    !Array.isArray(obj) &&
    typeof obj === "object" &&
    Object.keys(obj).length !== 0
  );
};

let isValidFunction = (func) => {
  return typeof func === "function";
};

let processObjects = (objArr, func) => {
  if (!isValidNonEmptyArray(objArr)) {
    throw "First argument must be an non-empty Array.";
  }

  for (let item of objArr) {
    if (!isValidNonEmptyObject(item)) {
      throw "Array must contain only non-empty objects.";
    }
  }

  if (!isValidFunction(func)) {
    throw "Second argument must be a unary function.";
  }

  const result = {};
  for (let obj of objArr) {
    const keys = Object.keys(obj);
    for (const key of keys) {
      if (!isValidNumber(obj[key])) {
        throw "All Object values must be valid numbers.";
      }

      if (result[key] === undefined) {
        result[key] = func(obj[key]);
      } else {
        result[key] *= func(obj[key]);
      }
    }
  }

  return result;
};

let similarKeysValues = (obj1, obj2) => {
  if (!(isValidObject(obj1) && isValidObject(obj2))) {
    throw "Both the first and second arguments must be objects.";
  }

  return similarValuesHelper(obj1, obj2);
};

let similarValuesHelper = (obj1, obj2) => {
  if (isValidObject(obj1) && isValidObject(obj2)) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const result = {};
    for (const key of keys1) {
      if (keys2.includes(key)) {
        let isSimilarOrObject = similarValuesHelper(obj1[key], obj2[key]);
        if (isValidObject(isSimilarOrObject)) {
          result[key] = isSimilarOrObject;
        } else {
          if (isSimilarOrObject) {
            result[key] = obj1[key];
          }
        }
      }
    }
    return result;
  }

  return obj1 == obj2;
};

let flipKeysForStringsAndNumbers = (obj) => {
  if (!isValidNonEmptyObject(obj)) {
    throw "Argument must be a non-empty object.";
  }

  return flipKeysHelper(obj);
};

let flipKeysHelper = (elm) => {
  if (
    isValidNumber(elm) ||
    isValidString(elm, 1) ||
    isValidNonEmptyArray(elm)
  ) {
    return elm;
  }

  if (isValidNonEmptyObject(elm)) {
    const result = {};
    const elmKeys = Object.keys(elm);

    for (let key of elmKeys) {
      let trimKey = key.trim();
      let val = flipKeysHelper(elm[key]);

      if (isValidNumber(val) || isValidString(val, 1)) {
        if (isValidString(val, 1)) {
          val = val.trim();
        }

        if (result[val] === undefined) {
          result[val] = trimKey;
        } else {
          result[val] = `${result[val]}${trimKey}`;
        }
      } else if (isValidNonEmptyArray(val)) {
        for (let i = 0; i < val.length; i++) {
          let arrElm = flipKeysHelper(val[i]);

          if (isValidNumber(arrElm) || isValidString(arrElm, 1)) {
            if (isValidString(arrElm, 1)) {
              arrElm = arrElm.trim();
            }

            if (result[arrElm] === undefined) {
              result[arrElm] = `${trimKey}_${i}`;
            } else {
              result[arrElm] = `${result[arrElm]}${trimKey}_${i}`;
            }
          } else {
            throw "Arrays can only hold numbers or strings.";
          }
        }
      } else {
        result[trimKey] = val;
      }
    }

    return result;
  }

  throw "Elements must be either non-NaN numbers, strings with > 0 non-space chars, an Array, or an object.";
};

export { processObjects, similarKeysValues, flipKeysForStringsAndNumbers };
