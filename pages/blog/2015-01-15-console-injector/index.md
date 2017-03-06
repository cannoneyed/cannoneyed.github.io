---
title: Console injector
date: 01/15/2015
description: "A chrome extension for quickly injecting javascript libraries from the console"
---


Last Thursday night we were given the opportunity to participate in a two-hour hackathon here at Hack Reactor, and when we were presented with the prompt of making a chrome extension, an idea I'd been thinking about in prior weeks immediately sprung to mind. Wouldn't it be great to be able to quickly inject javascript libraries right from the console?

My partner during the D3 sprint ([Matt Conrad](https://github.com/mmconrad "github")) and I had talked about how cool this would be when we were initially exploring the library. Instead of creating a custom 'demo' and manually installing the libraries, it would be very handy to quickly inject a library of choice into any page right from the console and get coding.

Enter [Console Injector](https://github.com/cannoneyed/console-injector)! The chrome extension creates a console.inject method that can be called to quickly inject any javascript library onto a given page.

```
console.inject('jquery')
```

The method searches [cdnjs](https://cdnjs.com/) for javascript libraries matching a given input string, and inserts the latest corresponding script hosted at [cdnjs.cloudflare.com](http://cdnjs.cloudflare.com). The magic lies in the following snippet of code, which 'injects' an injector script into the head of the current document:

```javascript
var element = document.createElement('script');
element.innerHTML = 'console.inject = ' + injectFunction.toString();
document.head.appendChild(element);
```

Since the javascript executed in the chrome extension doesn't have access to any variables in the current page, in order to modify the console object (which is just another object) we must first append a script to the DOM, which then modifies the console object indirectly. This bit of redirection allows us to inject an injector script onto the page, which in turn generates more script tags with a source attribute corresponding to the queried library.

---

Console Injector was a great project to learn about Chrome extensions and bring something to life in a short amount of time. I'd like to give a big thanks to all of my team members: [Wesley Smyth](http://www.github.com/wesleysmyth), [Kiran Rao](http://www.github.com/kranrao), [Henry Wong](http://www.github.com/henryw4k), and [Matt Conrad](http://www.github.com/mmconrad).

Console Injector is [open source](https://github.com/cannoneyed/console-injector) and available to download on the [Google Chrome Web Store](https://chrome.google.com/webstore/detail/abdfbnapkafgcheofcijaieahcbjnpkd).
