# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.22.0] - 2025-12-14

### Added

- The `Brand` utility type.

## [0.21.0] - 2025-12-14

### Added

- `Parser` and `AsyncParser` to represent parsing functions.
- `Transform` and `AsyncTransform` to represent transformations.

## [0.20.0] - 2025-12-06

### Added

- The `AbstractConstructor` utility. This is useful when constraining type parameters
that don't need to actually invoke the constructor, such as `InstanceType<T>` for example.

## [0.19.0] - 2025-12-06

### Changed

- Bumped a bunch of development related libraries. Moved from `eslint` to `biome`, which
resulted in a lot of code reformatting.

### Removed

- Removed support for Node 18 and Node 20. The minimum supported version is now Node 22.

## [0.18.0] - 2025-12-06

### Added

- The `TypeGuard` utility type to represent functional type guards.

## [0.17.0] - 2025-11-30

### Added

- The `MapKeys` utility type that simply maps all keys of a type to a given value.
- The `SameKeys` utility type that is an alias for `MapKeys<T, unknown>`. This one is meant to be
used as a type constraint that forces a type to have the same keys as another, yet impose nothing
on their values. Example:
`class MyTransform<T extends SameKeys<MyType>` declares a class that is parameterized on any 
type as long as they have the same keys as `MyType`. A method can then be made, with the example
signature: `myTransform<K extends keyof MyType>(key: K): T[K]` that takes a key of `MyType` and
transforms it to a value with a type specified by `T`.

## [0.16.0] - 2025-11-29

### Added

- The `Factory` and `AsyncFactory` callable type aliases. Those are similar to `Provider` homologous, the main
difference being that they expect parameters.

## [0.15.0] - 2025-11-08

### Removed

