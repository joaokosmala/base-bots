const fs = require("fs")

module.exports = async (client) => {

const SlashsArray = []

  fs.readdir(`./Commands`, (error, folder) => {
  folder.forEach(subfolder => {
fs.readdir(`./Commands/${subfolder}/`, (error, files) => { 
  files.forEach(files => {
      
  if(!files?.endsWith('.js')) return;
  files = require(`../Commands/${subfolder}/${files}`);
  if(!files?.name) return;
  client.slashCommands.set(files?.name, files);
   
  SlashsArray.push(files)
  });
    });
  });
});
  client.on("ready", async () => {
  client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray))
    });
  setTimeout(() => {
    console.log("✅ - O sistema de comandos foi iniciado!")
  }, 3000);
  setTimeout(() => {
    console.log("✅ - O bot está pronto para uso!")
    console.log("")
    console.log("---------------------------------")
    console.log("")
    console.log("✅ - REGISTRO DE LOGS - ✅")
  }, 4000);
};