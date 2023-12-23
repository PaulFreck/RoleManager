/*const { Events } = require('discord.js');

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
		collection.set(interaction.id, 1000 * 60)//secs, mins, hours, days. * 7 for 7 days
		await delay(collection.get(interaction.id)) 
		await interaction.setName("Test complete")

	}
	catch (err){
		console.log(err);
	}
}*/
