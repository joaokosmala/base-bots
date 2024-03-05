const Discord = require("discord.js")
const config = require("./config.json")
const fs = require('fs');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

const client = new Discord.Client({ 
  intents: [ 
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommand){

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd) return interaction.reply({ content: `Olá ${interaction.member}, Tive problemas para executar este comando!`, ephemeral: true});

        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction)
    }
})

client.on('ready', () => {
  console.clear()
  console.log(`✅ - Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()
require('./Handler')(client)


client.login(config.token)

fs.readdir('./Events', (err, file) => {
  file.forEach(event => {
    require(`./Events/${event}`)
  })
  setTimeout(() => {
    console.log("✅ - O sistema de eventos foi iniciado!")
  }, 2000);
})


////////////////////////////////////////////////////////////