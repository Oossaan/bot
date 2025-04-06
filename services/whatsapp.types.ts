import { Message as WAMessage, Chat as WAChat } from 'whatsapp-web.js';

export interface WhatsAppMessage {
  body: string;
  from: string;
  getChat(): Promise<WAChat>;
}

export interface Chat {
  sendMessage(message: string): Promise<WAMessage>;
}
