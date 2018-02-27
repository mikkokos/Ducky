import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class AddSightingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    sendForm(e) {
        e.preventDefault();
        const newSighting = {
            species: this.species.value,
            description: this.description.value,
            dateTime: this.state.startDate.toISOString(),
            count: Number(this.count.value),
        };
        this.props.addSighting(newSighting);
        this.sightingForm.reset();
    }
    render() {
        return (
            <form
                className="sightingForm"
                ref={(input) => (this.sightingForm = input)}
                onSubmit={(e) => this.sendForm(e)}>
                <CSSTransitionGroup
                    transitionName="formSend"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    <div className="binoculars" />
                    <h2>Add sighting</h2>
                    <div className="form-group">
                        <label htmlFor="birdSpecies">Species</label>
                        <select
                            ref={(input) => (this.species = input)}
                            id="birdSpecies"
                            className="form-control">
                            {this.props.species.map((species, i) => {
                                return (
                                    <option key={i} value={species.name}>
                                        {species.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birdCount">Count</label>
                        <input
                            id="birdCount"
                            className="form-control"
                            ref={(input) => (this.count = input)}
                            type="number"
                            name="count"
                            min="1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birdDescription">Add description</label>
                        <textarea
                            id="birdDescription"
                            className="form-control"
                            ref={(input) => (this.description = input)}
                            rows="3"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sightingDate">Date</label>
                        <DatePicker
                            ref={(input) => (this.sightingDateInput = input)}
                            id="sightingDate"
                            selected={this.state.startDate}
                            value={this.props.value}
                            onChange={this.handleChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="lll"
                            timeCaption="time"
                            required
                        />
                    </div>
                    <button className="btn btn-info" type="submit">
                        Send
					</button>
                </CSSTransitionGroup>
            </form>
        );
    }
}

export default AddSightingForm;
