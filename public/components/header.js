import React from 'react';

const Header = React.createClass({
    render: function(){
        return (
            <header>
                <div className="headerLeftMenu">
                    <div className="logo"><a href="#" title="HPE logo"><img src="./public/common/images/logo.png" height="75" width="178" title="HPE logo" /></a></div>
                    <div className="controlPanel"><a href="#" title="control panel">控制台</a></div>
                </div>
                <div className="headerRightMenu">
                    <ul>
                        <li className="help"><a href="" title="帮助">帮助</a></li>
                        <li className="alert"><a href="" title="提醒"><span className="alertNumber">30</span>提醒</a></li>
                        <li className="account"><a href="" title="账户">账户</a><span>&nbsp;</span></li>
                    </ul>
                </div>
            </header>
        );
    }
});

export default Header;