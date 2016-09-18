import React from 'react'

const FoxCloudCounter = React.createClass({
  getInitialState: function() {
    return {value: this.props.value, callback: this.props.callback};
  },
  componentDidUpdate: function() {
	  if (this.state.callback)
	  {
		  this.state.callback(this.props.name + "_value", event.target.id);
	  }
  },
  handleMouseClick: function(event) {
	  var op = event.target.id;

	  if (op == "s")
	  {
		  if (this.state.value > 0)
		  {
			  this.setState({value: parseInt(this.state.value, 10) - 1});
		  }
	  } else {
		this.setState({value: parseInt(this.state.value, 10) + 1});
	  }
  },
  render: function() {
	this.props.state_bridge(this.props.name, this);

    return (
      <div>
        <div className="crease decrease" id="s" onClick={this.handleMouseClick}>-</div>
        <div className="counter">{this.state.value}台</div>
        <div className="crease increase" id="a" onClick={this.handleMouseClick}>+</div>
      </div>
    );
  }
});

export default FoxCloudCounter;