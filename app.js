const Discord = require('discord.io')
const settings = {
	userToken: '', // insert your user token here
	botToken: '', // insert your bot token here
	mentionOn: [] // add words you want to get mentioned on
}

const UserClient = new Discord.Client({
	autorun: true,
	token: settings.userToken
})

const BotClient = new Discord.Client({
	autorun: true,
	token: settings.botToken
})

BotClient.on('ready', function(event) {
	console.log(`Logged in as ${UserClient.username} & ${BotClient.username}`)
	console.log(`Will message ${UserClient.username} on: ${settings.mentionOn}`)
})

UserClient.on('message', function(user, userID, channelID, message, event) {
    if(checkForMentions(message) && user !== BotClient.username) { // dont want to get mentioned from bot messages
		BotClient.sendMessage({
			to: UserClient.id,
			message: `${user}: ${message}` // trash format sorry
		})
    }
})

function checkForMentions(message) {
	let lowered = message.toLowerCase()
	lowered = lowered.split(' ')
	for(let i = 0; i < settings.mentionOn.length; i++) {
		if(lowered.indexOf(settings.mentionOn[i]) > -1) {
			return true
		}
	}
	return false
}
