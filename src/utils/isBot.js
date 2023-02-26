export const isBot = (userAgent) => {
    const bots = [
      'Googlebot',
      'Bingbot',
      'Slurp',
      'DuckDuckBot',
      'Baiduspider',
      'YandexBot',
    ];

    return bots.some(bot => userAgent.includes(bot));
}