const Discord = require('discord.io')
const Message = require('./lib/Message.js')
const settings = require('./settings.json') // go to settings.json to change settings...

const UserClient = new Discord.Client({
	autorun: true,
	token: settings.userToken
})

const BotClient = new Discord.Client({
	autorun: false,
	token: settings.botToken
})

UserClient.on('ready', function(event) {
	BotClient.connect()
})

BotClient.on('ready', function(event) {
	console.log('---')
	console.log(`Logged in as ${UserClient.username} & ${BotClient.username}`)
	console.log(`Will message ${UserClient.username} on: ${settings.mentionOn}`)
})

UserClient.on('message', function(user, userID, channelID, message, event) {
	if(Message.checkForMentions(userID, channelID, message, UserClient.id, BotClient.id, UserClient.channels)) {
		if(BotClient.connected) {
			BotClient.sendMessage({
				to: UserClient.id,
				message: `<#${channelID}> ${user}: ${message}`
			})
		}
	}
})

UserClient.on('disconnect', function(errMsg, code) { // errMsg doesnt seem to work
	console.log('---')
	console.log(new Date())
	console.log(`error - ${code}`)
	UserClient.connect()
})

BotClient.on('disconnect', function(errMsg, code) {
	console.log('---')
	console.log(new Date())
	console.log(`error - ${code}`)
	BotClient.connect()
})
