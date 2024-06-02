import axios from 'axios'


const BOT_API_TOKEN = '6777916786:AAEHbVOZvb0cuA9zyby3caPIfTk5OzzRsOY'


export const sendMessageToTelegram = async (message) => {
	try {
		const response = await axios.post(`https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`, {
			chat_id: '-1002121224059', // Replace 'CHAT_ID' with your actual chat ID
			text: message,
		});
		console.log('Message sent:', response.data);

	} catch (error) {
		console.error('Error sending message:', error);

	}

};



// Функция для отправки сообщения в чат
export const sendMessageToChat = async (message, chatId) => {
	try {
		const response = await axios.post(`https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`, {
			chat_id: chatId,
			text: message,
		});
		console.log('Message sent to chat:', response.data);
	} catch (error) {
		console.error('Error sending message to chat:', error);
	}
};

// Функция для отправки сообщения пользователю
export const sendMessageToUser = async (message, userId) => {
	try {
		const response = await axios.post(`https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`, {
			chat_id: userId,
			text: message,
			parse_mode: 'HTML',
		});
		console.log('Message sent to user:', response.data);
	} catch (error) {
		console.error('Error sending message to user:', error);
	}
};
