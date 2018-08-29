import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format('MMM Do YYYY'))

export default class Expense extends React.Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
    errorState: ''
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState({
      description: description
    });
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState({
      note: note
    });
  };

  onAmountChange  = e => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState({
            amount: amount
        });
    }
  };

  onDateChange = (createdAt) => {
    if(createdAt) {
      this.setState({
        createdAt: createdAt
      });
    }
  };

  onFocusChange = ({focused}) => {
    this.setState({
      calendarFocused: focused
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if(!this.state.description || !this.state.amount) {
      this.setState({
        errorState: 'Please provide description and amount'
      })
    } else {
      this.setState({
        errorState: ''
      });
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.errorState && <p>{this.state.errorState}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input 
            type="number" 
            placeholder="Amount" 
            value={this.state.amount} 
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={()=>false}
          />
          <textarea 
            placeholder="Add a note for your expense" 
            value={this.state.note} 
            onChange={this.onNoteChange} 
          />
          <button>Add expense</button>
        </form>
      </div>
    );
  }
}
