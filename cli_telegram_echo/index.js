const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const token = process.env.botToken;
const bot = new TelegramBot(token, {polling: true});
bot.on('message', async (msg) =>{
    if(msg.text==='photo') {
        const photoData = await axios.get('https://picsum.photos/200/300', { responseType: 'arraybuffer' })
        await bot.sendPhoto(msg.chat.id, photoData.data);
        console.log('User zaprosil kartinku');
    }
    else{
        console.log("Your text: " + msg.text.toString());
        await bot.sendMessage(msg.chat.id, "Your text: " + msg.text.toString());
    }
})