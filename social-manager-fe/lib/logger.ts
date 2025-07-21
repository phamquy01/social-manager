export const logger = {
  error: ({ message, error }: { message: string; error?: Error }) => {
    if (error) {
      console.error(`[ERROR] ${message}`, error);
    }
  },
  warn: (message: string) => {
    console.warn(`[WARN] ${message}`);
  },
  info: (message: string, info?: unknown) => {
    console.info(`[INFO] ${message}`, info);
  },
};
