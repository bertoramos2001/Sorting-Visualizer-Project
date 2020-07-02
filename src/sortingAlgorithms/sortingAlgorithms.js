// This first way of doing merge sort is more naive and slower, but it is easier, since we just slice the arrays into halves and then
// merge them together half by half

// export const mergeSort = array => {
//     if (array.length === 1) return array;
//     const middleIndex = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0, middleIndex));
//     const secondHalf = mergeSort(array.slice(middleIndex));
//     const sortedArray = [];
//     let i = 0,
//         j = 0;
//     while (i < firstHalf.length && j < secondHalf.length) {
//         if (firstHalf[i] < secondHalf[j]) {
//             sortedArray.push(firstHalf[i++]);
//         } else {
//             sortedArray.push(secondHalf[j++]);
//         }
//     }
//     while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
//     return sortedArray;
// };



// This second way of doing merge sort is more complex and faster, but it is harder, in this case we use an auxiliary array. This is
// the method that we need to use in our case in order to be able to colorize each bar when merging together (we need to have the index
// of each element of the main array in each moment, not the index of the slice of the main array)

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice(); //copy of the main array
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

const mergeSortHelper = (mainArray, startIndex, endIndex, auxiliaryArray, animations) => {
    
    if (startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    mergeSortHelper (auxiliaryArray, startIndex, middleIndex, mainArray, animations);
    mergeSortHelper (auxiliaryArray, middleIndex + 1, endIndex, mainArray, animations);
    doMerge (mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations);

}

const doMerge = (mainArray, startIndex, middleIndex, endIndex, auxiliaryArray, animations) => {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;

    while (i <= middleIndex && j <= endIndex) {
        // every time we are comparing two values in an array, we use this once to colorize them
        animations.push([i, j]);
        // every time we are comparing two values in an array, we use this a second time to revert the color
        animations.push([i, j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrite (not swap) the value at index k in the original array with the value of index i at the aux array
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // Overwrite (not swap) the value at index k in the original array with the value of index j at the aux array
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIndex) {
        // every time we are comparing two values in an array, we use this once to colorize them
        animations.push([i, i]);
        // every time we are comparing two values in an array, we use this a second time to revert the color
        animations.push([i, i]);
        // Overwrite (not swap) the value at index k in the original array with the value of index i at the aux array
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIndex) {
        // every time we are comparing two values in an array, we use this once to colorize them
        animations.push([j, j]);
        // every time we are comparing two values in an array, we use this a second time to revert the color
        animations.push([j, j]);
        // Overwrite (not swap) the value at index k in the original array with the value of index j at the aux array
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}
