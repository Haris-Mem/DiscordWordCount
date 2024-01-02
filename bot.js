//Load librarys
const Discord = require("discord.js");
const fs = require("fs");

//Load configuration
const { prefix, token, searchBamf, sighting } = require('./config.json');
const repeat = 25;
const { ActivityTypes } = require('discord.js');
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
    client.user.setStatus('available');
    client.user.setActivity('Buffalo Chicken Sandwich w/ a side of poutine', { type: 'PLAYING' });
 });
 


client.on("message", async message => {
    if (message.author.bot) return;
    
    // Message listener (ignore the commands for the counter)
    if(regex.test(message.content.toLowerCase()) && !message.content.startsWith('!userbamfcount') && !message.content.startsWith('!bamfcount')){
        const username = message.author.username;
        if (!data.users[username]) {
            data.users[username] = 0;
        }
        data.users[username] += 1;
        data.count += 1;
        var writestring = JSON.stringify(data);
        fs.writeFile("data/data.json", writestring, err => {
            if (err) throw err;
        });
        
    //emoji after 'repeat' occurences
    if (data.count %repeat == 0){
        message.channel.send('https://cdn.discordapp.com/attachments/1182613059282403468/1191834912601424083/image.png?ex=65a6e1c2&is=65946cc2&hm=15f0ffa07a58145a81d99c9b4143c15205488b1e074c6a51518da02808414f73&');
    }

    }
    
    // total count
    if (message.content.startsWith('!bamfcount')) {
    let totalCount = 0;
    for (let user in data.users) {
        totalCount += data.users[user];
    }
    message.reply(`||${searchBamf[0]}|| has been said ${totalCount} times by all users.`);
    }
    
    //user count
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

    if (message.content.startsWith('!sighting')) {
        let x = Math.floor(Math.random() * sighting.length-1);
        message.channel.send(sighting[x]);
     }
   });
   
   

client.login(token);