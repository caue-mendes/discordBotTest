module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get();
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (err) {
        console.log(err);
        await interaction.reply({
          content: `Something going wrong =x`,
          ephemeral: true,
        });
      }
    }
  },
};
