# TakeMeBack
A fun and rewarding web app that turns journaling into a game - earn points and streaks by guessing the dates of previous entries, then read through them for a wave of nostalgia! Add songs, media, news links, etc. Each entry is a virtual time capsule, buried and rediscovered when you least expect it.

Features:

Stack/Technologies:
- MERN
- Redux, redux-thunk
- Mongoose
- Node-cron
- Axios

This project is in early development!

Todo:
- implement updateEntry in Log.js
- minor bug where editing entries in ViewAll doesn't always update unless you refresh
- improve responsive: have to use more grids with breakpoints
- google login completely broken because can't keep track of logged/guessed/points/streak
- need to initialize users with a few entries (otherwise getGuessEntry crashes app)
