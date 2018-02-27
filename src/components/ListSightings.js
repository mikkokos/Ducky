import React from 'react';
import Sighting from './Sighting';
import ServerError from './ServerError';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class ListSightings extends React.Component {

    render() {
        const sightings = this.props.sightings.sort(this.props.compare).map(sighting => {
            return <Sighting
                key={sighting.id}
                species={sighting.species}
                description={sighting.description}
                dateTime={sighting.dateTime}
                count={sighting.count}
            />
        });

        return <div>
            <CSSTransitionGroup transitionName="sightingAppear" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {sightings.length ? '' : <ServerError />}
              {sightings}
            </CSSTransitionGroup>
          </div>;
    }
}


export default ListSightings;

