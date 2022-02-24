import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoonDetails from '../components/MoonDetails';
import { navigate } from '@reach/router';


const PlanetDetails = (props) => {

  	const [singlePlanetDetails, setSinglePlanetDetails] = useState([]);
	const [moons, setMoons] = useState([]);
	const [clickedMoon, setClickedMoon] = useState([null]);
	const [planetMass, setPlanetMass] = useState([]);
	const [planetVolume, setPlanetVolume] = useState([]);
	const [planetImages, setPlanetImages] = useState([]);
	const [clickedImages, setClickedImages] = useState(false);
	const [imageIterator, setImageIterator] = useState(0);
	const [imageInfo, setImageInfo] = useState({
		description: "",
		center: "",
		title: ""
	});
	
	useEffect(()=> {
		axios.get(`https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=id%2Ceq%2C${props.id}`)
		.then(res =>{setSinglePlanetDetails(res.data.bodies[0])
					setMoons(res.data.bodies[0].moons)
					setPlanetMass(res.data.bodies[0].mass)
					setPlanetVolume(res.data.bodies[0].vol);
				})
		.catch(err => console.log(err))
	}, [props.id])
	console.log(singlePlanetDetails, moons, planetMass, planetVolume)
	
	
	const getPlanetImages = (event) => {

		axios.get(`https://images-api.nasa.gov/search?description=${singlePlanetDetails.englishName}&media_type=image`)
			.then(res => {setPlanetImages(res.data.collection.items[imageIterator].links[0])
					setImageInfo(res.data.collection.items[imageIterator].data[0])
					setClickedImages(true);
				})
			.catch(err => console.log(err))
	}

	// increments the index of the array of images from the api and calls the next/prev image 
	const iterate = () =>{
		let i = imageIterator;
		i+=1;
		setImageIterator(i);
		// console.log(imageIterator);
		getPlanetImages();
	}

	// decrements the index of the array of images from the api and calls the next/prev image
	const decrement = () => {
		let i = imageIterator;
		i-=1;
		setImageIterator(i);
		getPlanetImages();
	}

	const callMoon = (event) => {
		event.preventDefault();
		axios.get(`${clickedMoon.rel}`)
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}

	const goHome = () => {
		navigate('/');
	}

	console.log(clickedMoon, moons)

  	return(
		<div>
			<header style={props.styleHeader} className='display-1'>
				Details of {singlePlanetDetails.englishName} 
			</header>
			<div className='d-flex'>
				<div style={props.bodyStyling}>
					{ clickedMoon[0] === null ?
					<div className="jumbotron text-light m-5 bg-dark p-3 rounded">
						 
						<h1 className="display-5">Let's Find Out More!</h1>
						<button className='btn btn-outline-primary' onClick={getPlanetImages}>More {singlePlanetDetails.englishName} images</button>
						
						<hr className="my-2"></hr>						 
						<div className='d-flex justify-content-evenly'>
							<ul>
								<p className="lead">perihelion: {singlePlanetDetails.perihelion} km</p>
								<p className="lead">aphelion: {singlePlanetDetails.aphelion} km</p>
								<p className="lead">mass: {planetMass.massValue} <sup>{planetMass.massExponent}</sup> kg</p>
								<p className="lead">volume: {planetVolume.volValue} <sup>{planetVolume.volExponent}</sup> km</p>
								<p className="lead">density: {singlePlanetDetails.density} kg</p>
								<p className="lead">gravity: {singlePlanetDetails.gravity} m/s<sup>2</sup></p>
								{moons === null ? <p></p> : <p className="lead">number of moons: {moons.length} (click a moon for more info.)</p> }
							</ul>
							<ul>
								<p className="lead">escape radius: {singlePlanetDetails.escape} km</p>
								<p className="lead">equator radius: {singlePlanetDetails.equaRadius} km</p>
								<p className="lead">polar radius: {singlePlanetDetails.polarRadius} km</p>
								<p className="lead">sideral orbit: {singlePlanetDetails.sideralOrbit} Earth days</p>
								<p className="lead">sideral rotation: {singlePlanetDetails.sideralRotation} hours</p>
								{/* <p className="lead">discovered by: {singlePlanetDetails.discoveredBy}</p> */}
								{/* <p className="lead">discovered on:{singlePlanetDetails.discoveryDate}</p> */}
								<p className="lead">axial tilt: {singlePlanetDetails.axialTilt} degrees</p>
								<p className="lead">average temp: {singlePlanetDetails.avgTemp} degrees Kelvin</p>
							</ul>
						</div>
					</div> :
					<MoonDetails clickedMoon={clickedMoon} /> }
					{clickedImages === false ?
					<p></p> :
					<div className='m-3 bg-dark text-light p-3 rounded'>
						<nav className='d-flex justify-content-between'>
							<button className='btn btn-sm btn-outline-primary' onClick={decrement}>Prev Image</button>
							<h3 className='display-6'>{imageInfo.title}</h3>
							<button className='btn btn-sm btn-outline-primary' onClick={iterate}>Next Image</button>
						</nav>
						<h5 className='lead'>Taken By: {imageInfo.center}</h5>
						<img className="w-100" src={planetImages.href} alt={`pictures of ${singlePlanetDetails.englishName}`} />
						<h5 className='lead'>{imageInfo.description}</h5>
					</div>}
				</div>
				<nav style={props.navBar} className='d-flex flex-column'>
				<button onClick={goHome} className='btn btn-light btn-lg mt-0 mb-3'>Home</button>
					{moons === null ? <p></p> : <h5>Moons of {singlePlanetDetails.englishName}:</h5>}
					{ moons === null ? <p></p> :
						moons.map((item, i) => { 
							return <button key={i} onClick={()=> setClickedMoon(item)} className="btn btn-outline-light m-1">{item.moon}</button>
							// later make the button a link or make an onClick function that makes
							// an api call for the rel property to get that specific moons data and
							// display it
							// probably will need a state for selecting the clicked moon 
						})
					}
				</nav>
			</div> 
			
		</div>
  	)
}

export default PlanetDetails;