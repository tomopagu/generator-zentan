# generator-ah4
## The one generator to rule them all

### What is it?
generator-ah4 combines my two previous generators into one super generator. This means you can run `yo ah4` to build both grunt and gulp projects. Using yeoman makes it really easy to start new projects instead of the traditional way of copying from grunt-base or gulp-base and running `npm install` and then `bower install`.

### Setup

1. Grab Node if you haven't got it already.
2. Run `npm install -g yo` to install yeoman, grunt and bower. Don't worry if you already have these, they'll be skipped over.
3. Next clone this repo to a new folder somewhere on your machine.
4. Run `npm install` and then run `npm link`.

And you're done, now you can run `yo ah4` in a new folder to start a scaffold of the project.

### Usage

1. Run `yo ah4` in a new folder.
2. Answer the questions yeoman asks you.
3. Next yeoman will set up the project and download dependencies
4. Use `grunt` / `gulp` to build project as before.

### Troubleshooting

If you have some errors try updating Node + NPM which you should be able to do by just installing latest installer from the node website.

Any other issues feel free to log them in the tracker, ping @Tom or email tom@ahead4.com