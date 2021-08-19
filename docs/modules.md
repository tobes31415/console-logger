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
- [LogEventProperties](modules.md#logeventproperties)

### Variables

- [onLogEvent](modules.md#onlogevent)

### Functions

- [createLogFor](modules.md#createlogfor)
- [customizeDefaultLogConfig](modules.md#customizedefaultlogconfig)

## Type aliases

### LogEventFormatSections

Ƭ **LogEventFormatSections**: keyof `Omit`<[`LogEvent`](interfaces/LogEvent.md), ``"extras"``\>

#### Defined in

console-logger.ts:36

___

### LogEventProperties

Ƭ **LogEventProperties**: keyof [`LogEvent`](interfaces/LogEvent.md)

#### Defined in

console-logger.ts:35

## Variables

### onLogEvent

• `Const` **onLogEvent**: `Observable`<[`LogEvent`](interfaces/LogEvent.md)\>

#### Defined in

console-logger.ts:80

## Functions

### createLogFor

▸ **createLogFor**(`namespace`, `config?`): [`Logger`](interfaces/Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |
| `config?` | `Partial`<[`LoggerConfig`](interfaces/LoggerConfig.md)\> |

#### Returns

[`Logger`](interfaces/Logger.md)

#### Defined in

console-logger.ts:86

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

console-logger.ts:82
