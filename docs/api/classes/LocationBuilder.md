---
layout: default
title: "Class: LocationBuilder"
parent: Classes
grand_parent: API Reference
---
[**@thejulianjara/whatsapp.js v1.3.8**](../README.md)

***

[@thejulianjara/whatsapp.js](../globals.md) / LocationBuilder

# Class: LocationBuilder

Defined in: [src/models/Location.ts:16](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L16)

Builder class for creating location messages.

## Example

```ts
const location = new LocationBuilder({
  name: 'Office',
  latitude: -34.6037,
  longitude: -58.3816,
  phone_number: 5491112345678
});
```

## Implements

- [`Location`](../interfaces/Location.md)

## Constructors

### Constructor

> **new LocationBuilder**(`data`): `LocationBuilder`

Defined in: [src/models/Location.ts:27](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L27)

Creates a new LocationBuilder instance.

#### Parameters

##### data

[`Location`](../interfaces/Location.md)

The initial location data.

#### Returns

`LocationBuilder`

## Properties

### address?

> `optional` **address?**: `string`

Defined in: [src/models/Location.ts:18](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L18)

#### Implementation of

[`Location`](../interfaces/Location.md).[`address`](../interfaces/Location.md#address)

***

### latitude

> **latitude**: `number`

Defined in: [src/models/Location.ts:19](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L19)

#### Implementation of

[`Location`](../interfaces/Location.md).[`latitude`](../interfaces/Location.md#latitude)

***

### longitude

> **longitude**: `number`

Defined in: [src/models/Location.ts:20](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L20)

#### Implementation of

[`Location`](../interfaces/Location.md).[`longitude`](../interfaces/Location.md#longitude)

***

### name

> **name**: `string`

Defined in: [src/models/Location.ts:17](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L17)

#### Implementation of

[`Location`](../interfaces/Location.md).[`name`](../interfaces/Location.md#name)

***

### phone\_number

> **phone\_number**: `number`

Defined in: [src/models/Location.ts:21](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L21)

#### Implementation of

[`Location`](../interfaces/Location.md).[`phone_number`](../interfaces/Location.md#phone_number)

## Methods

### getFullAddress()

> **getFullAddress**(): `string`

Defined in: [src/models/Location.ts:35](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L35)

Returns a formatted string with all location parts joined by commas.

#### Returns

`string`

The full address string.

***

### setAddress()

> **setAddress**(`address`): `void`

Defined in: [src/models/Location.ts:58](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L58)

Sets the street address.

#### Parameters

##### address

`string`

The address string.

#### Returns

`void`

***

### setLatitude()

> **setLatitude**(`latitude`): `void`

Defined in: [src/models/Location.ts:66](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L66)

Sets the latitude coordinate.

#### Parameters

##### latitude

`number`

The latitude value.

#### Returns

`void`

***

### setLongitude()

> **setLongitude**(`longitude`): `void`

Defined in: [src/models/Location.ts:74](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L74)

Sets the longitude coordinate.

#### Parameters

##### longitude

`number`

The longitude value.

#### Returns

`void`

***

### setName()

> **setName**(`name`): `void`

Defined in: [src/models/Location.ts:50](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L50)

Sets the location name.

#### Parameters

##### name

`string`

The name of the location.

#### Returns

`void`

***

### setPhoneNumber()

> **setPhoneNumber**(`number`): `void`

Defined in: [src/models/Location.ts:82](https://github.com/TheJulianJara/whatsapp.js/blob/67a623d96a97e10069d62ac1c26e36b59cf0d1fe/src/models/Location.ts#L82)

Sets the phone number associated with the location.

#### Parameters

##### number

`number`

The phone number.

#### Returns

`void`
