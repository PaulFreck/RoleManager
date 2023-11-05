const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        //interaction.guild.id

		// Get the Guild and store it under the variable "list"
		const roles = interaction.guild.roles.cache; 
		//console.log(interaction.guild.roles.cache);

		roles.forEach(role => {
			//impliment a way to check if this equal to the input, prob if input.name == role.name
			const members = role.members;
			//console.log(role.members);
			members.forEach(member => console.log(member)) //eventually add the members to smth to print out.
		}); 

		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};