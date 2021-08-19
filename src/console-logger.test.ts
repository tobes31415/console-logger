import { Subscription } from '@tobes31415/basic-observables';
import { createLoggerFor, LogEvent, onLogEvent, customizeDefaultLogConfig, LogLevel, LoggerConfig } from './console-logger';

describe("console-logger", () => {
    test("generates events", () => {
        let result: LogEvent = undefined as any;
        const subFn = jest.fn(event => { result = event });
        const sub = onLogEvent.subscribe(subFn);

        const logger = createLoggerFor("banana");
        logger("test");
        expect(subFn).toHaveBeenCalledTimes(1);
        expect(result).toBeTruthy();
        expect(result.time).toBeTruthy();
        expect(result.uptime).toBeTruthy();

        delete (result as any).time;
        delete (result as any).uptime;

        expect(result).toEqual({ namespace: "banana", level: "debug", message: "test", extras: [] })

        sub.unsubscribe();
    });
    function worksForLogLevel(level: LogLevel) {
        test("works for " + level, () => {
            let result: LogEvent = undefined as any;
            const subFn = jest.fn(event => { result = event });
            const sub = onLogEvent.subscribe(subFn);

            const logger = createLoggerFor("banana");
            logger[level]("test");
            expect(subFn).toHaveBeenCalledTimes(1);
            expect(result).toBeTruthy();

            expect(result.level).toEqual(level)

            sub.unsubscribe();
        });
    }
    worksForLogLevel(LogLevel.debug);
    worksForLogLevel(LogLevel.error);
    worksForLogLevel(LogLevel.info);
    worksForLogLevel(LogLevel.warn);
    test("filters events at the global level", () => {
        let result: LogEvent = undefined as any;
        const subFn = jest.fn(event => { result = event });
        const sub = onLogEvent.subscribe(subFn);

        const logger = createLoggerFor("banana");
        customizeDefaultLogConfig({ logThreshold: LogLevel.warn });
        logger("test1");
        logger.warn("test2");

        expect(subFn).toHaveBeenCalledTimes(1);
        expect(result).toBeTruthy();
        expect(result.time).toBeTruthy();
        expect(result.uptime).toBeTruthy();

        delete (result as any).time;
        delete (result as any).uptime;

        expect(result).toEqual({ namespace: "banana", level: "warn", message: "test2", extras: [] })

        customizeDefaultLogConfig({ logThreshold: LogLevel.debug });
        sub.unsubscribe();
    });
    test("filters events at the individual logger level", () => {
        let result: LogEvent = undefined as any;
        const subFn = jest.fn(event => { result = event });
        const sub = onLogEvent.subscribe(subFn);

        const logger = createLoggerFor("banana");
        logger.config({ logThreshold: LogLevel.warn });
        logger("test1");
        logger.warn("test2");

        expect(subFn).toHaveBeenCalledTimes(1);
        expect(result).toBeTruthy();
        expect(result.time).toBeTruthy();
        expect(result.uptime).toBeTruthy();

        delete (result as any).time;
        delete (result as any).uptime;

        expect(result).toEqual({ namespace: "banana", level: "warn", message: "test2", extras: [] })

        sub.unsubscribe();
    });
    test("filters events at the individual logger level via constructor", () => {
        let result: LogEvent = undefined as any;
        const subFn = jest.fn(event => { result = event });
        const sub = onLogEvent.subscribe(subFn);

        const logger = createLoggerFor("banana", { logThreshold: LogLevel.warn });
        logger("test1");
        logger.warn("test2");

        expect(subFn).toHaveBeenCalledTimes(1);
        expect(result).toBeTruthy();
        expect(result.time).toBeTruthy();
        expect(result.uptime).toBeTruthy();

        delete (result as any).time;
        delete (result as any).uptime;

        expect(result).toEqual({ namespace: "banana", level: "warn", message: "test2", extras: [] })

        sub.unsubscribe();
    });
    test("support for literals", () => {
        const testConfig: Partial<LoggerConfig> = {
            style: {
                namespace: "namespace-style",
                uptime: "uptime-style",
                message: "message-style",
                time: "time-style",
                level: "level-style"
            },
            format: {
                namespace: "namespace-format",
                uptime: "uptime-format",
                message: "message-format",
                time: "time-format",
                level: "level-format"
            },
            delimiter: "#",
            include: ["level", "This is a literal", "message"]
        };
        const logger = createLoggerFor("banana", testConfig);
        const result = logger("test", 1, 2, 3);
        expect(result).toBeTruthy();
        expect(result).toEqual(["%clevel-format#%cThis is a literal#%cmessage-format", "level-style", "", "message-style", 1, 2, 3])
    });
    test("formats logs", () => {
        const testConfig: Partial<LoggerConfig> = {
            style: {
                namespace: "namespace-style",
                uptime: "uptime-style",
                message: "message-style",
                time: "time-style",
                level: "level-style"
            },
            format: {
                namespace: "namespace-format",
                uptime: "uptime-format",
                message: "message-format",
                time: "time-format",
                level: "level-format"
            },
            delimiter: "#",
            include: ["level", "message", "namespace", "time", "uptime"]
        };
        const logger = createLoggerFor("banana", testConfig);
        const result = logger("test", 1, 2, 3);
        expect(result).toBeTruthy();
        expect(result).toEqual(["%clevel-format#%cmessage-format#%cnamespace-format#%ctime-format#%cuptime-format", "level-style", "message-style", "namespace-style", "time-style", "uptime-style", 1, 2, 3])
    });
    test("Style gets reset", () => {
        const testConfig: Partial<LoggerConfig> = {
            style: {
                namespace: undefined,
                uptime: undefined,
                message: undefined,
                time: "time-style",
                level: "level-style"
            },
            format: {
                namespace: "namespace-format",
                uptime: "uptime-format",
                message: "message-format",
                time: "time-format",
                level: "level-format"
            },
            delimiter: "#",
            include: ["level", "message", "namespace", "time", "uptime"]
        };
        const logger = createLoggerFor("banana", testConfig);
        const result = logger("test", 1, 2, 3);
        expect(result).toBeTruthy();
        expect(result).toEqual(["%clevel-format#%cmessage-format#namespace-format#%ctime-format#%cuptime-format", "level-style", "", "time-style", "", 1, 2, 3])
    });
    test("Default delimiter is a space", () => {
        const testConfig: Partial<LoggerConfig> = {
            style: {
                namespace: "",
                uptime: "",
            },
            format: {
                namespace: "namespace-format",
                uptime: "uptime-format",
            },
            delimiter: undefined,
            include: ["namespace", "uptime"]
        };
        const logger = createLoggerFor("banana", testConfig);
        const result = logger("test");
        expect(result).toBeTruthy();
        expect(result).toEqual(["namespace-format uptime-format"])
    });
    test("throws an error for invalid formatter", () => {
        const testConfig: any = {
            format: {
                namespace: true,
            },
            include: ["namespace"]
        };
        const logger = createLoggerFor("banana", testConfig);
        expect(() => logger("test", 1, 2, 3)).toThrow();
    });
    test("missing formatter defaults to value", () => {
        const testConfig: Partial<LoggerConfig> = {
            style: {
                namespace: undefined
            },
            format: {
                namespace: undefined
            },
            include: ["namespace"]
        };
        const logger = createLoggerFor("banana", testConfig);
        const result = logger("test");
        expect(result).toBeTruthy();
        expect(result).toEqual(["banana"])
    });
    test("missing format section defaults to value", () => {
        const testConfig: Partial<LoggerConfig> = {
            style: {
                namespace: undefined
            },
            format: undefined,
            include: ["namespace"]
        };
        const logger = createLoggerFor("banana", testConfig);
        const result = logger("test");
        expect(result).toBeTruthy();
        expect(result).toEqual(["banana"])
    });
});
