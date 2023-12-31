const { SlashCommandBuilder } = require('discord.js');
const channelHolder = require('../../channelHolder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addforumchannel')
		.setDescription('adds or deletes a forum channel where new threads will be locked after 7 days')
        .addChannelOption(channel =>
			channel.setName('forum')
				.setDescription('The forum that you want') 
				.setRequired(true))
        .addBooleanOption(remove =>
            remove.setName('remove')
                .setDescription('remove the forum instead')
                .setRequired(false)),
	async execute(interaction) {
		channel = interaction.options.getChannel('forum')
        remove = interaction.options.getBoolean('remove') ?? false
        if (channel.constructor.name != 'ForumChannel')
		{
			await interaction.reply("The channel supplied is not a Forum channel!");
			return
		}
        arr = new channelHolder();
        if (remove)
        {
            arr.remove(channel)
            await interaction.reply("Removed " + channel.toString());
        }
        else{
            arr.add(channel)
            await interaction.reply("Added " + channel.toString());
        }
	},
};
