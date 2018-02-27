import React from 'react';
import moment from 'moment';

class Sighting extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4>{this.props.species}, {this.props.count} </h4>
                </div>
                <div className="card-body">
                    <p>{this.props.description}</p>
                    <small>{moment(this.props.dateTime).format('LLL')}</small>
                </div>
            </div>
        )
    }
}

export default Sighting;