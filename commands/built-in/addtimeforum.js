
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtimeforum')
		.setDescription('adds time till the channel is archieved')
		.addIntegerOption(optiontwo =>
			optiontwo.setName('roletwo')
				.setDescription('the 2nd role you want to compare to')),
	async execute(interaction) {
        const time = interaction.options.getInteger('roletwo');
        collection.set(interaction.id, time)
		await interaction.reply("string");
		},
	};