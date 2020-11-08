import screenshot11 from '../Resources/screenshots/01-01-base.png';
import screenshot12 from '../Resources/screenshots/01-02-bank.png';
import screenshot13 from '../Resources/screenshots/01-03-export.png';
import screenshot21 from '../Resources/screenshots/02-01-summary.png';
import screenshot22 from '../Resources/screenshots/02-02-statements.png';
import screenshot23 from '../Resources/screenshots/02-03-statistics.png';

const tutorialSteps = [
    [
        screenshot11, screenshot12, screenshot13,
    ],
    [
        screenshot21, screenshot22, screenshot23,
    ]
]

export default function getTutorialSteps() {
    return tutorialSteps;
}
