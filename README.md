# wordcounter-bot
 Written with node.js as a framework.
 
 ## Installation (short)
1. Install [node.js](https://nodejs.org/) on your System
2. Download or Clone the content of this repository.
3. Copy config.json.sample to config.json and insert values (see below).
4. run bot.js with node (node bot.js)
5. make sure the bot is running and it will count the word.

## config.json
```
{
    "prefix": "?",
    "token": "YOUR_TOKEN_HERE",
    "searchBamf": ["test"],
    "sighting": ["test","test2"]
   }
     
```

`prefix`sets the letter or symbol the bot should react to. Currently there aren't any commands to control the bot, so this setting can be ignored.

`token` is used to authenticate the bot agains discord. To create one, you need a discord developer account. Visit https://discord.com/developers/ to get one. You can find a tutorial to create a discord application [here](https://discordpy.readthedocs.io/en/latest/discord.html). It's for use with thy python-Library but as its only the discord-part, it's the same for this bot. The only permissions the bot currently needs are `Send Messages` and `Manage Messages`.

`searchBamf`: the word to search for. In lower case as the whole message will be converted to lower case for matching. Currently it is flagged to look for one instance, but for scalability, the variable naming can be modified

`sighting`: And extra command which displays a random message in the array, can be removed


## data/data.json
The bot process needs permissions to write to that file.