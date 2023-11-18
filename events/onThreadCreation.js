const { Events } = require('discord.js');

module.exports = {
	name: Events.ThreadCreate,
	async execute(interaction) {
		console.log(interaction);
		waitToDelete(interaction)
	},
};

async function waitToDelete(interaction){
	const delay = ms => new Promise(res => setTimeout(res, ms));
	try{
		console.log("we got here")
		interaction.setName("Test complete")

	}
	catch (err){
		console.log(err);
	}
}
