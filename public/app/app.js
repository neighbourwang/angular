import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header';
import LeftNavMenu from '../components/leftNavMenu';
//import CloudHostingPurchase from '../components/CloudHostingPurchase';
import FoxCloudHostOrder from '../components/foxCloudHostOrder';
import Footer from '../components/footer';
import projectConstants from '../core/projectConstants';

const leftNavMenuLists = projectConstants.leftNavMenuLists;
const FoxCloud = React.createClass({
    render: function(){
        return(
          <div>
                <Header />
                <LeftNavMenu leftNavMenuLists = {leftNavMenuLists} />
                <FoxCloudHostOrder url="http://localhost:8000/testData.json" />
            </div>
        )
    }
})

ReactDOM.render(
    <FoxCloud />,
    document.getElementById('container')
)