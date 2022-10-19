process.stdin.setEncoding('utf-8');

let inputString;
let inputMode = 0;

console.log("Let`s begin! Enter any text you want")
process.stdin.on('readable', function (){
    let input;

    while ((input = process.stdin.read()) !== null){
        input = input.trim();
        console.log("inputMode: "+inputMode);
        if (input === 'exit') process.exit();

        switch (inputMode){
            case 0:
                inputString = input.split(" ");
                console.log("What do you want to do?\n" +
                    "'1' - sort by text value;\n" +
                    "'2' - sort numbers;\n" +
                    "'3' - sort numbers in reverse way;\n" +
                    "'4' - sort text by length; \n" +
                    "'5' - show unique values;\n" +
                    "'exit' - abort program.");
                inputMode = 1;
                break;
            case 1:
                chooseAction(input, inputString);
                console.log("Let`s continue! Enter any text you want")
                inputMode = 0;
                break;
        }
    }
});

function chooseAction(action, inputArr){
    switch(action){
        case "1":
            console.log(textSort(inputArr));
            break;
        case "2":
            console.log(numberSort(inputArr));
            break;
        case "3":
            console.log(reverseNumberSort(inputArr));
            break;
        case "4":
            console.log(sizeSort(inputArr));
            break;
        case "5":
            console.log(uniqueElements(inputArr));
            break;
        default:
            break;
    }
};

function textSort(sortArray){
    return sortArray.sort();
}

function numberSort(sortArray){
    let numArray = [];
    for(el in sortArray){
        if(!(isNaN(sortArray[el]))) numArray.push(Number(sortArray[el]));
    }

    return numArray.sort((a, b) => a - b);
}

function reverseNumberSort(sortArray){
    return numberSort(sortArray).reverse();
}

function sizeSort(sortArray){
    return sortArray.sort((a, b) => a.length - b.length);
}

function uniqueElements(sortArray){
    let res = [... new Set(sortArray)]
    return res;
}