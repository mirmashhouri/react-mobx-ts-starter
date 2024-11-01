# Client server communication — API requests

An overview of the Front-end perspective of the client server communication logic and abstractions with examples.

The Front-end defines API requests and their typescript type definitions under the [/src/api](./src/api) directory.

## The Endpoint class — Intro

The endpoint class is an abstraction on top of the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
Its purpose is to simplify a few project specific needs.

- Endpoint authorization
- Refreshing the user's token
- Automatic JSON data handling
- A uniform interface for sending: query params, JSON data, multipart/form-data to the server

#### Syntax:

```js
new Endpoint(httpMethod, path, basePath).build();
```

- httpMethod: string
- path: string
- basePath (optional) : string

_Note_: `.build()` returns an async function — A function that returns a promise.
`(data?) => Promise<>`

#### Example:

```js
export const ProductApi = {
  assets: new Endpoint("get", "/products/assets").build(),
};

// in another file
import { ProductApi } from "api/Products";

const fetchAssets = async () => {
  const assets = await ProductApi.assets();
  // store assets in state or update state
};
```

In the example above, you can imagine that the back-end has an endpoint that's accessible at
`www.<domain>/en-us/products/assets`.

When we define our new Endpoint, we pass what kind of request it is (a get request) and the path to it (`'/player/assets'`).

We call the `.build()` method at the end, which will return a function — `PlayerApi.assets` is a function.

When we call `PlayerApi.assets()`, it will return a promise that will hold the response data when it resolves, so we can `await` it.

If the request finishes successfully, our `const assets` variable will hold the result (a JS array).

## Good practices

It's strongly recommended to wrap server requests/responses in `try-catch` blocks,
because you never know what might go wrong on the server, or on the network connection.

For the demonstration purposes of this documentation,
the examples are not wrapped in a `try-catch` for the sake of reducing complexity.

```js
const fetchAssets = async () => {
  try {
    const assets = await ProductApi.assets();
    // do something with the data
  } catch (e) {
    console.error(e);
  }
};
```

## Sending data with a request

In most cases, we also want to send some data to the back-end along with the request.

Let's imagine that we have to pass an `id` property to the back-end for a request.

```js
export const PlayerApi = {
  assets: new Endpoint("get", "/player/assets").build(),
};

// ...

const assets = await PlayerApi.assets({
  // the data we want to send
  id: "someID",
});
```

An object with an `id` property is passed to `PlayerApi.assets()`.

The function that's returned by `new Endpoint().build()` will accept an object to pass along with the request —`(data) => Promise`.

It's important to pay attention to the `keys` of the object that's passed.
If the back-end expects a `colorId` property on the server, then we would have:

```js
const assets = await PlayerApi.assets({
  colorId: "someID",
});
```

#### Query params

By default, the Endpoint class will take the key/value pairs and add them to the url as query parameters.

```js
const data = { id: "someID" };
const assets = await PlayerApi.assets(data);
```

When the request is sent, the url will look like:
`www.<domain>/<culture>/products/assets?id=someID`

#### JSON

To send data as JSON to the server, return to the Endpoint definition
and call `.json()`.

```js
export const PlayerApi = {
  assets: new Endpoint("get", "/player/assets")
    .json() // send JSON formatted data to the server
    .build(),
};

// In this case, because we called `.json()`
// this data will be sent as JSON formatted data in the request
await PlayerApi.assets({
  id: "someID",
});
```

#### Authorization

Some requests require an authentication token for authorization.
`.auth()` — This will ensure to pass the user's token with the appropriate headers
when the request is made.

```js
export const PlayerApi = {
  assets: new Endpoint("get", "/player/assets").auth().json().build(),
};
```

#### multipart/form-data

Data can also be sent using the `multipart/form-data` format.
This can be useful in cases where you need to upload binary data to the server (files, images).

```js
export const PlayerApi = {
  assets: new Endpoint("get", "/player/assets").formData().build(),
};
```

\*Note that only the definition of the endpoint changes to switch between different formats for sending data.
We always pass an object with keys/values, no matter if it's query params, JSON or FormData.

```js
await PlayerApi.assets({
  id: "someID",
});
```

## Dynamic endpoint paths

For some endpoint, part of the path will need to change with the data.

Imagine an url such as: `https://dogtracker.com/dogs/a8098c1a`.

The `/dogs/a8098c1a` part is the path which is loading data that's specific for 1 dog.

