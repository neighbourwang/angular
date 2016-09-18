import React from 'react'

const FoxCloudRadio = React.createClass({
  getInitialState: function() {
	// <options> is whole radio group and formats like [{"value": xxx, "label": ""},{"value": xxx, "label": ""},...]
    return {value: this.props.value, options: this.props.options, callback: this.props.callback};
  },
  componentDidUpdate: function() {
	  if (this.state.callback)
	  {
		  this.state.callback(this.props.name + "_value", event.target.id);
	  }
  },
  handleMouseClick: function(event) {
	  this.setState({value: event.target.id});
  },
  render: function() {
    // <name> property is the radio group name
    var name = this.props.name;
    // <value> property is the default value for radio group
    var value = this.state.value;

	var click = this.handleMouseClick;

	this.props.state_bridge(name, this);

    return (
      <div>
      {
        this.state.options.map(
        function(item, i) {
            if (value == item.value)
            {
                return (<div key={item.value}><input type="radio" name={name} value={item.value} id={name + item.value} className="fc-radio" checked />
                        <label id={item.value} onClick={click}>{item.label}</label></div>);
            } else {
                return (<div key={item.value}><input type="radio" name={name} value={item.value} id={name + item.value} className="fc-radio" />
                        <label id={item.value} onClick={click}>{item.label}</label></div>);
            }
            
        }
      )
      }
      </div>
    );
  }
});

export default FoxCloudRadio;