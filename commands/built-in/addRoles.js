const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hasroles')
		.setDescription('takes one or two roles and provides all users with all those roles.')
		.addRoleOption(optionone =>
			optionone.setName('roleToAdd')
				.setDescription('The role that you want to add to the users')
				.setRequired(true))
		.addUserOption(optiontwo =>
			optiontwo.setName('userOne')
				.setDescription('the first user to add the role to')
                .setRequired(true)),
	async execute(interaction) {
		const role = interaction.options.getRole('roleToAdd'); //inputs from role above
		const target = interaction.options.getUser('userOne'); //inputs from user above
        target.roles.add(role);
		await interaction.reply("It has been done.");
		},
	};