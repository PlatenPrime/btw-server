import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const one = '6777916786:';
const two = "AAG1HB5d9spnsql"
const three = "YM3zIV8C5SFa4JA7GV-E"

const TOKEN = one + two + three;


const CHAT_ID = "-1002121224059";
const PLATEN_ID = "555196992";

export const sendMessageToTelegram = async (message) => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID, // Replace 'CHAT_ID' with your actual chat ID
        text: message,
      }
    );
    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Функция для отправки сообщения в чат
export const sendMessageToChat = async (message, chatId) => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
      }
    );
    console.log("Message sent to chat:", response.data);
  } catch (error) {
    console.error("Error sending message to chat:", error);
  }
};

// Функция для отправки сообщения пользователю
export const sendMessageToUser = async (message, userId) => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        chat_id: userId,
        text: message,
        parse_mode: "HTML",
      }
    );
    console.log("Message sent to user:", response.data);
  } catch (error) {
    console.error("Error sending message to user:", error);
  }
};

export const sendMessageToPlaten = async (message) =>
  sendMessageToUser(message, PLATEN_ID);

export const sendFileToUser = async (filePath, userId) => {
  try {
    const formData = new FormData();
    formData.append("chat_id", userId);
    formData.append("document", fs.createReadStream(filePath)); // Прикрепляем файл

    const response = await axios.post(
      `https://api.telegram.org/bot${TOKEN}/sendDocument`,
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Обязательно указываем корректные заголовки для multipart/form-data
        },
      }
    );

    console.log("Файл успешно отправлен пользователю:", response.data);
  } catch (error) {
    console.error("Ошибка отправки файла пользователю:", error);
  }
};

export const sendFileToPlaten = async (filePath) =>
  sendFileToUser(filePath, PLATEN_ID);
