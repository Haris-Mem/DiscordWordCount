//Load librarys
const Discord = require("discord.js");
const fs = require("fs");

//Load configuration
const { prefix, token, searchBamf } = require('./config.json');
let regex = new RegExp("\\b" + searchBamf.join('|') + "\\b", 'i');

//Load data
var data = require("./data/data.json");

//create Bot-Instance
var client = new Discord.Client();

client.once("reconnecting", () => {
    console.log("Reconnecting!");
})

client.once("disconnect", () =>{
    console.log("Disconnect!");
})

client.on("ready", () => {
    console.log("Ready!");
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'Buffalo Chicken Sandwhich w/ a side of poutine',
            type: "PLAYING"
        },
        status: 'online'
    })
})

client.on("message", async message => {
    if (message.author.bot) return;
    
    if(regex.test(message.content.toLowerCase()) && !message.content.startsWith('!userbamfcount') && !message.content.startsWith('!bamfcount')){
    const username = message.author.username;
    if (!data.users[username]) {
        data.users[username] = 0;
    }
    data.users[username] += 1;
    data.count += 1;
    var writestring = JSON.stringify(data);
    fs.writeFileSync("data/data.json", writestring);
    }
    
    if (message.content.startsWith('!bamfcount')) {
    let totalCount = 0;
    for (let user in data.users) {
        totalCount += data.users[user];
    }
    message.reply(`||${searchBamf[0]}|| has been said ${totalCount} times by all users.`);
    }
    
    if (message.content.startsWith('!userbamfcount')) {
    const args = message.content.split(' ');
    
    let username;
    if (args.length > 1) {
        username = args[1];
    } else {
        username = message.author.username;
    }
    
    if (!data.users[username]) {
        message.reply(`User ${username} has not said the word yet.`);
    } else {
        message.reply(`User ${username} has said ||${searchBamf[0]}|| ${data.users[username]} times.`);
    }
    }
   });
   
   

client.login(token);