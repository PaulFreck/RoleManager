const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.')
		.addRoleOption(option =>
			option.setName('input')
				.setDescription('default')
				.setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getRole('input').name;

		const roles = interaction.guild.roles.cache; 
		roles.forEach(role => {
			console.log(role.name)
			console.log(target)
			console.log(target === role.name)
			//impliment a way to check if this equal to the input, prob if input.name == role.name
			const members = role.members;
			if (target === role.name){
				members.forEach(member => console.log(member)) //eventually add the members to smth to print out.
			}
		}); 

		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};