const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.')
		.addRoleOption(optionone =>
			optionone.setName('roleone')
				.setDescription('the first ')
				.setRequired(true))
		.addRoleOption(optiontwo =>
			optiontwo.setName('roletwo')
				.setDescription('the 2nd role you want to compare to')),
	async execute(interaction) {
		const target = interaction.options.getRole('roleone').name;
		console.log(target);
		const target2 = interaction.options.getRole('roletwo') ?? null;
		console.log(target2);
		if (target2 !== null){
			target2 = target2.name;
		}

		const targetArray = [];
		const target2Array = [];
		const finalArray = [];
		const roles = interaction.guild.roles.cache; 
		roles.forEach(role => {
			console.log(target === role.name)
			const members = role.members;
			if (target === role.name){
				members.forEach(member => {
					targetArray.push(member.user.globalName);
					console.log("test!");
					console.log(target2 === null);
					if(target2 === null || target2Array.includes(member.user.globalName) ) {
						finalArray.push(member.user.globalName);
						console.log(member.user.globalName);
					}})
			}
			if ( target2 !== null && target2 === role.name){
				members.forEach(member => {
					targetArray.push(member.user.globalName)
					if(targetArray.includes(member.user.globalName) ) {
						finalArray.push(member.user.globalName);
					}}) 
			}
		}); 
		var string = null;
		console.log(finalArray);
		if (finalArray !== null){
			 string = finalArray.join(',');
		}
		else{
			string = "No such user has both roles";
		}
		await interaction.reply(string);
	},
};