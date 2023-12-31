const { SlashCommandBuilder } = require('discord.js');
const delayHolderMap = require('../../delayHolderMap');

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('createnewtimer')
		.setDescription('Adds a timer to a thread and locks it once the time is up. Time can be added with addtime')
		.addChannelOption(thread =>
			thread.setName('thread')
				.setDescription('The thread that you want to add time to')
				.setRequired(true))
        .addIntegerOption(delay => 
            delay.setName('delay')
				.setDescription('The amount of time the bot will wait before locking the thread (in days)')
				.setRequired(true)
            ),
	async execute(interaction) {
		const channel = interaction.options.getChannel('thread'); //inputs from thread above
		if (channel.constructor.name != 'ThreadChannel')
		{
			await interaction.reply("The channel supplied is not a Thread channel!");
			return
		}
		const delayIn = interaction.options.getInteger('delay');
		const delayMap = new delayHolderMap();
		delayMap.add(channel.id, delayIn);
		var delayOriginal = delayMap.get(channel.id);
		var timeWaited = 0;
		await interaction.reply("Created a timer in: " + channel.toString() + " for: " + delayIn + " days");
		try{
			delayChanged = true
			while(delayChanged){
				await delay(delayMap.get(channel.id) - timeWaited)
				console.log("doop!")
				delayMap.update()
				if (delayOriginal == delayMap.get(channel.id))
				{
					delayChanged = false
					channel.setLocked(true, "Locked by bot: -time limit expired")
				}
				else{
					timeWaited += delayOriginal
					delayOriginal = delayMap.get(channel.id);
				}
			}
			
			
		}	
		catch (err){
			console.log(err);
		}
		console.log(interaction, channel, delayIn);
		
	},
};

function delay(time)
{
	return new Promise((resolve) => {
	  setTimeout(resolve, time);
	});
};