```
/dogs/{id}
```

If you want to load the data for another dog, then, you need to change the `id` in the url.

The Endpoint class supports such cases with a familiar syntax:

```js
export const DogsApi = {
  // {id} is a placeholder that will be replaced at runtime
  getDog: new Endpoint("get", "/dogs/{id}").build(),
};

await DogsApi.getDog({
  id: "a8098c1a",
});
```

The brackets `{propertyName}` mark anything inside of them, as a placeholder.
In the example above, the data passed to the `id` property will replace the `{id}` part of the url path,
just before the request is made.

Multiple placeholders can also be defined:

```js
export const DogsApi = {
  getParkInfo: new Endpoint("get", "/dogs/{id}/parks/{parkId}").build(),
};

await DogsApi.getParkInfo({
  id: "a8098c1a",
  parkId: "fcd342f4",
});
```

An error is thrown, if you define a placeholder, but don't pass a property matching that placeholder's name.

From a front-end perspective, you don't need it,
but if you're interested about API design, google has a great pdf book that's also free:
https://cloud.google.com/files/apigee/apigee-web-api-design-the-missing-link-ebook.pdf

## Receiving data

In the following example, `dog` is the 'response data'
that we want to get back from the request.

```js
const id = "a8098c1a";
const dog = await DogsApi.getDog({ id });

// after the await
// the request will have been resolved, and we can access the 'dog' data.
console.log(dog.name);
console.log(dog.owner);
```

\*Note:

In almost all cases, the Back-end will return data in JSON format.
The Endpoint class will automatically look at the response headers
and parse the data if it has the appropriate `Content-Type` header.

That's why, in the example above, we didn't need to call `JSON.parse()` on the data
before accessing it.

## Typescript - type definitions

In order to minimize the risk of passing the wrong data to a request,
or not handling the response of a request correctly, all endpoints should have type definitions
for their request data and the expected response.

If we think about it, when we make a function call to make the request,
some data is passed to a function and the function returns a promise with the response data.

```js
(RequestData) => Promise<ResponseData>
```

For this specific purpose, there is a generic type defined to simplify our type definitions:

```js
EndpointFunc<RequestData, ResponseData>
```

With this generic, all we need to worry about is passing `RequestData` as the first parameter,
and `ResponseData` as the second parameter.

Here's an example of how the type definitions for the DogApi might be defined

```js
interface IDogRequest {
  id: string
}

interface IDogResponse {
  name: string
  owner: string
  age: number
}

export type IDogApi = {
  getDog: EndpointFunc<IDogRequest, IDogResponse>
}
```

And here's an example of how this type definition would be imported and assigned.

```js
import type { IDogApi } from "./types";

export const DogsApi: IDogApi = {
  getDog: new Endpoint("get", "/dogs/{id}").build(),
};
```

## Async Mobx state updates

There is a small difference in how state is updated when you try to modify an
observable piece of state in an asyncrhonous context.

Since client-server communication is asynchronous in nature, when updating
state after receiving a response, the update should be contained whitin a `mobx action`.

Documentation: https://mobx.js.org/actions.html#asynchronous-actions

## Intercepting responses

Warning: You should almost never need to use this.

In some rare cases, it might be desirable to transform the data from the response directly at the source,
where the endpoint is defined. You can kind of think of it as middleware — It's some code that will run every time
after the response arrives, but before we use it in our code.

```js
// override the name property
const dogTransformer = (dog) => {
  return {
    ...dog,
    name: "Mr. " + dog.name,
  };
};

export const DogsApi = {
  getDog: new Endpoint("get", "/dogs/{id}")
    .transformResponse(dogTransformer)
    .build(),
};

const id = "a8098c1a";
const dog = await DogsApi.getDog({ id });

console.log(dog.name); // Mr. Woof — `Mr. ` was added in front.
```

## Throttling requests

A request can be throttled for a certain time by calling `.throttle(<time>)`.

This wraps the function call in **lodash's** throttle implementation.
This sets `{ trailing: false }` for the throttle options, which might not always be desired.

Make sure that you fully understand how throttle works, before using this method. Subsequent function calls, in the defined time period, will not make new requests, but instead return the previous request's result, which could lead to the wrong state in the application, if not careful.

For more info: https://lodash.com/docs/4.17.15#throttle

```js
export const DogsApi = {
  getDog: new Endpoint("get", "/dogs/{id}").throttle(1000).build(),
};
```
