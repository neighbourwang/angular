import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header';
import LeftNavMenu from '../components/leftNavMenu';
import CloudHostingInstanceList from '../components/cloudHostingInstanceList';
import Footer from '../components/footer';
import projectConstants from '../core/projectConstants';

const leftNavMenuLists = projectConstants.leftNavMenuLists;
const FoxCloud = React.createClass({
    render: function(){
        return(
          <div>
                <Header />
                <LeftNavMenu  leftNavMenuLists = {leftNavMenuLists} />
                <CloudHostingInstanceList  />
                <Footer />
            </div>
        );
    }
});


ReactDOM.render(
    <FoxCloud />,
    document.getElementById('container')
)