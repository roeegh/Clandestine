require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
	]
});


client.slashCommands = new Collection();

try {
    const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on( event.name, async (...args) => await event.execute(...args, client));
        }
    }
    console.log('[CLIENT] All Events Loaded.');
} catch (error) { console.error(`[ERROR] ${error}`) }

try {
    const slashCommands = fs.readdirSync('./interactions/slash');

    for (const module of slashCommands) {
        const commandFiles = fs.readdirSync(`./interactions/slash/${module}`).filter((file) => file.endsWith('.js'));

        for (const commandFile of commandFiles) {
            const command = require(`./interactions/slash/${module}/${commandFile}`);
            client.slashCommands.set(command.data.name, command);
        }
    }
    console.log('[CLIENT] All Slash Commands Loaded.');
} catch (error) { console.error(`[ERROR] ${error}`) }

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD), { body: [...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON())] });
		console.log('[CLIENT] All Slash Commands Registered.');
	} catch (error) { console.error(`[ERROR] ${error}`) }
})();

client.login(process.env.TOKEN);
