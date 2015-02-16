var FlightBooker = React.createClass({
  getInitialState: function() {
    return {
      flightType: this.props.flightType
    };
  },
  render: function() {
    return (
      <FlightForm
        bookFlight={this.bookFlight}
        selectFlightType={this.selectFlightType}
        isTwoWayFlight={this.isTwoWayFlight()} />
    );
  },
  selectFlightType: function(e) {
    this.setState({ flightType: e.target.value });
  },
  bookFlight: function(data) {
    console.log("Travel Dates: ", data.startDate, data.endDate)
  },
  isTwoWayFlight: function() {
    return this.state.flightType === 'two-way';
  },
});

// Flight Form
var FlightForm = React.createClass({
  render: function() {
    var todayDate = new Date().toLocaleDateString();
    return (
      <div className="flight-booker">
        <FlightTypeSelector selectFlightType={this.props.selectFlightType} />
        <form onSubmit={this.handleSubmit}>
          <input ref="startDate" type="text" defaultValue={todayDate} />
          {this.renderEndDate(todayDate)}
          <input type="submit" value="Book" />
        </form>
      </div>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var startDate = this.refs.startDate.getDOMNode().value;
    var endDate = this.isTwoWayFlight() ? this.refs.endDate.getDOMNode().value : "";
    this.props.bookFlight({ startDate: startDate, endDate: endDate });
  },
  renderEndDate: function(date) {
    var input = <input ref="endDate" type="text" disabled="disabled" defaultValue={date}/>;
    if(this.isTwoWayFlight()) delete input.props.disabled;
    return input;
  },
  isTwoWayFlight: function() {
    return this.props.isTwoWayFlight;
  }
});

// Flight Type Selector
var FlightTypeSelector = React.createClass({
  getDefaultProps: function() {
    return {
      oneWay: 'one-way',
      twoWay: 'two-way'
    }
  },
  render: function() {
    return (
      <select ref="flightType" onChange={this.props.selectFlightType} >
        <option value={this.props.oneWay}>One Way</option>
        <option value={this.props.twoWay}>Two Way</option>
      </select>
    );
  }
});

window.onload = function() {
  React.render(<FlightBooker start={0} />, document.body);
}
