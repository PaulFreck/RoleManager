const { SlashCommandBuilder } = require('discord.js');
const delayHolderMap = require('../../delayHolderMap');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtime')
		.setDescription('adds specidied time to a specified thread')
		.addChannelOption(thread =>
			thread.setName('thread')
				.setDescription('The thread that you want to add time to')
				.setRequired(true))
        .addIntegerOption(delay => 
            delay.setName('delay')
				.setDescription('the amount of delay you want')
				.setRequired(true)
            ),
	async execute(interaction) {
		const channel = interaction.options.getChannel('thread'); //inputs from thread above
		var delay = interaction.options.getInteger('delay');
		const delayMap = new delayHolderMap("output.txt");
		var orginalDelay = parseInt(delayMap.get(channel.id)) / (1000) //needs to be updated as this goes on
		console.log(orginalDelay)
		if (isNaN(orginalDelay))
			orginalDelay = 0
		console.log(orginalDelay)
		console.log(delay)
		delay += orginalDelay
		//console.log(delay)
		delayMap.add(channel.id, delay);
		await interaction.reply("changed " + channel.toString() + " from: " + orginalDelay + " to: " + delay + " days");
		},
	};