const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hasroles')
		.setDescription('takes one or two roles and provides all users with all those roles.')
		.addRoleOption(optionone =>
			optionone.setName('roleone')
				.setDescription('the first ')
				.setRequired(true))
		.addRoleOption(optiontwo =>
			optiontwo.setName('roletwo')
				.setDescription('the 2nd role you want to compare to')),
	async execute(interaction) {
		const target = interaction.options.getRole('roleone').name; //inputs from above
		var target2 = interaction.options.getRole('roletwo') ?? null; //default value for target2 is null
		if (target2 !== null){
			target2 = target2.name;  //prevents trying to get .name from a null value
		}

		const targetArray = []; 
		const target2Array = []; //these can honestly be swapped for one array and will be if i need to make more than 2 roles to compare for this func
		const finalArray = [];
		const roles = interaction.guild.roles.cache; 
		roles.each(role =>{ //iterate through the cache of roles (there might be a limit to the roles this cache stores which will blow this up, but I can't really test this until later)
			const members = role.members; //get a collection of members with that role
			if (target === role.name){ 
				members.each(member => {
					targetArray.push(member.user.toString());
					if(target2 === null || target2Array.includes(member.user.toString()) ) {
							finalArray.push(member.user.toString()); //iterate through them and if target2Array has them as well, if so, push to finalArray which will eventually be returned
				}})
			}
			if ( target2 !== null && target2 === role.name){
				members.each(member => {
					targetArray.push(member.user.toString())
					if(targetArray.includes(member.user.toString()) ) { //iterate through them and if targetArray has them as well, if so, push to finalArray which will eventually be returned
						finalArray.push(member.user.toString());
				}}) 
		}}); 
		var string = null;
		if (finalArray.length !== 0){ 
			string = finalArray.join(', '); //@them (as that's what's stored in the list) in a pretty way, might get a bit bulky if you include a lot of people here, but not much i can do
		}
		else{ //if no entries where found return a custom message
			string = "No such user has these roles";
		}
		await interaction.reply(string);
		},
	};