import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home/HomePage';
import IntroPage from './Pages/Intro/IntroPage';
import TransactionsPage from './Pages/Transactions/TransactionsPage';
import bankieLogo from './Resources/bankie_logo_white.png';
import './Styles/Common.css';
import './Styles/MenuBar.css';
import './Styles/Modal.css';
import './Styles/PanelBar.css';

function App() {
  return (
    <div>

      <Router>
        <header>
          <Link to={{ pathname: '/bankie' }}>
            <img src={bankieLogo} className='AppLogo' alt='' />
            <label className='AppTitle Clickable'>BANKIE</label>
          </Link>
        </header>

        <main>
          <Switch>
            <Route exact path='/bankie'>
              <IntroPage />
            </Route>
            <Route path='/bankie/home'>
              <HomePage />
            </Route>
            <Route path='/bankie/transactions'>
              <TransactionsPage />
            </Route>
          </Switch>
        </main>

        <footer>
          <label>
            <a href='https://sanmegh.com' target="_blank" rel="noopener noreferrer">Sanmegh Thokade</a>
          &nbsp;&copy;2020 -&nbsp;
          <a href='https://sanmegh.com/apps/bankie' target="_blank" rel="noopener noreferrer">BANKIE</a>
          </label>
        </footer>
      </Router>
    </div >
  );
}

export default App;
