const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('forum')
		.setDescription('takes one or two roles and provides all users with all those roles.')
		.addChannelOption(optionone =>
			optionone.setName('channel')
				.setDescription('the first ')
				.setRequired(true))
		/*.addRoleOption(optiontwo =>
			optiontwo.setName('roletwo')
				.setDescription('the 2nd role you want to compare to'))*/,
	async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        console.log(channel.constructor.name)
		await interaction.reply("string");
		},
	};