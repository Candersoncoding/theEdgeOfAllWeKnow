import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { SinglePlanet } from "../components";
import { MobileNav } from "../components/mobile-nav";
import { PageLayout } from "../components/page-layout";
import { useGetAstralPic, useGetPlanets, useGetSun } from "../hooks";
import BackupJWTImage from "../images/james-webb-oct-2024-back-up.jpg"; // backup image in case the APOD is not available
import type { BodiesType } from "../utils";
import { asideNavbar, bodyStyling, buttonStyle } from "../utils/styles";

// avgTemp: number,
// density: number,
// englishname: string,
// escape: number,
// gravity: number,
// meanRadius: number,
// mass: number,
// massEx: string,
// vol: number,
// volEx: string,
// sideralRotation: number,
// Luminosity: number

// export type ContextType = {
// 	newClickedPlanet: BodiesType | null;
// 	setNewClickedPlanet: React.Dispatch<React.SetStateAction<BodiesType | null>>;
// 	planets?: BodiesType[];
// 	sortedPlanets?: BodiesType[];
// 	astralPicInfo?: { title: string; explanation: string };
// 	picOfDay?: string;
// 	sunData?: BodiesType;
// };

// const PlanetContext = createContext<ContextType>(undefined!);

// export const usePlanetContext = () => useContext(PlanetContext);

