<a href="https://takemeback.netlify.app/"> 
    <!-- Replace with live link -->
    <h1 align="center">TakeMeBack</h1>
</a>
<p align="center">A fun and rewarding web app that turns journaling into a game - earn points and streaks by guessing the dates of previous entries, then read through them for a wave of nostalgia! <br> Access the site at https://takemeback.netlify.app/ </p>

## About The Project
I've always wanted to make journaling a habit due to its many benefits -- appreciating each day, reliving forgotten memories, and improving mental clarity -- but struggled to find the discipline to do so. This app overcomes this obstacle by gamifying the process! 

Users unlock daily guesses by briefly logging their day. The app then displays a snippet of an entry from a random date. The closer the guess, the more points earned. Each entry is like a virtual time capsule, buried and rediscovered when you least expect it. Earn more points by building up streaks of consecutive daily entries, then redeem those points for custom color themes or view the leaderboard for some friendly competition.

### Features: 
I aimed to make the process as beginner-friendly and flexible as possible. At minimum, an entry consists of three highlights of the day (a proven journaling strategy). Users then have the option to add images, videos, songs, or longer descriptions. 

[insert gif to demonstrate functionality]

Users can also view all past entries at any time. Doing so before guessing breaks their streak, however -- otherwise earning max points becomes too easy.

## Built With:
- React, react-redux, redux-thunk, react-router-dom, and Material-UI
- Express, Node.js, axios, and node-cron
- MongoDB and mongoose

The app also uses the Soundcloud API, bcrypt, jwt-decode, react-google-login and moment.js. The backend is deployed on Heroku.

## Status:
This project is in early development!

### Things I'm working on:
- Tutorial
- Landing page with demo account
- Improve view all page: add pagination by date range to backend and change frontend to view by month

### Ideas for future features:
- Add location or weather metadata
- Mood log with analytics
- More user settings (song volume, change username/password)
- Refactor how local storage is handled (currently in redux reducer)
- Soundcloud api doesn't seem to support many songs on mobile



