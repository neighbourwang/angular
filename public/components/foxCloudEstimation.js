import React from 'react'

const FoxCloudEstimation = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  },
  render: function() {
	this.props.state_bridge(this.props.name, this);

    return (
      <div>
        <div className="title">预购价 ： </div>
        <div className="money-symbol">￥</div>
        <div className="money">{this.state.value}</div>
        <div className="fc-button fc-button-reset fc-icon-reset" onClick={this.props.reset_evebt}>重置</div>
        <div className="fc-button fc-button-addto-cart" onClick={this.props.cart_event}>加入购物车</div>
      </div>
    );
  }
});

export default FoxCloudEstimation;