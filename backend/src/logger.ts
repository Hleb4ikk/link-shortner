import signale from 'signale';

export const logError = (throwPlace: string, message: string) =>
  signale.error(
    `[${new Date(Date.now()).toLocaleString()}] - [ERROR] in ${throwPlace} - ${message}`,
  );
