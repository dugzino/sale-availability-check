export const loggerStyle = {
  info: { color: '\x1b[0m' },
  warn: { color: '\x1b[33m' },
  error: { color: '\x1b[31m' },
  success: { color: '\x1b[32m' },
}

// Utils
export const urlBuilder = (url: string, path: string): string => `${url}${path}`;

export const articleAvailability = (articleName: string, url: string, isAvailable: boolean) => {
  const logType = isAvailable ? 'success' : 'error';
  logger(url, logType, `${articleName} -`);
}

export const logger = (text: string, logType: string = 'info', preString: string = '') => {
  const { color } = loggerStyle[logType];
  if (preString) return console.log(`\x1b[37m%s${color}`, preString, text);
  console.log(color, text);
}
