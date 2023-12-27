const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtime')
		.setDescription('adds specidied time to a specified thread')
		.addChannelOption(thread =>
			thread.setName('thread')
				.setDescription('The thread that you want to add time to')
				.setRequired(true))
        .addIntegerOption(delay => 
            delay.setName('delay')
				.setDescription('the amount of delay you want')
				.setRequired(true)
            ),
	async execute(interaction) {
		const channel = interaction.options.getChannel('thread'); //inputs from thread above
		const delay = interaction.options.getInteger('delay');
		
		await interaction.reply(channel + " " + delay);
		},
	};