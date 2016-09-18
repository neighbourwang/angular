import React from 'react';

const LeftNavMenu =  React.createClass({
    render: function(){
        const leftNavMenu =[];
        this.props.leftNavMenuLists.map(function(leftNavMenuList,i){
            const firstLevelNavKey = leftNavMenuList.firstLevelNav;
            leftNavMenu.push(<a  key={firstLevelNavKey}><li className="firstLvNav">{leftNavMenuList.firstLevelNav}</li></a>);
            if(leftNavMenuList.secondLevelNav){
                leftNavMenuList.secondLevelNav.map(function(secondLevelNav,i){
                    const secondLevelNavKey = leftNavMenuList.firstLevelNav+secondLevelNav.secondLevelNavName;
                    leftNavMenu.push(<a key={secondLevelNavKey}><li className="secondLvNavName">{secondLevelNav.secondLevelNavName}</li></a>);
                    if(secondLevelNav.secondLevelNavList){
                        secondLevelNav.secondLevelNavList.map(function(secondLvNavList,i){
                            const secondLvNavListKey = secondLevelNav.secondLevelNavName + secondLevelNav+secondLvNavList;
                            leftNavMenu.push(<a key={secondLvNavListKey}><li className="secondLvNavList">{secondLvNavList}</li></a>);
                        });
                    }
                });
            }
        });
        
        return(
            <div className="leftNavMenu">
                <ul>
                {leftNavMenu}
                </ul>
            </div>
        );
    }
});

export default LeftNavMenu;