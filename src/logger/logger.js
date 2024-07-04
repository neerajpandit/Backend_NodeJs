import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console()
    // Uncomment these lines to log warnings and errors to separate files
    // new transports.File({
    //   level: 'warn',
    //   filename: 'logsWarnings.log'
    // }),
    // new transports.File({
    //   level: 'error',
    //   filename: 'logsErrors.log'
    // })
  ],
  format: format.combine(
    format.timestamp(),
    format.json()
    // Uncomment these lines to add additional formatting options
    // format.metadata(),
    // format.prettyPrint()
  )
});

export default logger;
