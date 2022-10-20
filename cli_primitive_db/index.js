import inquirer from 'inquirer';
import fs from 'fs';

async function createJSON(){
    let userString = {user: "", gender: ""};
    return await inquirer
        .prompt([{
            type: "input",
            message: "Enter username. To escape, just press ENTER:",
            name: "userName",
        }])
        .then(async (answer) => {
            console.log(answer.userName);
            if(answer.userName.length > 0){
                userString.user = answer.userName;
                return await inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Choose user`s gender:",
                            name: "userGender",
                            choices: ["Male", "Female", "Non-bin"],
                        },
                        {
                            type: "number",
                            message: "Confirm user`s age:",
                            name: "userAge",
                        }
                    ])
                    .then((answer) => {
                        userString.gender = answer.userGender;
                        if(answer.userAge) userString.age = answer.userAge;
                        console.log(userString);
                        return userString;
                    });
            }
        });
}

async function writeDB(){
    let sessionDB = "";
    let continueInput = true;

    while (continueInput){
        let userJSON = await createJSON();
        let userString = "";

        if (userJSON) userString ="," + JSON.stringify(userJSON) ;
        else continueInput = false;

        sessionDB += userString;
    }
    console.log(sessionDB);

    let database = "";
    try{
        let data = fs.readFileSync('MangoDB.txt');
        database = data.toString();
        if (database.length < 3) sessionDB = sessionDB.substring(1);
        database = database.substring(0,database.length - 1) + sessionDB + "]";

        fs.writeFileSync('MangoDB.txt',database, function (err) {});
    }
    catch (error){
        fs.appendFileSync('MangoDB.txt',"[" + sessionDB.substring(1) + "]", function (err) {});
    }
}

async function request(){
    return await inquirer
        .prompt([{
            type: "input",
            message: "Whose head do you need?",
            name: "userName",
        }
        ])
        .then((answer) => {
            return answer.userName;
        });
}

async function readDB(){
    let searchOption = await inquirer
        .prompt([{
            type: "confirm",
            message: "Wanna search someone?",
            name: "option",
        }])
        .then((answer) => {
            return answer.option;
        })

    if (searchOption){
        let database = JSON.parse(fs.readFileSync('MangoDB.txt'));
        console.log(database);
        let requestName = await request();
        for (let userId in database){
            if (database[userId].user.toLowerCase() === requestName.toLowerCase()) console.log(database[userId]);
        }
    }
}

await writeDB();
await readDB();