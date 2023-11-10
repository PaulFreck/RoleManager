const fs = require('node:fs');
const path = require('node:path');
//These are generally to fine the commands directory and import our commands
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
// Require the necessary discord.js classes
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });

client.commands = new Collection(); //allows the rest of the progress to get commands stored in a collection

const foldersPath = path.join(__dirname, 'commands'); //gets all files in commands
const commandFolders = fs.readdirSync(foldersPath);
//const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //nothing but js gets added
//might need the code above to handle things that aren't .js in commands

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
}}

const eventsPath = path.join(__dirname, 'events');//gets all files in events
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')); //nothing but js gets added

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args)); //execute once if it's once is true
	} else {
		client.on(event.name, (...args) => event.execute(...args)); //else execute always
	}
}


// Log in to Discord with your client's 
client.login(token);


