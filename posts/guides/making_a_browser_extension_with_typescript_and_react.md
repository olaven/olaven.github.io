# How I'm building an Extension with Typescript and React 
My goal with this guide is to show how I ended up building a chrome extension with [Typescript](https://www.typescriptlang.org/) and [react](https://reactjs.org/). It won't necessarily fit your use case. But I certainly hope you can draw inspiration from it :-) 

To follow this post, you should have [a basic understanding of React](https://reactjs.org/docs/getting-started.html) as well a little experience with [NodeJS](nodejs.org). 

I've divided this post into two parts: 
1. [Why I chose the tech stack that I did](#going-with-a-comfortable-tech-stack)
2. [Showing you how to setup the project](#lets-actually-make-something)

## Going with a comfortable tech stack 
### I want the type-safety typescript can give me 
My experience is that the benefits of Typescript (or other statically typed languages) outweigh the downsides. 
I especially like how it makes refactoring much easier. 
Typescript screams at you when things are changing. Javascript silently fails. 
The former allows me to constantly search for better ways of expressing the program I'm writing without 
being afraid (too afraid) of breaking something down the line. 

### React is familiar 
Although I prefer to work on backend code, I happen to know React quite well. 
I decided to learn it sometime back in 2017, and stuck with it. When [hooks](https://reactjs.org/docs/hooks-intro.html) were released, I transitioned into writing functional react components and I have yet to look back. I have no good explanation for why I like this. This way of writing UI and handling state just happens to work well with the way I think. 
Naturally, React was my first choice for writing a browser extension.

### Let's try to avoid bloated configuration files 
Configuration files very quickly become a mess. I find this to be escpecially true in the JS ecosystem. Before knowing it, you end up with a `.babelrc`, `webpack.config.js`, `package.json`, `<INSERT_TEST_FRAMEWORK>.config.ts`, `.eslintrc` and so on. 

This quickly becomes hard to maintain. Perhaps it shouldn't be this way, but I mostly find configuration files to be instances of "I have no idea why this works, let's not touch it". 
It's hard to debug and easy to make mistakes. Bad combination. 
([relevant comic](https://preview.redd.it/a0hf4zzwv4a11.jpg?width=640&crop=smart&auto=webp&s=0dad1c1d40783ba976a6d39f994fe423eb305dc5)) 

I landed on [Parcel](parceljs.org) which promises to need zero configuration. And I've found this to be largely true. This [might bite me some day](https://imgs.xkcd.com/comics/will_it_work.png), but for now I'm happy :-) 

## Let's actually make something!
Did you just skip to this section? That's fine. I'd likely have done the same. 
The contents of this section should be enough to create your extension. However, the full source 
code is available [on Github](https://github.com/olaven/browser-extension-with-tsx).  

## Initialize and add dependencies 
We first need to initialize a new project and add the dependencies we need. 
I've written a short script with the commands below. 
It boils down to: initialize a project, and add parcel and typescript. 
```sh 
mkdir my_extension_project;
cd my_extension_project; 
yarn init -y; 
yarn add react react-dom 
yarn add --dev typescript parcel @types/react @types/react-dom  @types/chrome;
echo "Extension setup done 🧑‍🚀";
```

This script adds `"main": "index.js"` to `package.json`. Remove this manually.

## Simple Workflow 
This is the workflow we'll end up with: 
We want a `yarn dev` command, automatically rebuilding our source code when developing. 
We'll add a `yarn build`  command as well, for building our extension for distribution :) 

With parcel, these are very simple. Just add the following JSON configuration to the `package.json` we just created.
```json 
/*..*/
"scripts": {
    "dev": "parcel watch src/index.html --public-url=./",
    "build": "parcel build src/index.html --public-url=./"
}
/*..*/
```

You'll notice that we're referencing an `index.html` file in these scripts. 
This will be the entry point of our extension (more on this [in in a second](#add-your-first-popup)).

These commands are basically variants on "let parcel look at this file and do all the stuff Babel and Webpack would usually do".

## Popups and background scripts 
This is the time to make ourselves familiar with some extension concepts. I'll keep it short. 
### Popups are UI 
Extension popups define the GUI of our application. That is, 
the visual elements that pop up when you click on the extension. 
If you use a password manager, the popup would be the window where you 
enter your master password and search for the password you want to use. 
### Background scripts are useful for interacting with the browser 
Background scripts are programs that run independently of the UI or other state in the browser. 
They are useful for handling long term state, e.g. by interacting with the [storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage). They can also be used to run code on events in the browser. Such 
events can be creation of new windows or navigation between tabs. 

### Telling the browser about our extension
The details of the extension is defined in a `manifest.json` file at the root of our project folder. 
`manifest.json` tells the browser what our extension should have permission to do and where it's source files are.
You can [check out MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#manifest.json) for further details. 

For now, let's add a `manifest.json` looking like this: 
```json 
{
  "name": "My First Extension",
  "version": "0.0.1",
  "description": "My first browser extension!",
  "manifest_version": 2,
}
```

## Install your extension in chrome or firefox 
Before we start making stuff, we want to install our extension in the browser. 
This allows us to see what we're making.

* If you're using Firefox
  1. navigate to `about:debugging` in your browser
  2. click _This Firefox_
  3. click _Add temporary extension_
  4. select the `manifest.json` file in this folder 
* If you're using Chrome
  1. navigate to `chrome://extensions`
  2. click _Load Unpacked_
  3. select the your project directory
  
### Add your first popup
Most of the following should be familiar if you've used React before. If you're confused, refer to the code comments :-)  

The entry point of our application will be `index.html` - [classic](https://www.youtube.com/watch?v=x3AYYRqRMC4). 
We'll add it at `src/index.html` as this matches with the [build script](#simple-workflow) we added in `package.json` earlier.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <!-- The root node of our component tree -->
    <div id="root"></div>
</body>
<!-- The entry point for our React components -->
<script src="./components/index.tsx"></script>
</html>
```

Similarly, let's add a `./src/components.index.tsx`. This file will load our react component. 
```tsx

import * as React from "react"; 
import * as ReactDOM from "react-dom"; 

//This is our counter component 
const Counter = () => {
    const [ count, setCount ] = React.useState(0);
    return <>
        <h2>{count}</h2>
        <button onClick={() => {setCount(count + 1)}}>increment</button>
        <button onClick={() => {setCount(count - 1)}}>decrement</button>
    </>
}

/* We're now telling React to render this component on the webpage, inside 
the first element it can find with and id of "root". Notice how this matches 
the `div`-tag in our `index.html` :-) */
ReactDOM.render(<Counter />, document.getElementById("root"));
```

Lastly, the browser needs to know about our popup to show it. 
As [just discussed](#telling-the-browser-about-our-extension), this is done through our `manifest.json` file. 
Simply add the following to it: 
```json
/*...*/
"browser_action": {
  "default_popup": "dist/index.html"
}
/*...*/
```

Notice how we're referencing `dist/index.html` and not `src/index.html`. This is because 
parcel creates and leaves our files in the `dist`-directory when it is done transforming our Typescript and React code to 
plain `.js`-files :-) 


### Did it work? 
It's time to see our beautiful creation!
Open a terminal and run `yarn dev`. You should see a message like `✨ Built in 58ms`. 

Now open your browser, and click on your extension. There it is! Or should be.
If something went wrong, read the error message carefully and try to figure out what's 
going on. You can always refer to [the full solution](https://github.com/olaven/browser-extension-with-tsx) if you're stuck.

While you're at it, try to make a change in your component. Notice how the change is picked up in the browser at once. Parcel has rebuilt our source files automatically :-)

### Adding a background script 
* tell browser about it through `manifest.json`
* create the file -> listen for tab creation 
* add to parcel command 
* how to see the logs 

## See the results! 

## See browser vendors for publishing 
I'm not going to cover how to publish your extensions here. 
This blog post covers a lot already. Browsers will have guides for this. 
[Here's one the one for Chrome](https://developer.chrome.com/docs/webstore/publish/) and [here's the same for Firefox](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/). 


## Closing 
Thank you for reading. It really means a lot to me.
If this helped you out, please consider supporting my work through [Github Sponsors](https://github.com/sponsors/olaven).  
If you have any questions, feel free to [send me an email](mailto:olav@sundfoer.com) :-) 
