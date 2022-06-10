[@tobes31415/console-logger](README.md) / Exports

# @tobes31415/console-logger

## Table of contents

### Enumerations

- [LogLevel](enums/LogLevel.md)

### Interfaces

- [LogEvent](interfaces/LogEvent.md)
- [Logger](interfaces/Logger.md)
- [LoggerConfig](interfaces/LoggerConfig.md)

### Type aliases

- [LogEventFormatSections](modules.md#logeventformatsections)

### Variables

- [onLogEvent](modules.md#onlogevent)

### Functions

- [createLoggerFor](modules.md#createloggerfor)
- [customizeDefaultLogConfig](modules.md#customizedefaultlogconfig)

## Type aliases

### LogEventFormatSections

Ƭ **LogEventFormatSections**: keyof `Omit`<[`LogEvent`](interfaces/LogEvent.md), ``"extras"``\>

The sections of the log event controlled by the formatter

#### Defined in

[console-logger.ts:44](https://github.com/tobes31415/console-logger/blob/888e098/src/console-logger.ts#L44)

## Variables

### onLogEvent

• `Const` **onLogEvent**: `Observable`<[`LogEvent`](interfaces/LogEvent.md)\>

#### Defined in

[console-logger.ts:97](https://github.com/tobes31415/console-logger/blob/888e098/src/console-logger.ts#L97)

## Functions

### createLoggerFor

▸ **createLoggerFor**(`namespace`, `config?`): [`Logger`](interfaces/Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |
| `config?` | `Partial`<[`LoggerConfig`](interfaces/LoggerConfig.md)\> |

#### Returns

[`Logger`](interfaces/Logger.md)

#### Defined in

[console-logger.ts:103](https://github.com/tobes31415/console-logger/blob/888e098/src/console-logger.ts#L103)

___

### customizeDefaultLogConfig

▸ **customizeDefaultLogConfig**(`newConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newConfig` | `Partial`<[`LoggerConfig`](interfaces/LoggerConfig.md)\> |

#### Returns

`void`

#### Defined in

[console-logger.ts:99](https://github.com/tobes31415/console-logger/blob/888e098/src/console-logger.ts#L99)
