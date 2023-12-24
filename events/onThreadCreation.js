const { Events } = require('discord.js');

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
	const delay = ms => new Promise(res => setTimeout(res, delayOriginal));
	
	try{
		//collection.set(interaction.id, 1000 * 60)//secs, mins, hours, days. * 7 for 7 days
		delayChanged = true
		while(delayChanged){
			delay
			.then((val) => {
				if (delay == delayMap.get(interaction.id)){ delayChanged = true}
				else{delayChanged = false}})
			.then(delay = ms => new Promise(res => setTimeout(res, get(interaction.id) - delayOriginal)));

		}
		
		await interaction.setLocked(true, "Locekd by bot: -time limit expired")
	}
	catch (err){
		console.log(err);
	}
}
