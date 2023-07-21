import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { SEND_TELEGRAM_MESSAGE_URL } from './constants.js';

export class Telegram {
  constructor() {}

  sendTelegramMsg(message) {
    let data = { chat_id: process.env.CHAT_ID, text: message };
    if (!message || message.includes(undefined)) {
      console.warn('El mensaje está vacío, no se enviará');
      return;
    }

    try {
      console.log('Enviando mensaje a Telegram...');
      axios
        .post(SEND_TELEGRAM_MESSAGE_URL, data)
        .then(() => console.log('Mensaje enviado'))
        .catch((error) =>
          console.log('Error en request', error.response.config.url)
        );
    } catch (error) {
      console.log('Hubo un error');
    }
  }
}
