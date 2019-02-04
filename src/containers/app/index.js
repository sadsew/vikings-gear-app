import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MainPage from '../pages/MainPage';
import AllGearPage from '../pages/AllGearPage';
import GearPage from '../pages/GearPage';
import ShamanPage from '../pages/ShamanPage';
import ShamanImprovedPage from '../pages/ShamanImprovedPage';

import CommentsPage from '../pages/CommentsPage';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Header />
        <main>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/allgear" component={AllGearPage} />
          <Route exact path="/gear/:gearType" component={GearPage} />
          <Route exact path="/shaman/:gearType" component={ShamanPage} />
          <Route exact path="/shaman_improved/:gearType" component={ShamanImprovedPage} />
          <Route exact path="/comments" component={CommentsPage} />
        </main>
        <Footer />
      </div> 
    )
  }
}

export default App;
