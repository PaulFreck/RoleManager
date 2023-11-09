const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addroles')
		.setDescription('takes one or two roles and provides all users with all those roles.')
		.addRoleOption(roleoption =>
			roleoption.setName('roletoadd')
				.setDescription('The role that you want to add to the users')
				.setRequired(true))
		//You might look at this code and say "wow copying code is bad form"
		//And I would agree with you, but Discord.js doesn't have a way to send in a list of users afaik
		.addUserOption(optiontwo =>
			optiontwo.setName('userone')
				.setDescription('the first user to add the role to')
				.setRequired(true))
		.addUserOption(optionthree =>
			optionthree.setName('usertwo')
				.setDescription('the first user to add the role to'))
		.addUserOption(optionfour =>
			optionfour.setName('userthree')
				.setDescription('the first user to add the role to'))
		.addUserOption(optionfive =>
			optionfive.setName('userfour')
				.setDescription('the first user to add the role to'))
		.addUserOption(optionsix =>
			optionsix.setName('userfive')
				.setDescription('the first user to add the role to'))
		.addUserOption(optionseven =>
			optionseven.setName('usersix')
				.setDescription('the first user to add the role to'))
		.addUserOption(optioneight =>
			optioneight.setName('userseven')
				.setDescription('the first user to add the role to')),
	async execute(interaction) {
		const role = interaction.options.getRole('roletoadd'); //inputs from role above
		const users = new Array();
		users.push(interaction.options.getUser('userone'));//inputs from userone above and adds them to an array
		users.push(interaction.options.getUser('usertwo') ?? null);
		users.push(interaction.options.getUser('userthree') ?? null);
		users.push(interaction.options.getUser('userfour') ?? null);
		users.push(interaction.options.getUser('userfive') ?? null); 
		users.push(interaction.options.getUser('usersix') ?? null);   
		users.push(interaction.options.getUser('userseven') ?? null); 
		for (let i = 0; i < users.length; i++) {
			if (users[i] != null)
			{
				const userPromise = interaction.guild.members.fetch(users[i].id);
            	userPromise.then(user => {
            		user.roles.add(role.id)
        		});
			}
			//could add a else: exit here, but i dont want to incase someone adds the options not in order.git 
		}
		await interaction.reply("It has been done.");
		},
	};