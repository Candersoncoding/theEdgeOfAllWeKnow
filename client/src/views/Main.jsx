import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Main = (props) => {

    // useEffect(() => {
    //     axios.get('')
    //         .then()
    //         .catch()
    // }, [])

    return ( 
        <div>
            <h1 className='display-1' style={props.styleHeader}>The Edge of All We Know</h1>
            <div className='d-flex'>
                <nav style={props.navBar}>
                    
                </nav>
                <div style={props.bodyStyling}>
                    
                </div>
            </div> 
        </div>
    )
}

export default Main;