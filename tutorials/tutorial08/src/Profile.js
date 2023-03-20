//Show name && img of person logged on
//TODO: asusme user is passed inot comp as prop:
import React from 'react';

export default function Profile({Profile}) {
    
    //return some jsx
    if(!Profile) {
        return;
    }
    return (
        <header>
            <img src={Profile.thumb_url}/>
            <h3>
                {Profile.username}
            </h3>
        </header>
    );
}