const settings = require('../settings.json')

module.exports = {
	checkForMentions: function(userID, channelID, message, BotClientID, UserClientChannels) {
		if(checkMessage(userID, channelID, BotClientID, UserClientChannels)) {
			for(let i = 0; i < settings.mentionOn.length; i++) {
				if(message.toLowerCase().indexOf(settings.mentionOn[i]) >= 0) {
					return true
				}
			}
			return false
		}
	}
}

function checkMessage(userID, channelID, BotClientID, UserClientChannels) { // checking for reasons to not mention
	for(let i = 0; i < settings.ignoreChannelIDs.length; i++) {
		if(channelID === settings.ignoreChannelIDs[i]) {
			return false
		}
	}

	if(userID !== BotClientID && UserClientChannels[channelID] !== undefined) {
		return true
	} else {
		return false
	}
}
