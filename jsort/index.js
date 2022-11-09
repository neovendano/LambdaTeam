const fs = require('fs');
const axios = require("axios");

async function responseGet(){

    let buffer = fs.readFileSync(`file.txt`);
    const responseLink = buffer.toString().split('\n');
    for (let i = 0; i < responseLink.length; i++){
        let currentResponseStatus = await axios.get(responseLink[i]);
        let currentData = currentResponseStatus.data;
        console.log(responseLink[i]);
        console.log("isDone: " + await goDeeper(currentData, 'isDone'));
    }
}

async function goDeeper(obj, searchKey){
    if(obj.hasOwnProperty(searchKey)) return(obj[searchKey]);

    for (const key in obj){
        if ((typeof obj[key]) === "object") {

            let foundKey = await goDeeper(obj[key], searchKey);
            if(typeof foundKey === "boolean") return foundKey;
        }
    }
}

responseGet();