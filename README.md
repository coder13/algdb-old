# AlgDB
Website for based off of http://algdb.net for learning algsets.

Stack used: Webpack, react, bootstrap, ampersandjs.


## How to Contribute:

First clone the repo.

Then make sure you have the latest node 4.x installed and are using npm 2.

Then `npm install` should install all the packages needed. Start webpack with `npm start` and go to http://localhost:3000

Everything should update live and you're good to go.

## How to add algs:

If you just want to add algs, do ^^ so that you can see your live changes and only modify stuff in data/.

data/algs has a list of .hson files. These are all top level algsets. They will be immediately retrieved from /set/<algset>.

[Hanson files](https://github.com/timjansen/hanson) (.hson) are a prettified version of json. They are json for the most part except for some changes to make things easier to work with.

Keep with the format you see in the other files and you're good to go.