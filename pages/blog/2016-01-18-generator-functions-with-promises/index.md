---
title: Generator functions with promises
date: 01/18/2016
description: "An in-depth explanation of how generator functions can be used to make complex asynchronous code simple"
---


A **generator function** is a function that can be exited and re-entered later. It's written just like a normal function, except it's declared with the keyword `function*`. Notice the `yield` keywords, which can only be used inside a **generator function** - these are the points where code execution enters and exits the function body.

```javascript
var sayHello = (what) => `hello, ${what}`

function* generator() {
  yield sayHello('dog')
  yield sayHello('cat')
}
```

Invoking a **generator function** creates an **iterator**.
```javascript
var iterator = generator()
```
Iterators provide the interface for running the code inside of a generator function. By invoking the `next` method of the iterator, we can run code in the generator function in steps, with program flow entering and exiting the function body.

```javascript
var message = iterator.next().value
// message = 'hello, dog'
message = iterator.next().value
// message = 'hello, cat'
```
When `iterator.next()` is invoked, the code inside of `generator` is executed up to the first `yield` statement, where the code 'pauses'. The result of invoking `iterator.next()` is a `step` object with a `value` property, which is the value of the expression to the right of the `yield` keyword (`sayHello('dog')`, which returned `'hello, dog'`). Invoking `iterator.next()` again 'resumes' program flow where it left off and executes until the next yield statement. The `step` object returned by `next()` now has a `value` of `'hello, cat'`.

This `step` object returned by invoking `next` contains another property: `done`. The `done` property is a`boolean` and is only `true` after the **generator function** returns.

```javascript
const saySomething = (what) => `hello, ${what}`

function* generator() {
  yield saySomething('dog')
  yield saySomething('cat')
  return 'fin'
}

var iterator = generator()
var step = iterator.next() // { value: 'hello, dog', done: false }
step = iterator.next() // { value: 'hello, cat', done: false }
step = iterator.next() // { value: 'fin', done: true }

```

We can also pass input back into the generator function by invoking the `next` method with an argument. The value passed into the `next` method is assigned to the left of the `yield` keyword. This behavior is illustrated below.

```javascript
// All together
const saySomething = (what) => `hello, ${what}`

function* generator() {
  var response = yield saySomething('dog')
  console.log(response)
  response = yield saySomething('cat')
  console.log(response)
}

var iterator = generator()

var message
message = iterator.next(1).value
console.log(message)
message = iterator.next(2).value
console.log(message)
// hello, dog
// 1
// hello, cat
// 2
```

<hr>

This functionality is very interesting - exiting and re-entering a function body is certainly some unique behavior. As it turns out, it's a very useful trick in handling asynchronous code.

By leveraging **generator functions** with some clever use of **Promises**, we can create an elegant way to handle complex asynchronous code in a simple, readable way.

Let's begin by imagining that our `sayHello` function needed to do some asynchronous work that takes some time and returns a **Promise**. The normal **Promise**-based control flow would look something like this:
```javascript
var Promise = require('bluebird')
var sayHello = (what) => Promise.resolve(`hello, ${what}`).delay(1000)

function usePromises () {
  return sayHello('dog')
    .then(message => {
      console.log(message)
      return sayHello('cat')
    })
    .then(message => {
      console.log(message)
    })
}

usePromises()
// 0s: 'hello, dog'
// 1s: 'hello, cat'
```
This chainable `.then` style syntax, especially when complemented with `bluebird`'s excellent helper methods, is certainly an improvement over a raw callback-based approach and libraries such as `async`, but it leaves a lot to be desired, especially when things get complicated and fairly nested **Promise** chain logic becomes unavoidable.

If we could use the es7 `async` / `await` syntax, this code would be much more elegant. However, these methods are not part of the es6 standard and require a transpilation step, which is not for everyone. Here's what the future holds:
```javascript
var Promise = require('bluebird')
var sayHello = (what) => Promise.resolve(`hello, ${what}`).delay(1000)

async function useAsyncAwait() {
  var message = await sayHello('dog')
  console.log(message)
  message = await sayHello('cat')
  console.log(message)
}

useAsyncAwait()
// 1s: 'hello, dog'
// 2s: 'hello, cat'
```

