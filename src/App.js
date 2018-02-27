import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import ListSightings from './components/ListSightings';
import AddSightingForm from './components/AddSightingForm';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Duck from './components/Duck';


class App extends Component {
  constructor() {
    super();
    this.state = {
      species: [],
      sightings: [],
      orderNewest: true,
    };
  }

  compare = (a, b) => {
    const dateA = a.dateTime;
    const dateB = b.dateTime;
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }

    return this.state.orderNewest ? comparison * -1 : comparison;
  };

  toggleOrder = () => {
    this.setState({
      orderNewest: !this.state.orderNewest,
    });
  };

  getSpecies = () => {
    const APIURL = 'http://localhost:8081/species';
    fetch(APIURL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ species: data });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  getSightings = () => {
    const APIURL = 'http://localhost:8081/sightings';
    fetch(APIURL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ sightings: data });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  addSighting = (newSighting) => {
    if (!(this.state.species.filter((duck) => duck.name === newSighting.species)[0].name)) {
      return console.log('error');
      // Tämä pitää fiksata vielä, että käyttäjä saa kunnon virheilmoituksen
    }

    if ( !(Number.isInteger(newSighting.count) && newSighting.count > 0) ) {
      return console.log('error');
    }

    if ( !(typeof newSighting.description === 'string' && newSighting.description.length > 0)) {
      return console.log('error');
    }

    if ( !(moment(newSighting.dateTime).isValid())) {
       return console.log('error');
    }


    fetch('http://localhost:8081/sightings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSighting),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedSightings = [data, ...this.state.sightings];
        const sorted = updatedSightings.sort(this.compare);
        this.setState({ sightings: sorted });
      });
  };

  componentWillMount() {
    this.getSpecies();
    this.getSightings();
  }

  render() {


    return <div className="App">
        <header className="App-header">
          <h1 className="App-title">{"<"}Ducky</h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <AddSightingForm species={this.state.species} addSighting={this.addSighting} />
            </div>
            <div className="col-sm-6 col-lg-6">
              <button className="toggleOrder" onClick={this.toggleOrder}>
                Order:
                {this.state.orderNewest ? " Newest to Oldest" : " Oldest to Newest"}
              </button>
              <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <ListSightings sightings={this.state.sightings} compare={this.compare} />
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
        <Duck />
        <Duck />
        <Duck />
      </div>;
  }
}

export default App;
