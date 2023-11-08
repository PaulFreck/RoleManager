const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addroles')
		.setDescription('takes one or two roles and provides all users with all those roles.')
		.addRoleOption(optionone =>
			optionone.setName('roletoadd')
				.setDescription('The role that you want to add to the users')
				.setRequired(true))
		.addUserOption(optiontwo =>
			optiontwo.setName('userone')
				.setDescription('the first user to add the role to')
                .setRequired(true)),
	async execute(interaction) {
		const role = interaction.options.getRole('roletoadd'); //inputs from role above
		const target = interaction.options.getUser('userone'); //inputs from user above
        const userPromise = interaction.guild.members.fetch(target.id);
            userPromise.then(user => {
            user.roles.addRole(role.id)
        });
        console.log(target.constructor.name);
        console.log(role.constructor.name);
        //target.roles.add(role);
		await interaction.reply("It has been done.");
		},
	};