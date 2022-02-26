import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MoonDetails = (props) => {

    const [currentMoon, setCurrentMoon] = useState([]);
    const [moonMass, setMoonMass] = useState([]);

    useEffect(()=>{
        axios.get(`${props.clickedMoon.rel}`)
            .then(res =>{setCurrentMoon(res.data)
                console.log(res.data)
                        setMoonMass(res.data.mass);
            })
            .catch(err => console.log(err))
    }, [props.clickedMoon.rel])
    
    return (
        <div>
            <div className="jumbotron bg-dark text-light m-3 p-3 rounded">
                <h1 className="display-3">{props.clickedMoon.moon}</h1>
                <div className='d-flex justify-content-between'>
                    <ul className='p-1'>
                        <p className="lead"><strong className='text-info'>density:</strong> {currentMoon.density}</p>
                        <p className="lead"><strong className='text-info'>mean radius:</strong> {currentMoon.meanRadius} km</p>
                        {currentMoon.sideralOrbit < 0 ? <p className="lead"><strong className='text-info'>sideral orbit:</strong> (retrograde) {currentMoon.sideralOrbit} Earth days</p> : <p className="lead"><strong className='text-info'>sideral orbit:</strong> {currentMoon.sideralOrbit} Earth days</p> }
                        {currentMoon.sideralRotation === 0 ? <p className='lead text-secondary'>sideral rotation: N/A</p> :<p className="lead"><strong className='text-info'>sideral rotation:</strong> {currentMoon.sideralRotation} hours</p> }
                        {moonMass === null || 0 ? <p className='lead text-secondary'>mass: N/A</p> : <p className="lead"><strong className='text-info'>mass:</strong> {moonMass.massValue} <sup>{moonMass.massExponent}</sup> kg</p> }
                    </ul>
                    <ul className='defineBox rounded p-2'>
                        <p className="lead">(<strong>retrograde</strong>) moon orbiting travels in opposite direction of planet's rotation</p>
                        <p className="lead">(<strong>sideral orbit</strong>) how long it takes for one revolution around moon's planet</p>  
                    </ul>
                </div>
                <hr className="my-2"></hr>
                <div className='d-flex justify-content-between'>
                    <ul className='defineBox rounded p-2'>
                        <p className="lead">(<strong>sideral rotation</strong>) how long it takes for a moon or planet to complete one full rotation </p>
                        <p className="lead">(<strong>orbital eccentricity</strong>) defined between 0 and 1, this describes the orbitalal shape. Closer to 0 = more circular, and closer to 1 = a longer, more stretched oval or ellipse shape.</p>  
                    </ul>
                    <ul className='p-1 mx-auto center'>
                        <p className="lead"><strong className='text-info'>discoverd by:</strong> {currentMoon.discoveredBy}</p>
                        <p className="lead"><strong className='text-info'>discovery date:</strong> {currentMoon.discoveryDate}</p>
                        <p className="lead"><strong className='text-info'>orbital eccentricity:</strong> {currentMoon.eccentricity}</p>
                        {currentMoon.aphelion === 0 ? <p className='lead text-secondary'>aphelion: N/A</p> :<p className="lead"><strong className='text-info'>aphelion:</strong> {currentMoon.aphelion} km</p> }
                        {currentMoon.perihelion === 0 ? <p className='lead text-secondary'>perihelion: N/A</p> :<p className="lead"><strong className='text-info'>perihelion:</strong> {currentMoon.perihelion} km</p> }
                    </ul>
                </div>
            </div>
            
            
        </div>
    )
}
export default MoonDetails;