export const Main = () => {
	const { planets, sortedPlanets } = useGetPlanets();
	const { astralPicInfo, picOfDay } = useGetAstralPic(); // this is the APOD data
	const { sunData } = useGetSun(); // this is the sun data
	const [isSorted, setIsSorted] = useState<boolean>(false);

	const hasPlanets = planets && planets.length > 0;
	const hasSortedPlanets = sortedPlanets && sortedPlanets.length > 0;
	const hasAstralPic = !!picOfDay && astralPicInfo.title !== "other";

	// for fallback?
	const sun = {
		avgTemp: 5772,
		density: 1.409,
		englishname: "The Sun",
		escape: 2223720,
		gravity: 274,
		meanRadius: 695500,
		mass: 1989100,
		massEx: "x 10 to the 24",
		vol: 1409272.56905986,
		volEx: "x 10 to the 12",
		sideralRotation: 609.12,
		Luminosity: 382.8,
	};

	// const [newClickedPlanet, setNewClickedPlanet] = useState<BodiesType | null>(null);
	// const initialClickedPlanet = {newClickedPlanet, setNewClickedPlanet, planets, sortedPlanets, astralPicInfo, picOfDay, sunData} as ContextType;

	const [clickedPlanet, setClickedPlanet] = useState<BodiesType | undefined>();

	// next I must find a way to dynamically make the api call for the APOD to give the
	// user the ability to choose from all previous APOD by date

	// console.log({picInfo: {...astralPicInfo }});

	// pulls data from api about the sun (information missing from this api)
	// why not just pull this from the start and merge it with the planets array?
	// const clickedSun = () => {
	// 	setClickedPlanet(sunData);
	// };

	return (
		<PageLayout title="The Edge of All We Know">
			{/* <PlanetContext.Provider value={initialClickedPlanet}> */}
			<MobileNav
				planets={sortedPlanets}
				sun={sunData}
				setClickedPlanet={setClickedPlanet}
			/>
			<div className="mt-4 sm:mt-0 sm:flex">
				<nav className={twMerge("hidden text-start sm:block", asideNavbar)}>
					{/* map over the planets array and display a list of buttons with the englishName for each planet
                        TODO: pull this out into a its own component and handle sorting conditional rendering vs default output so that full page re-render is not needed
												*/}
					<button
						type="button"
						className={twMerge(buttonStyle, "border-yellow-600 outline-yellow-600 hover:bg-yellow-600 hover:outline-gray-950")}
						onClick={() => setClickedPlanet(sunData)}
					>
						Sun
					</button>
					{hasPlanets &&
						hasSortedPlanets &&
						(isSorted ? sortedPlanets : planets).map((item, i) => {
							return (
									<button
										key={`planet-${item.id ?? i}`}
										type="button"
										className={twMerge("mt-3", buttonStyle)}
										onClick={() => setClickedPlanet(item)}
									>
										{item.englishName}
									</button>
							);
						})}
					<h3 className="mt-3">Can you order the Planets?</h3>
					<p className="mt-3 text-sm">
						What's the order, closest to furthest from the Sun?
					</p>
					<button
						type="button"
						onClick={() => setIsSorted(true)}
						className={twMerge("mt-3", buttonStyle, 'border-cyan-600')}
					>
						Sort Planets
					</button>
					<p className="mt-3 text-sm">(test your theory, click above)</p>
				</nav>
				<div className={twMerge("text-start", bodyStyling)}>
					{/**/}
					{!clickedPlanet && astralPicInfo && (
						<>
							<h5 className="font-semibold leading-6">
								{hasAstralPic
									? astralPicInfo.title
									: "Deep Space image from JWT"}
							</h5>
							<img
								src={hasAstralPic ? picOfDay : BackupJWTImage}
								alt="APOD might be a video: https://apod.nasa.gov/apod/astropix.html"
								className="center m-3 mx-auto w-full max-w-2xl rounded-lg"
							/>
							<p className="leading-6">
								{hasAstralPic && astralPicInfo.explanation}
							</p>
						</>
					)}

					{clickedPlanet && <SinglePlanet planet={clickedPlanet} />}

					{/* <img src={practicePic} alt="practice for date choice" className='w-75 m-5 mx-auto center'/>
                    <form className='w-75 mx-auto center bg-dark rounded'> 
                    {/* the type='date' in the form formats the date incorrectly for input to the api call.
										need (YYYY-MM-DD) default is (mm/dd/yyyy)
										the date type input is also not a string.
										1 the form could take in year, month, day as string seperately.
										2 could set a state to increment or decrement the day onClick, then conditionally
										increment/decrement month based on how many days in that month(take into account leap years),
										then increment/decrement the year based on the month and day that are being incremented/decremented
										3 could find a way to reformat the date coming in from the type=date input using a method
										Ex:
										const moonLanding = new Date('July 20, 69 00:20:18');
										const whenLanding =  `${moonLanding.getFullYear()}, ${moonLanding.getMonth()}, ${moonLanding.getDate()}`
										console.log(whenLanding); */}
					{/* <h5 className='text-light p-3'>Pick a Date</h5>
                        <div className='d-flex'>
												<div className='form-floating mx-auto center' onSubmit={handleDateSubmit}>
												<input type="text" name="year" className='form-control' placeholder='Default Input' onChange={handleDateChange} />
												<label htmlFor="floatingPicOfTheDay">Year(YYYY)</label>
												</div>
												<div className='form-floating mx-auto center'>
												<input type="text" name="month" className='form-control' placeholder='Default Input' onChange={handleDateChange} />
												<label htmlFor="floatingMonth">Month(MM)</label>
												</div>
												<div className='form-floating mx-auto center'>
												<input type="text" name="day" className='form-control' placeholder='Default Input' onChange={handleDateChange} />
												<label htmlFor="floatingDay">Day(DD)</label>
												</div>
                        </div>
                        
                        <input type="submit" value="Checkout Picture from this Day" className='btn btn-outline-light m-3'/>
												</form> */}
					{/*     onClick button, display a jumbotron with major details about the "clicked planet" with a picture
                        this will need to be a rendered component. 
												Information about what planet was clicked will need 
                        to be passed through props. 
												Jumbotron will have a more details button that redirects to another
                        page which displays all data and pictures about that planet.
												Think about putting a Next planet button and prev planet button at the bottom of the details page
                        for increased fluidity*/}
				</div>
			</div>
			{/* </PlanetContext.Provider> */}
		</PageLayout>
	);
};
