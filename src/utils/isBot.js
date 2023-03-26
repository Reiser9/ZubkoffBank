export const isBot = (userAgent = window.navigator.userAgent) => {
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