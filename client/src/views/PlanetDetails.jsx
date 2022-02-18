import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlanetDetails = (props) => {

  const [singlePlanetDetails, setSinglePlanetDetails] = useState([]);
	
  useEffect(()=> {
    axios.get(`https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=id%2Ceq%2C${props.id}`)
      .then(res => setSinglePlanetDetails(res.data.bodies[0]))
      .catch(err => console.log(err))
  }, [])
  console.log(singlePlanetDetails)
  // setTimeout function for render return() so the api can get the data first before trying to render
  const checkApi = (event) => {
	  event.preventDefault();
	  axios.get(`https://images-api.nasa.gov/search?description=${singlePlanetDetails.englishName}&media_type=image`)
	  	.then(res => console.log(res.data.collection.items))
		.catch(err => console.log(err))
  }

//   console.log(singlePlanetDetails);

	//   ideas for the detail data in the table:	
	//   	have buttons in the navbar that change the data the table is filled with
	// 		based on the state that is being mapped over. onClick of a different category or item
	//		updates the state and updates the table data
  return(
		<div>
			<header style={props.styleHeader} className='display-1'>
				Details of {singlePlanetDetails.englishName} 
			</header>
			<div className='d-flex'>
				<div style={props.bodyStyling}>
					<div className="jumbotron text-light m-5 bg-dark p-3 rounded">
						<h1 className="display-5">Let's Find Out More!</h1>
						{/* <p className="lead"></p> */}
						<button className='btn btn-outline-primary' onClick={checkApi}>check images</button>
						
						<hr className="my-2"></hr>						 
						<div className='d-flex justify-content-evenly'>
							<ul>
								{/* <p className="lead">number of moons: {singlePlanetDetails.moons.length}</p> */}
								<p className="lead">perihelion: {singlePlanetDetails.perihelion} km</p>
								<p className="lead">aphelion: {singlePlanetDetails.aphelion} km</p>
								{/* <p className="lead">mass: {singlePlanetDetails.mass.massValue} <sup>{singlePlanetDetails.mass.massExponent}</sup> kg</p> */}
								{/* <p className="lead">volume: {singlePlanetDetails.vol.volValue} <sup>{singlePlanetDetails.vol.volExponent}</sup> km</p> */}
								<p className="lead">density: {singlePlanetDetails.density} kg</p>
								<p className="lead">gravity: {singlePlanetDetails.gravity} m/s<sup>2</sup></p>
							</ul>
							<ul>
								<p className="lead">escape radius: {singlePlanetDetails.escape} km</p>
								<p className="lead">equator radius: {singlePlanetDetails.equaRadius} km</p>
								<p className="lead">sideral orbit: {singlePlanetDetails.sideralOrbit} Earth days</p>
								<p className="lead">sideral rotation: {singlePlanetDetails.sideralRotation} hours</p>
								{/* <p className="lead">discovered by: {singlePlanetDetails.discoveredBy}</p> */}
								{/* <p className="lead">discovered on:{singlePlanetDetails.discoveryDate}</p> */}
								<p className="lead">axial tilt: {singlePlanetDetails.axialTilt} degrees</p>
								<p className="lead">average temp: {singlePlanetDetails.avgTemp} degrees Kelvin</p>
							</ul>
						</div>
					</div>
				</div>
				<nav style={props.navBar} className='d-flex flex-column'>
					{/* {singlePlanetDetails.moons === null ? <p></p> : <h5>Moons of {singlePlanetDetails.englishName}:</h5>} */}
					{/* { singlePlanetDetails.moons === null ? <p></p> : */}
						{/* singlePlanetDetails.moons.map((item, i) => { 
							return <button key={i} className="btn btn-outline-light m-1">{item.moon}</button>
							later make the button a link or make an onClick function that makes
							an api call for the rel property to get that specific moons data and
							display it
							probably will need a state for selecting the clicked moon 
						})
					}*/}
				</nav>
			</div> 
			
		</div>
  )
}

export default PlanetDetails;