import React from 'react';

const LeftNavMenu =  React.createClass({
    render: function(){
        const leftNavMenu =[];
        this.props.leftNavMenuLists.map(function(leftNavMenuList,i){
            const firstLevelNavKey = leftNavMenuList.firstLevelNav;
            leftNavMenu.push(<li className="firstLvNav" key={firstLevelNavKey}><a>{leftNavMenuList.firstLevelNav}</a></li>);
            if(leftNavMenuList.secondLevelNav){
                leftNavMenuList.secondLevelNav.map(function(secondLevelNav,i){
                    const secondLevelNavKey = leftNavMenuList.firstLevelNav+secondLevelNav.secondLevelNavName;
                    leftNavMenu.push(<li className="secondLvNavName" key={secondLevelNavKey}><a>{secondLevelNav.secondLevelNavName}</a></li>);
                    if(secondLevelNav.secondLevelNavList){
                        secondLevelNav.secondLevelNavList.map(function(secondLvNavList,i){
                            const secondLvNavListKey = secondLevelNav.secondLevelNavName + secondLevelNav+secondLvNavList;
                            leftNavMenu.push(<li className="secondLvNavList" key={secondLvNavListKey}><a>{secondLvNavList}</a></li>);
                        }) 
                    }
                });
                 leftNavMenu.push(<li className="leftMenuPartingLine" key={i}>&nbsp;</li>);
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