The `async` / `await` syntax is remarkably simple to our **generator function** based code from earlier - execution of code seemingly pauses in the middle of the function, waits for a **Promise** to resolve, then picks up where it left off. The question is, can we make **generator functions**  exhibit the same sort of behavior with asynchronous code?

It turns out that we can by using a few tricks. `bluebird`, as usual, offers an excellent implementation, but to better understand how it works and feel even more confident in our understanding, we'll build our own.

Recall that a **generator function** returns an **iterator**, and that this **iterator** is the interface for running the code inside of the generator. Also recall that by invoking the **iterator**'s `next` method, code inside the generator is executed up to the `yield` statement, where it 'pauses' until the `next` method is invoked again.

Now imagine pairing our asynchronous `sayHello` function with a **generator function**, like below
```javascript
var Promise = require('bluebird')
var sayHello = (what) => Promise.resolve(`hello, ${what}`).delay(1000)

function* generator() {
  yield sayHello('dog')
  yield sayHello('cat')
}
```
If we create an **iterator** and invoke `next`, it should come as no surprise that the `value` property of the object returned by calling the **iterator**'s `next` method is a **Promise**, since that's what `sayHello` is returning.
```javascript
var message
message = iterator.next().value
// message = Promise (will eventually resolve 'hello, dog')
message = iterator.next().value
// message = Promise (will eventually resolve 'hello, cat')
```

This is the secret - Since each invocation of the **iterator**'s `next` method gives us a  `Promise`, we can devise a way to make the resolution of each `Promise` trigger the `next` method, resuming the code inside the **generator** where we left off and giving us access to the next Promise.

```javascript
var Promise = require('bluebird')
var saySomething = (what) => Promise.resolve(`hello, ${what}`).delay(1000)

function* generator() {
  var message = yield saySomething('dog')
  console.log(message)
  message = yield saySomething('cat')
  console.log(message)
}

function runGenerator(genFn) {
  var iterator = genFn()
  nextStep()

  function nextStep(response) {
    var step = iterator.next(response)
    var promise = step.value
    if (!step.done) {
      promise.then(resolution => {
        nextStep(resolution)
      })
    }
  }
}

runGenerator(generator)
// 1s: hello, dog
// 2s: hello, cat
```
By wrapping our **generator function** with the helper function `runGenerator`, we can leverage the ability to exit and re-enter the generator function to elegantly handle asynchronous code with a very straightforward syntax.

Our `runGenerator` helper first creates an **iterator** from our **generator function**, then creates and invokes a function called `nextStep`. The `nextStep` function's job is actually pretty simple, even though it looks complicated - First, call `next` on the iterator, passing in the appropriate response to be handed back to the `yield` (The first time we call `nextStep`, we don't pass anything in, since we don't yet have anything to give back to the generator). By calling `next` on the iterator, code is run inside the **generator** up to the first `yield` statement, and we receive back a `step` object with a `value` property that's the **Promise** returned by `saySomething`!

This is the key - by adding a `.then` method to this **Promise**, we can define the behavior for it to perform when it resolves. What we want to do is trigger `nextStep`, but this time call it with the value resolved by the **Promise** (`'hello, dog'`). This `resolution` is then passed into the `iterator.next` method, which assigns it to the left of the first `yield` statement and the code restarts inside the **generator** unil the next `yield` is reached!

Notice that we have to check to make sure our `step` object isn't done before trying to call `next` again.





Fortunately, `bluebird` offers a `coroutine` method for doing just this. In cases where aysnchronous code is too complex to be handled elegantly by normal **Promise**-based methods, **generator functions** invoked by a **coroutine** handler can offer a massive increase in code readability.
```javascript
var Promise = require('bluebird')
var saySomething = (what) => Promise.resolve(`hello, ${what}`).delay(1000)

function* generator() {
  var message = yield saySomething('dog')
  console.log(message)
  message = yield saySomething('cat')
  console.log(message)
}

Promise.coroutine(generator)()
// 1s: hello, dog
// 2s: hello, cat
```

**Promises** with **generator functions** offer an elegant solution to the problems caused by complex asynchronous code - We can write code in a way that looks and behaves very much like normal, easy-to-read synchronous code by leveraging the ability to enter and exit the execution flow inside of a **generator**.
