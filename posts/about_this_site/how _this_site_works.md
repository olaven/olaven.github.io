# Blogging with [Markblog](www.github.com/olaven/markblog)

Or rather: how I got rid of bloated setup and just wrote markdown. 

When I first built this site almost a year ago, [I was pretty 
happy](olaven.org/out/site.html) with my setup. It was built with 
[NextJS](https://nextjs.org/), hosted with [Zeit now](https://zeit.co/home) and 
the pages were written in [MDX](https://mdxjs.com/) and styled with [Sass](https://sass-lang.com/).
A pretty huge pipeline is needed in order to get this to stick together. 

However, the site itself was literally just as basic as the site you are looking 
at right now (as of march, 2020). Why is such a complicated setup needed? Of 
course, it is not. But I knew NextJS pretty well, had gotten familiar with Sass and 
I really wanted to write using [Markdown](https://daringfireball.net/projects/markdown/). 
What I wanted was achieved: a homepage I could update by writing markdown. However, I 
could not quite get past the fact that there was so much setup needed for such a basic thing.

Markblog is my attempt at a solution. It is a small piece of software written in [Deno](deno.land). 
It simply converts markdown to HTML, and packages it in a nice, tiny, non-bloated blog-like page. 
As of writing, the default file structure is as follows:  
* `index.md`
* `style.css`
* `posts/`

(create this automatically with Markblog's `init`-command)

The index page shows the markdown-text in addition to links to posts, in addition to the content 
written in `index.md`. Then, Markblog's `build`-command triggers conversion to html. In my setup, 
this runs as part of a simple CI-pipeline, meaning that I never touch anything other than Markdown-files. 

If this interests you, please head over to [the project page](www.github.com/olaven/markblog) 
to see more details!
