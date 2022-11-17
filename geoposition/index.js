const express = require('express');
const fs = require('fs');

const app = express()

app.listen(5000, ()=>{
    console.log("App listening on port 5000");
});

app.get('/',function(req, res) {
    const ipAddress = req.header('x-forwarded-for');
    const country = findCountry(adressToInt(ipAddress));
    res.send("User`s IP address: " + ipAddress +
    "\nUser`s location country: " + country);
});

function adressToInt(ipAddress){
    let ipArray = ipAddress.split('.');
    ipArray[3] *= 1;
    ipArray[2] *= 256;
    ipArray[1] *= 256*256;
    ipArray[0] *= 256*256*256;
    let ipInt = ipArray[0] + ipArray[1] + ipArray[2] + ipArray[3];
    console.log(intToAddress(ipInt));
    return ipInt;
}

function intToAddress(ipInt){
    let first = Math.floor(ipInt / (256 * 256 * 256));
    let firstDiv = ipInt % (256 * 256 * 256);
    let second = Math.floor(firstDiv / (256 * 256));
    let secondDiv = firstDiv % (256 * 256);
    let third = Math.floor(secondDiv / (256));
    let fourth = secondDiv % 256;
    return first + '.' + second + '.' + third + '.' + fourth;
}

function findCountry(ipInt){
    let csvArr = getCSV();
    let csvRow = binarySearchCSV(csvArr, ipInt);
    return csvArr[csvRow][3] + " (" + intToAddress(csvArr[csvRow][0]) + "-" + intToAddress(csvArr[csvRow][1]) + ")";
}

function getCSV(){
    let data = fs.readFileSync("./IP2LOCATION-LITE-DB1.csv", "utf8");

    let csvArr = data.toString().split('\r\n');
    for (let i in csvArr) {
        csvArr[i] = csvArr[i].split(',');
        for (let j in csvArr[i]){
            csvArr[i][j] = csvArr[i][j].substring(1, csvArr[i][j].length-1);
        }
        csvArr[i][0] = parseInt(csvArr[i][0]);
        csvArr[i][1] = parseInt(csvArr[i][1]);
    }

    return csvArr;
}

function binarySearchCSV(csvArr, findInt){
    let left = 0;
    let right = csvArr.length - 1;
    let mid = Math.floor((left + right) / 2);

    while(!(csvArr[mid][0] <= findInt && csvArr[mid][1] >= findInt) && left <= right){
        if (findInt < csvArr[mid][0]) {
            right = mid - 1
        } else {
            left = mid + 1
        }
        mid = Math.floor((left + right) / 2);
    }

    if (csvArr[mid][0] <= findInt && csvArr[mid][1] >= findInt) {
        return mid;
    } else {
        return -1
    }
}