import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { query } from '../lib/db';

import { WhatsAppMessage, Chat } from './whatsapp.types';

interface ClientInfo {
  wid: {
    server: string;
    user: string;
    _serialized: string;
  };
  pushname: string;
  platform: string;
}

class WhatsAppService {
  private client: Client;
  private static instance: WhatsAppService;

  private constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth({ clientId: "omega-jasa-titip" }),
      puppeteer: { 
        headless: true,
        args: ['--no-sandbox']
      }
    });

    this.setupEventHandlers();
    this.client.initialize();
  }

  public static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService();
    }
    return WhatsAppService.instance;
  }

  private setupEventHandlers() {
    this.client.on('qr', (qr) => {
      console.log('Scan QR code berikut untuk login:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('WhatsApp Bot siap digunakan!');
    });

    this.client.on('message', async (msg) => {
      if (msg.body === '!order') {
        await this.handleOrderCommand(msg);
      }
    });
  }

  private async handleOrderCommand(msg: WhatsAppMessage) {
    try {
      const chat = await msg.getChat();
      await chat.sendMessage('Silakan kirim detail pesanan Anda');
      
      // Simpan ke database
      const result = await query(
        'INSERT INTO orders (phone, message, service_type) VALUES ($1, $2, $3) RETURNING *',
        [msg.from, 'Pesan order dari WhatsApp', 'whatsapp']
      );

      console.log('Order berhasil disimpan:', result.rows[0]);
    } catch (error) {
      console.error('Gagal memproses order:', error);
    }
  }

  public getClient() {
    return this.client;
  }
}

export const whatsappService = WhatsAppService.getInstance();
