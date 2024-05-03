[**@tobes31415/console-logger**](../README.md) • **Docs**

***

[@tobes31415/console-logger](../globals.md) / Logger

# Interface: Logger()

Use this inside your console.log( ) to add formatting as well as forking to any third party loggers you may be using

console.log(...logger("This is a test")); // if you omit the level it is assumed to be a debug message
console.error(...logger.error("This is an error"));

> **Logger**(`message`, ...`extras`): `any`[]

## Parameters

• **message**: `string`

• ...**extras**: `any`[]

## Returns

`any`[]

## Source

[console-logger.ts:53](https://github.com/tobes31415/console-logger/blob/1e4b4d3093e19c228b2652efee7620e71b7bea77/src/console-logger.ts#L53)

## Methods

### config()

> **config**(`newConfig`): `void`

#### Parameters

• **newConfig**: `Partial`\<[`LoggerConfig`](LoggerConfig.md)\>

#### Returns

`void`

#### Source

[console-logger.ts:58](https://github.com/tobes31415/console-logger/blob/1e4b4d3093e19c228b2652efee7620e71b7bea77/src/console-logger.ts#L58)

***

### debug()

> **debug**(`message`, ...`extras`): `any`[]

#### Parameters

• **message**: `string`

• ...**extras**: `any`[]

#### Returns

`any`[]

#### Source

[console-logger.ts:54](https://github.com/tobes31415/console-logger/blob/1e4b4d3093e19c228b2652efee7620e71b7bea77/src/console-logger.ts#L54)

***

### error()

> **error**(`message`, ...`extras`): `any`[]

#### Parameters

• **message**: `string`

• ...**extras**: `any`[]

#### Returns

`any`[]

#### Source

[console-logger.ts:55](https://github.com/tobes31415/console-logger/blob/1e4b4d3093e19c228b2652efee7620e71b7bea77/src/console-logger.ts#L55)

***

### info()

> **info**(`message`, ...`extras`): `any`[]

#### Parameters

• **message**: `string`

• ...**extras**: `any`[]

#### Returns

`any`[]

#### Source

[console-logger.ts:57](https://github.com/tobes31415/console-logger/blob/1e4b4d3093e19c228b2652efee7620e71b7bea77/src/console-logger.ts#L57)

***

### warn()

> **warn**(`message`, ...`extras`): `any`[]

#### Parameters

• **message**: `string`

• ...**extras**: `any`[]

#### Returns

`any`[]

#### Source

[console-logger.ts:56](https://github.com/tobes31415/console-logger/blob/1e4b4d3093e19c228b2652efee7620e71b7bea77/src/console-logger.ts#L56)
