# Blogging with Git and Markdown 

_Disclaimer_: parts of this guide covers a piece of software called Markblog, of which I am the author.

## Who is this for? 
This guide assumes that you are: 
* familiar with using the command line
* familiar with using `git`
* someone with a basic understanding of Markdown
* a Github user (👋 or [become one](https://github.com/join))

## What's this guide about? 
This guide will go through an easy way to get setup a blog. Afterwards, you 
will be able to blog with the following workflow: 
1. write markdown-files on your computer ✍️
2. push your prose to github 🐙
3. have your blog update automatically 😍

## What's the techstack, briefly? 
To build our blog from Markdown, we will use [Markblog](https://github.com/olaven/markblog). 
This is an open source tool written with [Deno](deno.land). 

In order to deploy our website, we will use [Github Pages](https://pages.github.com/). Github Pages 
is free and works - unsurprisingly - seamlessly with projects on Github. 
Additionally, [Github Actions](https://github.com/features/actions) will be used to automate the 
deployment process. If these tools are unfamiliar, this might seem like a lot. But stick with me, 
it is all relatively simple when it comes together 😅

## Enough talk, let's get started!

### Installation
1. [install Git](https://git-scm.com/)
2. [install Deno](https://deno.land/#install)
3. [install Markblog](https://github.com/olaven/markblog#installation)

### Git Setup 
1. create a repository on Github (check "Initialize this repository with a README")
2. Enable "Github Pages" in the repository settings by setting `master` as source. 
3. navigate to some fitting folder in your terminal, e.g. `cd $HOME/Documents`
4. clone your new repo with `git clone https://github.com/<your-username>/<your-repository-name>`

### Blog Setup
1. navigate to your cloned repository with `cd <your-repository-name>`
2. run `markblog init`
3. (optional) add `./style.css` to make your page look the way you want

Markblog has created two files for you: `index.md` and `./posts`. 
Anything you write in `index.md` will appear on the front-page of your blog. 
`./posts` is where you will write new posts on your blog. 

### Writing your first post 
Let's take a break from the setup, and write something!
1. open the repo-folder in your text editor of choice
2. in `index.md`, write a sentence or two about the blog. Or don't - it's up to you 🤗
3. create a new file in `./posts` called `my_first_post.md`. 
4. Write something in `./posts/my_first_post.md`. Or don't - still up to you 🍨

### Automated Deployment
After this step, we will have achieved the workflow outlined [at the beginning](#whats-this-guide-about)!
This section is long and somewhat cumbersome. However, this is automation! In other words,
we only have to do this once!

* On [Github](https://github.com)
  1. Go to your [profile settings](https://github.com/settings/profile)
  2. Navigate to "Developer settings" -> "Personal access tokens" 
  3. click "Generate new access token". This will prompt for your password.
  4. Make sure to check "repo"-access, write a fitting note and click "Generate token"
  5. Keep the token until step 8. Never share it!
  6. head over to the repository you created
  7. Navigate to "Settings" -> "Secrets" and click "Add a new secret"
  8. Add a secret called `ACCESS_TOKEN`, with the key from step 4.
* Locally, in your cloned repository
  1. create directory for Github Actions with `mkdir -p ./github/workflows`. 
  2. create a workflow-file for deploy with `touch ./github/workflows/deploy.yml`
  3. paste the following into `deploy.yml`: 

```yml
name: deploy

on:
    push:
        branches: [writing]
jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@master
          - uses: denolib/setup-deno@master
            with:
              deno-version: 0.36
          - name: Build
            run: deno --allow-read --allow-write https://raw.githubusercontent.com/olaven/markblog/master/markblog.ts build 
          - name: Deploy
            uses: JamesIves/github-pages-deploy-action@releases/v3
            with:
                ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
                BRANCH: master 
                FOLDER: . # The folder the action should deploy.
```

### Going live 🗺 🌩
1. checkout to the branch for writing, `git checkout -b writing`
2. commit your changes, `git add . && git commit -m "initial blog setup"`
3. `git push --set-upstream origin writing`

Congratulations 👏 🎊 Within a few minutes, your blog should go live. 
Your next post is just an `.md`-file away! To publish it, just push it 
onto the `writing`-branch, and your automation will do the rest 🍇 🍏

(If you are unsure about the URL, have a look at the "Github Pages"-seciton of your Github-repository 😃)

Check out [Markblog's documentation](https://github.com/olaven/markblog#documentation) for more information about how to customize your blog.
See [my blog](https://olaven.org)([github repo](https://github.com/olaven/olaven.github.io)) for a live example.

Thanks for reading! 
