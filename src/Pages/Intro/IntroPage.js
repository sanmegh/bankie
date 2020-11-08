import React from 'react';
import { Link } from 'react-router-dom';
import tutorialSteps from '../../Config/TutorialSteps';
import './IntroPage.css';

class IntroPage extends React.Component {

    constructor() {
        super();
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <div>
                    <p className='IntroDescription'>
                        Analyse your finances like never before!
                    </p>
                </div>

                {
                    tutorialSteps().map(stepSet => {
                        return (
                            <div className='TutorialStep' key={'stepset-' + stepSet}>
                                {
                                    stepSet.map(step => {
                                        return (
                                            <img key={'tutimg-' + step} className='ImgScreenshot' src={step} alt=''></img>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }

                <p className='DisclaimerMsg'>
                    * Bank exports can be downloaded from Netbanking. They are typically of csv/xls/qif formats.
                    <br />
                    These files need not contain any personally identifiable information like name/account number/address.
                    <br />
                    If they contain any sensitive information, feel free to remove them before submitting. Either way, the application will ignore it.
                    <br />
                    The application does not have a backend server. All the data stays in your browser session.
                    <br />
                    It is evaluated in your machine and removed on closing the browser.
                </p>

                <div>
                    <Link to={{ pathname: '/home' }}>
                        <button className='SubmitButton'>GET STARTED</button>
                    </Link>
                </div>
            </div >
        )
    }

}

export default IntroPage;
