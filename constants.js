import * as dotenv from 'dotenv';
dotenv.config();

export const SEND_TELEGRAM_MESSAGE_URL = `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`;
