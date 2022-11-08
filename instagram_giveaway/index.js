const fs = require("fs");

function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array[0];

    let left = [];
    let right = [];

    for (let i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    return quickSort(left).concat(pivot, quickSort(right));
};

function binarySearch(el, arr){
    let left = 0;
    let right = arr.length - 1;
    let mid = Math.floor((left + right) / 2);

    while (arr[mid] !== el && left <= right) {
        if (el < arr[mid]) {
            right = mid - 1
        } else {
            left = mid + 1
        }
        mid = Math.floor((left + right) / 2);
    }
    if (arr[mid] === el) {
        return mid;
    } else {
        return -1
    }
}

function getFileContextArray(){
    let fileArray = new Array(20);
    for (let i = 0; i<20; i++){
        let buffer = fs.readFileSync(`context/out${i}.txt`);
        let currentArray = Array.from(new Set(buffer.toString().split('\n')));
        currentArray = quickSort(currentArray);
        fileArray[i] = currentArray;
    }
    return fileArray;
}

function uniqueValues(){
    let buffer;
    for (let i = 0; i<20; i++){
        buffer += fs.readFileSync(`context/out${i}.txt`);
    }

    const fileContent = buffer.toString().split('\n');
    let sortArray = fileContent;


    let setArray = Array.from(new Set(sortArray));
    setArray = quickSort(setArray);
    console.log(setArray.length);
    return setArray;
};

function existInAllFiles(wordSetArray, word2DArray){
    let totalCount = 0;
    for (let i = 0; i < wordSetArray.length; i++){
        let currentCount = 0;
        for(let j = 0; j < 20; j++){
            if(binarySearch(wordSetArray[i], word2DArray[j]) !== -1) currentCount++;
        }
        if(currentCount === 20) totalCount++;
    }
    return totalCount;
};

function existInAtLeastTen(wordSetArray, word2DArray){
    let totalCount = 0;
    for (let i = 0; i < wordSetArray.length; i++){
        let currentCount = 0;
        for(let j = 0; j < 20; j++){
            if(binarySearch(wordSetArray[i], word2DArray[j]) !== -1) currentCount++;
            if(currentCount === 10) {
                totalCount++;
                break;
            }
        }
    }
    return totalCount;
}

console.time("codeznew");
const namespaceSet = uniqueValues();
const namespace2DArray = getFileContextArray();
console.log(existInAllFiles(namespaceSet, namespace2DArray));
console.log(existInAtLeastTen(namespaceSet, namespace2DArray));
console.timeEnd("codeznew");