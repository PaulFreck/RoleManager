const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addroles')
		.setDescription('takes one role and provides all provided users with that role.')
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
				.setDescription('the second user to add the role to'))
		.addUserOption(optionfour =>
			optionfour.setName('userthree')
				.setDescription('the third user to add the role to'))
		.addUserOption(optionfive =>
			optionfive.setName('userfour')
				.setDescription('the fourth user to add the role to'))
		.addUserOption(optionsix =>
			optionsix.setName('userfive')
				.setDescription('the fifth user to add the role to'))
		.addUserOption(optionseven =>
			optionseven.setName('usersix')
				.setDescription('the sixth user to add the role to'))
		.addUserOption(optioneight =>
			optioneight.setName('userseven')
				.setDescription('the seventh user to add the role to')),
	async execute(interaction) {
		const role = interaction.options.getRole('roletoadd'); //inputs from role above
		if (interaction.member.roles.highest.comparePositionTo(role) < 0)
		{
			await interaction.reply("Sorry, you don't have the permissions for that.")
			return
		}
		const users = new Array();
		users.push(interaction.options.getUser('userone'));//inputs from userone above and adds them to an array
		users.push(interaction.options.getUser('usertwo') ?? null);
		users.push(interaction.options.getUser('userthree') ?? null);
		users.push(interaction.options.getUser('userfour') ?? null);
		users.push(interaction.options.getUser('userfive') ?? null); 
		users.push(interaction.options.getUser('usersix') ?? null);   
		users.push(interaction.options.getUser('userseven') ?? null); 
		for (let i = 0; i < users.length; i++) { //for each user in the command
			if (users[i] != null) //if non null
			{
				const userPromise = interaction.guild.members.fetch(users[i].id);
            	userPromise.then(user => {
					
            		user.roles.add(role.id).catch(e => console.log(e));
					
        		});
			}
			//could add a else: exit here, but i dont want to incase someone adds the options not in order.
		}
		await interaction.reply("It has been done.");
		},
	};