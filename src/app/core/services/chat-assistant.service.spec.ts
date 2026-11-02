import { ChatAssistantService } from './chat-assistant.service';

describe('ChatAssistantService', () => {
  const service = new ChatAssistantService();

  it('answers by keyword, ignoring case and word endings', () => {
    expect(service.reply('What are the TIMINGS?').text).toContain('open');
    expect(service.reply('When is the laddu velam?').text).toContain('7:00 PM');
  });

  it('answers Telugu keywords', () => {
    expect(service.reply('లడ్డు వేలం ఎప్పుడు?').text).toContain('Laddu Velam');
  });

  it('does not match short keywords inside longer words', () => {
    expect(service.reply('history').unmatched).toBe(true);
  });

  it('falls back when nothing matches', () => {
    expect(service.reply('qwerty').unmatched).toBe(true);
  });
});
