import React from 'react';
import NavLinks from './NavLinks';
import Profile from './Profile';
import {useState, useEffect} from "react";
import { getHeaders } from './utils';
import Suggestions from './Suggestions';
import Stories from './Stories';
import Posts from './Posts';

export default function App ({token}) { 
    const [profile, setProfile]=useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch('/api/profile', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setProfile(data)
        }
        fetchProfile();
    }, [token]);
    console.log('access token:', token);
    
    return (
        <div>
            
            {/* Navbar */}
            <nav className="main-nav">
                <h1>Photo App</h1>
                <NavLinks token={token} profile={profile}/>
            </nav>
           
           {/* Right Panel */}
            <aside>
                <header>
                    <Profile profile={profile}/>
                </header>
                <div className="suggestions">
                    <div>
                        
                    </div>
                </div>
            </aside>

            <main>

                {/* Stories */}
                <header className="stories">
                    Stories go here...
                </header>

                {/* Posts */}
                <div id="posts">
                    <Posts token={token}/>
                </div>
    
            </main>

        </div>
    );
    
}