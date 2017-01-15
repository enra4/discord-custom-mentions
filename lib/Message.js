const settings = require('../settings.json')

module.exports = {
	checkForMentions: function(userID, channelID, message, UserClientID, BotClientID, UserClientChannels) {
		for(let i = 0; i < settings.mentionOn.length; i++) {
			if(message.toLowerCase().indexOf(settings.mentionOn[i]) >= 0) {
				return checkMessage(userID, channelID, UserClientID, BotClientID, UserClientChannels)
			}
		}
	}
}

function checkMessage(userID, channelID, UserClientID, BotClientID, UserClientChannels) { // checking for reasons to not mention
	for(let i = 0; i < settings.ignoreChannelIDs.length; i++) {
		if(channelID === settings.ignoreChannelIDs[i]) {
			return false
		}
	}

	for(let i = 0; i < settings.ignoreUserIDs.length; i++) {
		if(userID === settings.ignoreUserIDs[i]) {
			return false
		}
	}

	if(userID !== UserClientID && userID !== BotClientID && UserClientChannels[channelID] !== undefined) { // message must be in a textchannel
		return true
	} else {
		return false
	}
}
