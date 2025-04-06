declare module 'whatsapp-web.js' {
  interface ClientInfo {
    wid: {
      server: string;
      user: string;
      _serialized: string;
    };
    me: {
      server: string;
      user: string;
      _serialized: string;
    };
    pushname: string;
  }

  export class Client {
    constructor(options: {
      puppeteer?: any;
      authStrategy?: any;
      webVersion?: string;
      webVersionCache?: {
        type: string;
        path: string;
      };
    });
    initialize(): Promise<void>;
    destroy(): Promise<void>;
    on(event: 'qr', listener: (qr: string) => void): this;
    on(event: 'ready', listener: () => void): this;
    on(event: 'message', listener: (message: Message) => void): this;
    info?: ClientInfo;
  }

  export interface Message {
    body: string;
    from: string;
    to: string;
    getChat(): Promise<Chat>;
    reply(content: string): Promise<Message>;
  }

  export interface Chat {
    sendMessage(message: string): Promise<Message>;
  }

  export class LocalAuth {
    constructor(options?: { 
      clientId?: string;
      dataPath?: string;
    });
  }

  export class NoAuth {
    constructor();
  }

  export interface MessageMedia {
    mimetype: string;
    data: string;
    filename?: string;
  }
}
