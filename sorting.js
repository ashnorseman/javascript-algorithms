/**
 * Created by Ash on 2016-5-29.
 * Sorting Algorithms
 */


const Sorting = {


  /**
   * Bubble sorting
   * @param {Array} array
   * @returns {Array}
   */
  bubble(array) {
    let lastUnsortedIndex = array.length - 1,
        swapped;

    do {
      swapped = false;

      for (let i = 0; i < lastUnsortedIndex; i += 1) {

        if (array[i] > array[i + 1]) {
          [array[i + 1], array[i]] = [array[i], array[i + 1]];
          swapped = true;
        }
      }

      lastUnsortedIndex -= 1;
    } while (swapped);

    return array;
  },


  /**
   * Select sorting
   * @param {Array} array
   * @returns {Array}
   */
  select(array) {

    for (let i = 0, length = array.length; i < length - 1; i += 1) {
      let minimum = array[i],
          minimumIndex = i;

      for (let j = i + 1; j < length; j += 1) {

        if (array[j] < minimum) {
          minimum = array[j];
          minimumIndex = j;
        }
      }

      if (i !== minimumIndex) {
        [array[i], array[minimumIndex]] = [array[minimumIndex], array[i]];
      }
    }

    return array;
  },


  /**
   * Insert sorting
   * @param {Array} array
   * @returns {Array}
   */
  insert(array) {
    if (array.length < 2) return;

    for (let i = 1, length = array.length; i < length; i += 1) {
      let current = array[i];

      for (let j = i - 1; j >= 0; j -= 1) {

        if (array[j] > current) {
          array[j + 1] = array[j];

          if (j === 0) {
            array[j] = current;
          }
        } else {
          array[j + 1] = current;
          break;
        }
      }
    }

    return array;
  },


  _merger([left, right]) {
    if (Array.isArray(left[0])) left = this._merger(left);
    if (Array.isArray(right[0])) right = this._merger(right);

    let mergedArray = [];

    while (left.length || right.length) {

      if (left[0] < right[0] || right[0] === undefined) {
        mergedArray.push(left.shift());
      } else {
        mergedArray.push(right.shift());
      }
    }

    return mergedArray;
  },


  _split(array) {
    if (array.length <= 1) return array;

    return [
      this._split(array.slice(0, Math.ceil(array.length / 2))),
      this._split(array.slice(Math.ceil(array.length / 2)))
    ];
  },


  /**
   * Merge Sorting
   * @param {Array} array
   * @returns {Array}
   */
  merge(array) {
    return this._merger(this._split(array));
  },


  /**
   * Quick sotring
   * @param {Array} array
   * @returns {Array}
   */
  quick(array) {
    if (array.length <= 1) return array;

    let storedIndex = 1;

    for (let i = 1; i < array.length; i += 1) {

      if (array[i] < array[0]) {
        [array[i], array[storedIndex]] = [array[storedIndex], array[i]];
        storedIndex += 1;
      }
    }

    [array[0], array[storedIndex - 1]] = [array[storedIndex - 1], array[0]];

    return [
      ...this.quick(array.slice(0, storedIndex - 1)),
      array[storedIndex - 1],
      ...this.quick(array.slice(storedIndex))
    ];
  },


  /**
   * R-Quick sorting
   * @param {Array} array
   * @returns {Array}
   */
  randomQuick(array) {
    if (array.length <= 1) return array;

    const pivot = Math.floor(Math.random() * array.length);

    [array[0], array[pivot]] = [array[pivot], array[0]];

    let storedIndex = 1;

    for (let i = 1; i < array.length; i += 1) {

      if (array[i] < array[0]) {
        [array[i], array[storedIndex]] = [array[storedIndex], array[i]];
        storedIndex += 1;
      }
    }

    [array[0], array[storedIndex - 1]] = [array[storedIndex - 1], array[0]];

    return [
      ...this.quick(array.slice(0, storedIndex - 1)),
      array[storedIndex - 1],
      ...this.quick(array.slice(storedIndex))
    ];
  },


  /**
   * Count sorting
   * @param {Array} array
   * @returns {Array}
   */
  count(array) {
    const map = new Map(),
      sortedArray = [];

    for (let i = 0; i < 10; i += 1) {
      map.set(i, 0);
    }

    for (let i = 0; i < array.length; i += 1) {
      map.set(array[i], map.get(array[i]) + 1);
    }

    for (let [key, value] of map) {
      for (let i = 0; i < value; i += 1) {
        sortedArray.push(key);
      }
    }

    return sortedArray;
  },


  /**
   * Radix sorting
   * @param {Array} array
   * @returns {Array}
   */
  radix(array) {
    let sortedArray = array,
      digits = array.reduce((maxDigit, item) => {
        return Math.max(maxDigit, (item + '').length);
      }, 0);

    for (let digit = 0; digit < digits; digit += 1) {
      const map = new Map();

      for (let i = 0; i < 10; i += 1) {
        map.set(i, []);
      }

      for (let i = 0; i < sortedArray.length; i += 1) {
        const key = Math.floor(sortedArray[i] % Math.pow(10, digit + 1) / Math.pow(10, digit));

        map.get(key).push(sortedArray[i]);
      }

      sortedArray = [];

      for (let [key, value] of map) {
        sortedArray = sortedArray.concat(value);
      }
    }

    return sortedArray;
  }
};
