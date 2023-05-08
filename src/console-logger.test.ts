import { createLoggerFor, LogEvent, onLogEvent, customizeDefaultLogConfig, LogLevel, LoggerConfig } from './console-logger';
import expect from "expect.js";

describe("console-logger", () => {
    it("generates events", () => {
        let result: LogEvent = undefined as any;
        let count: number = 0;
        const subFn = event => { count++; result = event };
        const sub = onLogEvent.subscribe(subFn);

        const logger = createLoggerFor("banana");
        logger("test");
        expect(count).to.be(1);
        expect(result).to.be.ok();
        expect(result.time).to.be.ok();
        expect(result.uptime).to.be.ok();

        delete (result as any).time;
        delete (result as any).uptime;

        expect(result).to.eql({ namespace: "banana", level: "debug", message: "test", extras: [] })

        sub.unsubscribe();
    });
    function worksForLogLevel(level: LogLevel) {
        it("works for " + level, () => {
            let result: LogEvent = undefined as any;
            let count: number = 0;
            const subFn = event => { count++; result = event };
            const sub = onLogEvent.subscribe(subFn);

            const logger = createLoggerFor("banana");
            logger[level]("test");
            expect(count).to.be(1);
            expect(result).to.be.ok();

            expect(result.level).to.be(level)

            sub.unsubscribe();
        });
    }
    worksForLogLevel(LogLevel.debug);
    worksForLogLevel(LogLevel.error);
    worksForLogLevel(LogLevel.info);
    worksForLogLevel(LogLevel.warn);
    it("filters events at the global level", () => {
        let result: LogEvent = undefined as any;
        let count: number = 0;
        const subFn = event => { count++; result = event };
        const sub = onLogEvent.subscribe(subFn);

        const logger = createLoggerFor("banana");
        customizeDefaultLogConfig({ logThreshold: LogLevel.warn });
        logger("test1");
        logger.warn("test2");

        expect(count).to.be(1);
        expect(result).to.be.ok();
        expect(result.time).to.be.ok();
        expect(result.uptime).to.be.ok();

        delete (result as any).time;
        delete (result as any).uptime;

        expect(result).to.eql({ namespace: "banana", level: "warn", message: "test2", extras: [] })

        customizeDefaultLogConfig({ logThreshold: LogLevel.debug });
        sub.unsubscribe();
    });
    it("filters events at the individual logger level", () => {
        let result: LogEvent = undefined as any;
        let count: number = 0;
        const subFn = event => {count++; result = event };
        const sub = onLogEvent.subscribe(subFn);

        const logger = createLoggerFor("banana");
        logger.config({ logThreshold: LogLevel.warn });
        logger("test1");
        logger.warn("test2");

        expect(count).to.be(1);
        expect(result).to.be.ok();
        expect(result.time).to.be.ok();
        expect(result.uptime).to.be.ok();

        delete (result as any).time;
        delete (result as any).uptime;

        expect(result).to.eql({ namespace: "banana", level: "warn", message: "test2", extras: [] })

        sub.unsubscribe();
    });
    it("filters events at the individual logger level via constructor", () => {
        let result: LogEvent = undefined as any;
        let count: number = 0;
        const subFn = event => {count++; result = event ;}
        const sub = onLogEvent.subscribe(subFn);

        const logger = createLoggerFor("banana", { logThreshold: LogLevel.warn });
        logger("test1");
        logger.warn("test2");

        expect(count).to.be(1);
        expect(result).to.be.ok();
        expect(result.time).to.be.ok();
        expect(result.uptime).to.be.ok();

        delete (result as any).time;
        delete (result as any).uptime;

        expect(result).to.eql({ namespace: "banana", level: "warn", message: "test2", extras: [] })

        sub.unsubscribe();
    });
    it("support for literals", () => {
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
        expect(result).to.be.ok();
        expect(result).to.eql(["%clevel-format#%cThis is a literal#%cmessage-format", "level-style", "", "message-style", 1, 2, 3])
    });
    it("formats logs", () => {
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
        expect(result).to.be.ok();
        expect(result).to.eql(["%clevel-format#%cmessage-format#%cnamespace-format#%ctime-format#%cuptime-format", "level-style", "message-style", "namespace-style", "time-style", "uptime-style", 1, 2, 3])
    });
    it("Style gets reset", () => {
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
        expect(result).to.be.ok();
        expect(result).to.eql(["%clevel-format#%cmessage-format#namespace-format#%ctime-format#%cuptime-format", "level-style", "", "time-style", "", 1, 2, 3])
    });
    it("Default delimiter is a space", () => {
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
        expect(result).to.be.ok();
        expect(result).to.eql(["namespace-format uptime-format"])
    });
    it("throws an error for invalid formatter", () => {
        const testConfig: any = {
            format: {
                namespace: true,
            },
            include: ["namespace"]
        };
        const logger = createLoggerFor("banana", testConfig);
        expect(() => logger("test", 1, 2, 3)).to.throwError();
    });
    it("missing formatter defaults to value", () => {
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
        expect(result).to.be.ok();
        expect(result).to.eql(["banana"])
    });
    it("missing format section defaults to value", () => {
        const testConfig: Partial<LoggerConfig> = {
            style: {
                namespace: undefined
            },
            format: undefined,
            include: ["namespace"]
        };
        const logger = createLoggerFor("banana", testConfig);
        const result = logger("test");
        expect(result).to.be.ok();
        expect(result).to.eql(["banana"])
    });
});
