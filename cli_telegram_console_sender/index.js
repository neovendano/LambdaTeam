const TelegramBot = require('node-telegram-bot-api');
const { Command } = require('commander');
const fs = require('fs');


const program = new Command();
const token = process.env.hisToken;
const chatId = process.env.hisChatId;
const bot = new TelegramBot(token, {polling: false});

program
    .option('-m, --message <string>', 'sends <string> as a message to your chat')
    .option('-p, --photo <string>', 'sends photo from url at <string> to your chat');

program
    .command('message')
    .argument('<string>')
    .description('sends <string> as a message to your chat')
    .action((string) =>{
        bot.sendMessage(chatId, string);
    });

program
    .command('photo')
    .argument('<string>')
    .description('sends photo from url at <string> to your chat')
    .action((string) =>{
        //Couldn`t solve deprecation warning error
        const fileOptions = {
            contentType: 'image/jpeg',
        };
        bot.sendPhoto(chatId, string, {}, fileOptions);
        console.log('Image has sent');
    });

program.parse();

if(program.opts().message) {
    bot.sendMessage(chatId, string);
}


if(program.opts().photo){
    //Couldn`t solve deprecation warning error
    const fileOptions = {
        contentType: 'image/jpeg',
    };
    bot.sendPhoto(chatId, program.opts().photo, {}, fileOptions);
    console.log('Image has sent');
}
