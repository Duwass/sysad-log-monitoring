import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";

const {
    format: { combine, colorize, timestamp, json },
} = winston;

const infoTransport = new winston.transports.DailyRotateFile({
    filename: "%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "3m",
    maxFiles: "7d",
    //save log to logs folder
    dirname: path.join(__dirname, "../logs"),
    level: "info",
});


const errorTransport = new winston.transports.DailyRotateFile({
    filename: "%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "3m",
    maxFiles: "7d",
    //save log to logs folder
    dirname: path.join(__dirname, "../logs"),
    level: "error",
});

const logger = winston.createLogger({
    format: combine(colorize(), timestamp(), json()),
    transports: [infoTransport,errorTransport],
});

export default logger;