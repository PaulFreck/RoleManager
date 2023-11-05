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
		//console.log(target);
		var target2 = interaction.options.getRole('roletwo') ?? null;
		//console.log(target2);
		if (target2 !== null){
			target2 = target2.name;
		}

		const targetArray = [];
		const target2Array = [];
		const finalArray = [];
		const roles = interaction.guild.roles.cache; 
		//roles.then(roleCollection => { //resolve promise getting a collection in role
			roles.each(role =>{ //with said collection iterate through them
				//console.log(target === role.name)
				const members = role.members; //get a cached collection of their members
				console.log(role.name);
				if (target === role.name){ 
					members.each(member => {
						//console.log(member);
						targetArray.push(member.user.tag);
						//console.log("test!");
						//console.log(target2 === null);
						if(target2 === null || target2Array.includes(member.user.tag) ) {
							finalArray.push(member.user.tag);
							//console.log(member.user.tag);
					}})
				}
				if ( target2 !== null && target2 === role.name){
					members.each(member => {
						targetArray.push(member.user.tag)
						if(targetArray.includes(member.user.tag) ) {
							finalArray.push(member.user.tag);
					}}) 
			}
		}); 
		var string = null;
		//console.log(finalArray);
		if (finalArray.length !== 0){
			 string = finalArray.join(',');
		}
		else{
			string = "No such user has these roles";
		}
		await interaction.reply(string);
	},
};