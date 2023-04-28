//Show name && img of person logged on
//TODO: asusme user is passed inot comp as prop:
import React from 'react';

export default function Profile({profile}) {
    
    //return some jsx
    if(!profile) {
        return '';
    }
    return (
        <header className='profile'>
            <img src={profile.thumb_url}/>
            <h3>
                {profile.username}
            </h3>

        </header>
    );
}