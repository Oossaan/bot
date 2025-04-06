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
    constructor(options: any);
    initialize(): void;
    on(event: 'qr', listener: (qr: string) => void): void;
    on(event: 'ready', listener: () => void): void;
    on(event: 'message', listener: (message: Message) => void): void;
    info?: ClientInfo;
  }

  export class Message {
    body: string;
    from: string;
    getChat(): Promise<Chat>;
  }

  interface Chat {
    sendMessage(message: string): Promise<void>;
  }

  export class LocalAuth {
    constructor(options?: { clientId?: string });
  }
}
