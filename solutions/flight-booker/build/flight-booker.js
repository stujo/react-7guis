var FlightBooker = React.createClass({displayName: "FlightBooker",
  getInitialState: function() {
    return {
      flightType: this.props.flightType,
      flightDetails: "No flights booked"
    };
  },
  render: function() {
    return (
      React.createElement("div", {className: "flight-booker"}, 
        React.createElement(FlightForm, {
          bookFlight: this.bookFlight, 
          selectFlightType: this.selectFlightType, 
          isTwoWayFlight: this.isTwoWayFlight()}), 
        React.createElement("div", null, this.state.flightDetails)
      )
    );
  },
  selectFlightType: function(e) {
    this.setState({ flightType: e.target.value });
  },
  bookFlight: function(data) {
    var flightDetails = "Travel Dates: From " + data.startDate;
    if(data.endDate) flightDetails += " To: " + data.endDate;
    this.setState({flightDetails: flightDetails});
  },
  isTwoWayFlight: function() {
    return this.state.flightType === 'two-way';
  },
});

// Flight Form
var FlightForm = React.createClass({displayName: "FlightForm",
  render: function() {
    var todayDate = new Date().toLocaleDateString();
    return (
      React.createElement("div", {className: "flight-form"}, 
        React.createElement(FlightTypeSelector, {selectFlightType: this.props.selectFlightType}), 
        React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement("input", {ref: "startDate", type: "text", defaultValue: todayDate}), 
          this.renderEndDate(todayDate), 
          React.createElement("input", {type: "submit", value: "Book"})
        )
      )
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var startDate = this.refs.startDate.getDOMNode().value;
    var endDate = this.isTwoWayFlight() ? this.refs.endDate.getDOMNode().value : "";
    this.props.bookFlight({ startDate: startDate, endDate: endDate });
  },
  renderEndDate: function(date) {
    var input = React.createElement("input", {ref: "endDate", type: "text", disabled: "disabled", defaultValue: date});
    if(this.isTwoWayFlight()) delete input.props.disabled;
    return input;
  },
  isTwoWayFlight: function() {
    return this.props.isTwoWayFlight;
  }
});

// Flight Type Selector
var FlightTypeSelector = React.createClass({displayName: "FlightTypeSelector",
  getDefaultProps: function() {
    return {
      oneWay: 'one-way',
      twoWay: 'two-way'
    }
  },
  render: function() {
    return (
      React.createElement("select", {ref: "flightType", onChange: this.props.selectFlightType}, 
        React.createElement("option", {value: this.props.oneWay}, "One Way"), 
        React.createElement("option", {value: this.props.twoWay}, "Two Way")
      )
    );
  }
});

window.onload = function() {
  React.render(React.createElement(FlightBooker, {start: 0}), document.body);
}
