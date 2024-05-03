**@tobes31415/console-logger** • [**Docs**](globals.md)

***

# Console-Logger

A Javascript console log formatter that logs the correct line number. Also supports forking logs to other log reporters so that you can have the benefit of both

[View API Docs](docs/modules.md)

# Installation

    npm install --save @tobes31415/console-logger

# Basic Useage

    import { createLogFor } from "@tobes31415/console-logger";

    const logger = createLogFor("My Module Name");

    console.log(...logger("This is a test", 123, "abc"));
    // "[My Module Name] 0.5s This is a test", 123, "abc"

# Advanced Useage - Forking Log Events

    import { onLogEvent } from "@tobes31415-console-logger";

    onLogEvent.subscribe(log => {
      //log messages to a server or something
      myServerLogger.log(log.message, ...);
    })

# Advanced Useage - Customizing the loggers Globally

    import { customizeDefaultLogFormatter } from "@tobes31415-console-logger";

    customizeDefaultLogFormatter({
       format: {
         uptime: ms => Math.round(ms / 1000) + "s",
       },
       style: {
         uptime: "color:green"
       }
    });

# Advanced Useage - Customizing individual loggers

    import { createLogFor } from "@tobes31415-console-logger";

    const logger = createLogFor("My Module Name");

    logger.config({
      logThreshold: "warn"
    });

    console.log(...logger("This does not get logged"));
    console.warn(...logger.warn("This one does get logged"));

## Thank you

Big thank you to Macadamian Technologies for donating time towards this open source project :-)
