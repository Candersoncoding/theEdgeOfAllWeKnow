import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MoonDetails = (props) => {

    const [currentMoon, setCurrentMoon] = useState([]);
    const [moonMass, setMoonMass] = useState([]);

    useEffect(()=>{
        axios.get(`${props.clickedMoon.rel}`)
            .then(res =>{setCurrentMoon(res.data)
                        setMoonMass(res.data.mass);
            })
            .catch(err => console.log(err))
    }, [props.clickedMoon.rel])
    
    return (
        <div>
            <div className="jumbotron bg-dark text-light m-3 p-3 rounded">
                <h1 className="display-3">{props.clickedMoon.moon}</h1>
                <div className='d-flex justify-content-start'>
                    <ul className=''>
                        <p className="lead">orbital eccentricity: {currentMoon.eccentricity}</p>
                        <p className="lead">mean radius: {currentMoon.meanRadius}</p>
                        <p className="lead">sideral orbit: {currentMoon.sideralOrbit} Earth days</p>
                        {currentMoon.sideralRotation === 0 ? <p>N/A</p> :<p className="lead">sideral rotation: {currentMoon.sideralRotation} hours</p> }
                        {moonMass === null || 0 ? <p>N/A</p> : <p className="lead">mass: {moonMass.massValue} <sup>{moonMass.massExponent}</sup> kg</p> }
                    </ul>
                </div>
                <hr className="my-2"></hr>
                <div className='d-flex justify-content-end'>
                    <ul className=''>
                        <p className="lead">discoverd by: {currentMoon.discoveredBy}</p>
                        <p className="lead">discovery date: {currentMoon.discoveryDate}</p>
                        <p className="lead">density: {currentMoon.density}</p>
                        {currentMoon.aphelion === 0 ? <p>N/A</p> :<p className="lead">aphelion: {currentMoon.aphelion}</p> }
                        {currentMoon.perihelion === 0 ? <p>N/A</p> :<p className="lead">perihelion: {currentMoon.perihelion}</p> }
                    </ul>
                </div>
            </div>
            
            
        </div>
    )
}
export default MoonDetails;