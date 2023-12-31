const { Events } = require('discord.js');
const delayHolderMap = require('../delayHolderMap');
const channelHolder = require('../channelHolder');

module.exports = {
	
	name: Events.ThreadCreate,
	async execute(interaction) {
		//console.log(interaction);
		waitToDelete(interaction)
	},
};

async function waitToDelete(interaction){
	const channelArray = new channelHolder();
	if(!channelArray.contains(interaction.id))
	{
		return
	}
	const delayMap = new delayHolderMap();
	delayMap.add(interaction.id);
	var delayOriginal = delayMap.get(interaction.id);
	//var delay = ms => new Promise(res => setTimeout(res, ms));
	var timeWaited = 0;
	
	try{
		delayChanged = true
		while(delayChanged){
			await delay(delayMap.get(interaction.id) - timeWaited)
			
			delayMap.update()
			if (delayOriginal == delayMap.get(interaction.id))
			{
				delayChanged = false
				interaction.setLocked(true, "Locked by bot: -time limit expired")
			}
			else{
				timeWaited += delayOriginal
				delayOriginal = delayMap.get(interaction.id);
				delayChanged = true
			}
		}
		
	}	
	catch (err){
		console.log(err);
	}
}
function delay(time)
{
	return new Promise((resolve) => {
	  setTimeout(resolve, time);
	});
};