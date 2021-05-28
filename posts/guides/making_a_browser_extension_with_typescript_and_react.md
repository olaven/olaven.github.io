# How I'm building an Extension with Typescript and React 
My goal with this guide is to show how I ended up building a chrome extension with [Typescript](https://www.typescriptlang.org/) and [react](https://reactjs.org/). It won't necessarily fit your use case. But I certainly hope you can draw inspiration from it :-) 

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
## Initialize and add dependencies 
We first need to initialize a new project and add the dependencies we need. 
I've written a short script with the commands below. 
It boils down to: initialize a project, and add parcel and typescript. 
```sh 
mkdir my_extension_project;
cd my_extension_project; 
yarn init -y; 
yarn add react react-dom 
yarn add --dev\
    typescript\
    parcel\
    @types/react\
    @types/react-dom\ 
    @types/chrome\ 
echo "Extension setup done 🧑‍🚀"
```

## Simple Workflow 
TODO: continue here
The workflow I want is: 
* dev command 
* build command 

## Popups and background scripts 
### Add your first component 
### Adding a background script 

## Install your extension in chrome or firefox 

## See the results! 

## See browser vendors for publishing 
* link to guides 


## Closing 
Thank you for reading this 
If this helped you out, consider supporting my open work on Github 
Consider checking out my projects...
Send me an email :)