- `Events`, `EmitterLike` and `EmitterLikeBase`: moved those utilities to the [@infra-blocks/emitter](https://www.npmjs.com/package/@infra-blocks/emitter)
package.

## [0.14.0] - 2025-08-21

### Added

- `AsyncProvider`: the async version of the `Provider` that returns a promise.

## [0.13.1] - 2025-07-31

### Fixed

- Fixed legacy import of the module by adding a "main" field to the `package.json`.

## [0.13.0] - 2025-07-24

### Added

- The `Primitive` utility type that regroups all 7 TS/JS primitives:
  - bigint
  - boolean
  - null
  - number
  - string
  - symbol
  - undefined
- The matching `isPrimitive` type guard that checks if a value is a primitive.

## [0.12.0] - 2025-07-24

### Added

- A type predicate (as opposed to a type guard) that tests whether a value is a plain JS
object. It's only true in 2 cases:
  - If the object was created with a literal.
  - If the object was created with the `Object` constructor (`new Object()`).

### Fixed

- The return signature of `isObject`. Previously, the type guard stated `value is object`
as its return type, but this is incorrect. `typeof null` returns `"object"`, but the
typescript `object` type [does not include null values](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type).
Therefore, the real type that the type guard is checking against is `object | null`, and
not strictly `object`.

## [0.11.0] - 2025-07-23

### Added

- Additional primitive type guards:
  - `isBigint`
  - `isNull` (same as `=== null`)
  - `isObject` (same as `typeof value === "object"`)
  - `isObjectNotNull`
  - `isUndefined`

## [0.10.0] - 2025-07-02

### Added

- `Optional` utility type that allows selectively picking the fields that should be optional.

## [0.9.0] - 2025-07-02

### Removed

- Deprecated `UnpackedPromise` that has been superceded by standard type utility `Awaited`.

## [0.8.0] - 2025-06-28

### Added

- `unreachable` utility function that allows enforcing a switch case statement is
exhaustive.

## [0.7.0] - 2025-06-27

### Added

- `EnvironmentVariables` and `EnvVars` alias. This is one of the most commonly represented types
in our code, so we are alasing it for convenience. It maps to `Record<string, string | undefined>`.

## [0.6.0] - 2024-12-11

### Added

- Events utilities.
  - `Events` base type to describe what valid events are: a listing of field names with their corresponding handler types.
  - `EmitterLike` interface for classes and objects that offer event subscription through the `on` method.
  - `EmitterLikeBase` base class for convenient reusable implementation of emitters that make use of NodeJs emitters internally.

## [0.5.6] - 2024-12-11

### Deprecated

- Marked `UnpackedPromise` as deprecated, since Typescript now comes with the built-in type `Awaited`
that does the same, but probably better.

## [0.5.5] - 2024-05-19

### Changed

- Migrated to the [infra-blocks](https://github.com/infra-blocks) organization.

## [0.5.4] - 2024-04-21

### Added

- This changelog!

## [0.5.3] - 2024-04-13

### Added

- `package.json` search keywords.

## [0.5.2] - 2024-04-08

### Added

- `package.json` repository URL.

## [0.5.1] - 2024-04-07

### Changed

- Split the `README.md` file into `README.md` and `CONTIBUTING.md`.

## [0.5.0] - 2024-03-08

### Added

- `Constructor`

## [0.4.0] - 2024-03-06

### Added

- `Callable`

## [0.3.0] - 2024-02-24

### Added

- CJS compatible build output with package exports.

## [0.2.0] - 2024-01-04

### Added

- `Provider`

## [0.1.1] - 2023-06-28

### Changed

- Code coverage reported with C8 instead of Istanbul.

### Fixed

- `npm run clean` script and `.gitignore` to use the correct artifacts pattern.

## [0.1.0] - 2023-06-27

### Added

- First package version. It includes the following utility functions/types:
  - `Nullable`
  - `Predicate`
  - `ErrorHandler`
  - `UnpackedArray`
  - `UnpackedPromise`
  - `TransitivePartial`
  - `KeyOfType`
  - `isString`
  - `isSymbol`
  - `isNumber`
  - `isFunction`

[0.22.0]: https://github.com/infra-blocks/ts-types/compare/v0.21.0...v0.22.0
[0.21.0]: https://github.com/infra-blocks/ts-types/compare/v0.20.0...v0.21.0
[0.20.0]: https://github.com/infra-blocks/ts-types/compare/v0.19.0...v0.20.0
[0.19.0]: https://github.com/infra-blocks/ts-types/compare/v0.18.0...v0.19.0
[0.18.0]: https://github.com/infra-blocks/ts-types/compare/v0.17.0...v0.18.0
[0.17.0]: https://github.com/infra-blocks/ts-types/compare/v0.16.0...v0.17.0
[0.16.0]: https://github.com/infra-blocks/ts-types/compare/v0.15.0...v0.16.0
[0.15.0]: https://github.com/infra-blocks/ts-types/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/infra-blocks/ts-types/compare/v0.13.1...v0.14.0
[0.13.1]: https://github.com/infra-blocks/ts-types/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/infra-blocks/ts-types/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/infra-blocks/ts-types/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/infra-blocks/ts-types/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/infra-blocks/ts-types/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/infra-blocks/ts-types/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/infra-blocks/ts-types/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/infra-blocks/ts-types/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/infra-blocks/ts-types/compare/v0.5.5...v0.6.0
[0.5.5]: https://github.com/infra-blocks/ts-types/compare/v0.5.4...v0.5.5
[0.5.4]: https://github.com/infra-blocks/ts-types/compare/v0.5.3...v0.5.4
[0.5.3]: https://github.com/infra-blocks/ts-types/compare/v0.5.2...v0.5.3
[0.5.2]: https://github.com/infra-blocks/ts-types/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/infra-blocks/ts-types/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/infra-blocks/ts-types/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/infra-blocks/ts-types/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/infra-blocks/ts-types/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/infra-blocks/ts-types/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/infra-blocks/ts-types/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/infra-blocks/ts-types/releases/tag/v0.1.0
