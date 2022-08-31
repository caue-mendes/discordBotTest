const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandsFolders) {
      const commandsFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;
      for (const file of commandsFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Command: ${command.data.name} has been register`);
      }
    }

    const clientId = "1012094877858803772";
    const guildId = "1012095672528425051";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Started app (/)");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log("Sucess reloaded (/)");
    } catch (err) {
      console.log(err);
    }
  };
};
