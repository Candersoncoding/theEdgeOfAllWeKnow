import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HeadingStyle from '../components/HeadingStyle';

const Main = () => {

    // useEffect(() => {
    //     axios.get('')
    //         .then()
    //         .catch()
    // }, [])

    return ( 
        <div>
            <HeadingStyle>
                <h1 className='display-1'>The Edge of All We Know</h1>
            </HeadingStyle>
        </div>
    )
}

export default Main;