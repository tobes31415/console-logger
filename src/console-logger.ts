import { Observable, Subject } from "@tobes31415/basic-observables";
import { deepAssign } from "./util";

const APP_START_TIME = Date.now();

/**
 * Log level matches the console log levels
 */
export enum LogLevel {
    debug = "debug",
    error = "error",
    info = "info",
    warn = "warn"
}

function LevelToNumber(level: LogLevel): number {
    switch (level) {
        case LogLevel.debug:
            return 0;
        case LogLevel.info:
            return 1;
        case LogLevel.warn:
            return 2;
        case LogLevel.error:
            return 3;
    }
}

/**
 * The information broadcast to the observable when the logger is invoked
 */
export interface LogEvent {
    message: string;
    extras: any[];
    namespace: string;
    time: Date;
    uptime: number;
    level: LogLevel;
}

/**
 * The sections of the log event controlled by the formatter 
 */
export type LogEventFormatSections = keyof Omit<LogEvent, "extras">;

/**
 * Use this inside your console.log( ) to add formatting as well as forking to any third party loggers you may be using
 * 
 * console.log(...logger("This is a test")); // if you omit the level it is assumed to be a debug message
 * console.error(...logger.error("This is an error"));
 */
export interface Logger {
    (message: string, ...extras: any[]): any[];
    debug(message: string, ...extras: any[]): any[];
    error(message: string, ...extras: any[]): any[];
    warn(message: string, ...extras: any[]): any[];
    info(message: string, ...extras: any[]): any[];
    config(newConfig: Partial<LoggerConfig>): void;
}

/**
 * 
 */
export interface LoggerConfig {
    defaultLogLevel: LogLevel;
    logThreshold: LogLevel;
    include: LogEventFormatSections[];
    style?: Partial<Record<LogEventFormatSections, string>>;
    format?: Partial<Record<LogEventFormatSections, string | ((value: any) => string)>>;
    delimiter: string;
}

const DEFUALT_STYLE = {
    namespace: "color: green",
    uptime: "color: purple",
    time: "color: yellow",
    message: "color: blue"
};
const DEFAULT_FORMAT = {
    namespace: "[${namespace}]",
    uptime: uptime => `${uptime / 1000}s`,
    time: time => time.toISOString(),
    level: level => level.toUpperCase(),
    message: "${message}"
};
const DEFAULT_CONFIG: LoggerConfig = {
    defaultLogLevel: LogLevel.debug,
    logThreshold: LogLevel.debug,
    include: ["namespace", "level", "uptime", "time", "message"],
    style: Object.assign({}, DEFUALT_STYLE),
    format: Object.assign({}, DEFAULT_FORMAT),
    delimiter: " "
}
const currentGlobalConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

const broadcastEvent = new Subject<LogEvent>();
export const onLogEvent: Observable<LogEvent> = broadcastEvent;

export function customizeDefaultLogConfig(newConfig: Partial<LoggerConfig>) {
    deepAssign(currentGlobalConfig, DEFAULT_CONFIG, currentGlobalConfig, newConfig);
}

export function createLogFor(namespace: string, config?: Partial<LoggerConfig>): Logger {
    let currentConfig = config;
    const getConfig = () => deepAssign<LoggerConfig>({}, currentGlobalConfig, currentConfig);
    const result: Logger = (handleLog.bind(this, getConfig, namespace, undefined)) as any as Logger;
    Object.values(LogLevel).forEach(level => result[level] = handleLog.bind(this, getConfig, namespace, level));
    result.config = (newConfig) => {
        let previousConfig = currentConfig;
        currentConfig = deepAssign({}, previousConfig, newConfig);
    }
    return result;
}

function handleLog(configFn: () => LoggerConfig, namespace: string, level: LogLevel | undefined, message: string, ...extras: any[]): any[] {
    const config = configFn();
    const actualLevel = level || config.defaultLogLevel;
    if (LevelToNumber(actualLevel) < LevelToNumber(config.logThreshold)) {
        return [];
    }
    const time = new Date();
    const logEvent: LogEvent = {
        message,
        namespace,
        level: actualLevel,
        extras,
        time,
        uptime: (time.getTime() - APP_START_TIME),
    }
    try {
        broadcastEvent.next(logEvent);
    }
    catch (ignored) { }
    return formatLog(config, logEvent);
}

function formatLog(config: LoggerConfig, event: LogEvent): any[] {
    const result: string[] = [];
    const styles: string[] = [];
    config.include.forEach(section => {
        const interim: string[] = [];
        if (config.style && config.style[section]) {
            interim.push("%c");
            styles.push(config.style[section]!);
        }
        const formatter = config.format ? config.format[section] : undefined;
        const value = event[section];
        if (!formatter) {
            interim.push("" + value);
        }
        else if (typeof formatter === "string") {
            interim.push(formatter.replace("${" + section + "}", "" + value));
        }
        else if (typeof formatter === "function") {
            interim.push(formatter(value));
        } else {
            console.error(formatter, config);
            throw new Error("Log Formatter invalid, must be string or function");
        }
        result.push(interim.join(""));
    });
    return [result.join(config.delimiter ?? " "), ...styles, ...event.extras];
}
