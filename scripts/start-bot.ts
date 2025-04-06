async function startBot() {
  const { whatsappService } = await import('../services/whatsapp.service.js');
  import type { WhatsAppMessage, Chat } from '../services/whatsapp.types';

  console.log('Starting WhatsApp bot in development mode...');

  process.on('SIGINT', () => {
    console.log('\nShutting down WhatsApp bot...');
    process.exit(0);
  });

  process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
  });
}

startBot().catch(err => {
  console.error('Failed to start bot:', err);
  process.exit(1);
});
