const { Events } = require('discord.js');
const delayHolderMap = require('../delayHolderMap');

module.exports = {
	
	name: Events.ThreadCreate,
	async execute(interaction) {
		console.log(interaction);
		waitToDelete(interaction)
	},
};

async function waitToDelete(interaction){
	const delayMap = new delayHolderMap("file");
	delayMap.add(interaction.id);
	const delayOriginal = delayMap.get(interaction.id);
	var delay = ms => new Promise(res => setTimeout(res, ms));
	
	try{
		//collection.set(interaction.id, 1000 * 60)//secs, mins, hours, days. * 7 for 7 days
		delayChanged = true
		while(delayChanged){
			await delay(delayMap.get(interaction.id))
			.then(() => {
				console.log("True!")
				if (delayOriginal == delayMap.get(interaction.id)){delayChanged = false}
				else{delayChanged = true}})
			.then(() => {if(delayChanged){delay = ms => new Promise(res => setTimeout(res, delayMap.get(interaction.id) - delayOriginal))}});
		}
		
		await interaction.setLocked(true, "Locekd by bot: -time limit expired")
	}
	catch (err){
		console.log(err);
	}
}
