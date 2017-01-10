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

let botOnline = null

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

function logOnReady() {
	console.log('---')
	console.log(`Logged in as ${UserClient.username} & ${BotClient.username}`)
	console.log(`Will message ${UserClient.username} on: ${settings.mentionOn}`)
}

function logOnDisconnect(errMsg, code) {
	console.log('---')
	console.log(new Date())
	console.log(`error - ${code}`)
}

BotClient.on('ready', function(event) {
	botOnline = true
	logOnReady()
})

UserClient.on('message', function(user, userID, channelID, message, event) {
	if(checkForMentions(message) && user !== BotClient.username) { // dont want to get mentioned from bot messages
		if(botOnline) { // so it doesnt try to sendMessage if BotClient isnt connected
			BotClient.sendMessage({
				to: UserClient.id,
				message: `<#${channelID}> ${user}: ${message}` // trash format sorry
			})
		}
	}
})

BotClient.on('disconnect', function(errMsg, code) { // errMsg doesnt seem to work
	botOnline = false
	logOnDisconnect(errMsg, code)
	BotClient.connect()
})

UserClient.on('disconnect', function(errMsg, code) {
	logOnDisconnect(errMsg, code)
	UserClient.connect()
})
