import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";

const {
    format: { combine, colorize, timestamp, json },
} = winston;

const fileTransport = new winston.transports.DailyRotateFile({
    filename: "%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "3m",
    maxFiles: "7d",
    //save log to logs folder
    dirname: path.join(__dirname, "../logs"),
});

const logger = winston.createLogger({
    level: "info", //create info level logger
    format: combine(colorize(), timestamp(), json()),
    transports: [fileTransport],
});

export default logger;