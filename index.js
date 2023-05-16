const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageAttachment } = require('discord.js');
const { token } = require('./config.json');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});


client.once(Events.ClientReady, () => {
    console.log('Ready!!!!!!!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    const messages = await message.channel.messages.fetch({limit: 100});
    const firstKey = messages.keys().next().value;
    messages.delete(firstKey);
    message.channel.bulkDelete(messages);
    
    var files = fs.readdirSync('./img/');
    const filteredFiles = files.filter(file => file.startsWith(message.content));

    if (filteredFiles.length == 0) {
        return;
    }

    const modifiedArray = filteredFiles.map(variable => './img/' + variable);

    console.log(modifiedArray)

    
      message.channel.send({ files: modifiedArray  });
});    

client.login(token);
