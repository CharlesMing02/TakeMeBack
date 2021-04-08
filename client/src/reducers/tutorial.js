import { START, RESET, STOP, NEXT_OR_PREV, RESTART } from '../constants/actionTypes';

const TOUR_STEPS = [
    {
        target: '.MuiAppBar-root',
        content: "Welcome to TakeMeBack! Click Next to begin a tutorial.",
        // placement: "top",
        // offset: "-100",
        // disableOverlay: true,
        disableBeacon: true
    },
    {
        target: '.MuiTabs-root',
        content: "The first step is to log your day. Do this to unlock the guess and reflect tabs.",
        placement: "right"
    },
    {
        target: '#paper',
        content: "Here's your entry. It's looking empty - let's fill out some details.",
        spotlightClicks: 'false'
    },
    {
        target: "#highlights",
        content: "Enter 3 highlights. If you need ideas, hover over the question mark."
    },
    {
        target: '.MuiSpeedDial-fab',
        content: "Hover me to add media. Try adding music!",
        styles: {
            buttonNext: {
              display: 'none',
            }
        }
    },
    {
        target: '#song',
        content: "Click next once you're happy with your song.",
        hideBackButton: true,
    },
    {
        target: ".MuiButton-fullWidth",
        content: "Let's log our day! Don't worry, you can go back and edit your entry anytime.",
        styles: {
            buttonNext: {
              display: 'none',
            }
        }
    },
    {
        target: '#vertical-tabpanel-1',
        content: "Guess when this random entry was from. The closer you are, the more points you earn. There's also a streak multiplier.",
        styles: {
            buttonNext: {
              display: 'none',
            }
        },
        hideBackButton: true,
        placement: "top",
        offset: "-20",
        floaterProps: {
            hideArrow: true
        }
    },
    {
        target: '#panel-container-2',
        content: "Good guess! Now you can read the past entry in full and reflect on past memories.",
        placement: "left",
        type: 'hover',
        hideBackButton: true,
        floaterProps: {
            hideArrow: true
        }
    },
    {
        target: '.MuiAppBar-root',
        content: "And that’s it! Easy, right? Journaling shouldn’t take too long. We’re busy people. Of course, if you have extra time, feel free to add more details to your daily log, read through past entries, or view the leaderboard ;).",
    },
]

const INITIAL_STATE = {
    key: new Date(), //rerender when restarting tour
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS
};

const tutorialReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START:
            return { ...state, run: true};
        case RESET:
            return { ...state, stepIndex: 0};
        case STOP:
            return { ...state, run: false };
        case NEXT_OR_PREV:
            return { ...state, ...action.payload };
        case RESTART:
            return {
                ...state,
                stepIndex: 0,
                run: true,
                loading: false,
                key: new Date()
            };
        default:
            return state;
    }
}

export default tutorialReducer;