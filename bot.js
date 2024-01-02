const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const fs = require('fs');

const clientId = '1191641735122657330';
const guildId = '1116204200351760454';
const token = 'MTE5MTY0MTczNTEyMjY1NzMzMA.GUegWE.wn8inoSCcFn2IfPIJMIjkIlvXvZ7j61qhGZTIk';

// Load data
var data = require("./data/data.json");

// Load configuration
const { prefix, searchBamf } = require('./config.json');
let regex = new RegExp("\\b" + searchBamf.join('|') + "\\b", 'i');

const commands = [
   {
    name: 'bamfcount',
    description: 'Get the count of bamford'
   },
   {
    name: 'userbamfcount',
    description: 'Get the count of bamford for a specific user',
    options: [
      {
        name: 'username',
        type: 3, // STRING
        description: 'The username to get the count for',
        required: false
      }
    ]
   }
  ];
  

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
 try {
 console.log('Started refreshing global (/) commands.');

 await rest.put(
  Routes.applicationCommands(clientId),
  { body: commands }
 );

 console.log('Successfully reloaded global (/) commands.');

 console.log('Started refreshing guild (/) commands.');

 // Register guild-specific commands
 await rest.put(
   Routes.applicationGuildCommands(clientId, guildId),
   { body: commands }
 );
 } catch (error) {
 console.error(error);
 }
})();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.Guilds] });

client.once('ready', () => {
 console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
 if (!interaction.isCommand()) return;

 const { commandName } = interaction;

 if (commandName === 'bamfcount') {
 let totalCount = 0;
 for (let user in data.users) {
  if (!data.users[user]['bamford']) {
    data.users[user]['bamford'] = 0;
  }
  totalCount += data.users[user]['bamford'];
 }
 await interaction.reply(`||${searchBamf[0]}|| has been said ${totalCount} times by all users.`);
 if (totalCount % 25 === 0) {
  await interaction.followUp('https://cdn.discordapp.com/attachments/1182613059282403468/1191834912601424083/image.png?ex=65a6e1c2&is=65946cc2&hm=15f0ffa07a58145a81d99c9b4143c15205488b1e074c6a51518da02808414f73&');
 }
 }

 if (commandName === 'userbamfcount') {
 let username = interaction.options.getString('username') || interaction.user.username;
 if (!data.users[username]) {
  data.users[username] = {};
 }
 if (!data.users[username]['bamford']) {
  data.users[username]['bamford'] = 0;
 }
 let totalCount = data.users[username]['bamford'];
 await interaction.reply(`User ${username} has said ||${searchBamf[0]}|| ${totalCount} times.`);
 }
});

client.login(token);
