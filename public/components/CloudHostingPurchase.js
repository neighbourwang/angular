import React from "react";
var $ = require("jquery");

const CloudHostingPurchaseHeader = React.createClass({
    render(){
        return <h2>订购</h2>
    }
})

const CloudHostingPurchaseOptions = React.createClass({
    render(){
        var optionsList = [];
        if(this.props.data.valueList){
            this.props.data.valueList.map(function(list){
                optionsList.push(
                    <li key={list.displayName}>
                        <input type="radio" name={list.displayName} value={list.displayName} />
                        <label>{list.displayName}</label>
                    </li>)
            })
        }       
        return(
            <div className="cloudHostingPurchaseOptions">
                <div className="cloudHostingPurchaseOptionsTitle">
                    {this.props.data.attrDisplayName} : 
                </div>
                <ul>
                    {optionsList}
                </ul>
            </div>
        )
    }
});

const CloudHostingPurchase = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
     componentDidMount: function() {
        $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({data: data.resultContent});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
        });
    },
    render: function(){
        var purchaseOptions = [];
        this.state.data.map(function(options){
            switch(options.attrCode){
                case 'REGION':
                case 'ZONE':
                case 'CPU':
                case 'MEM':
                case 'IMAGETYPE':
                case 'OSTYPE':
                case 'OSVERSION':
                case 'STORAGE':
                case 'TIMELINE':
                    purchaseOptions.push(<CloudHostingPurchaseOptions data = {options} key = {options.attrCode} />)
                    break;
                default:
                    break;                
            }
        })
        return(
             <div className="mainContent">
             <CloudHostingPurchaseHeader  />
             {purchaseOptions}
            </div>
        );
    }
});

export default CloudHostingPurchase;