import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { MoonDetails } from "../components";
import { PageLayout } from "../components/page-layout";
import type { BodiesType, MoonType, PlanetImageType } from "../utils";
import {
	asideNavbar,
	bodyStyling,
	buttonStyle,
	dataLabelStyle,
} from "../utils/styles";

//TODO: YOU LEFT OFF MIGRATING TO TAILWIND, ALSO NEED TO FINISH SETTING UP BIOME
export const PlanetDetails = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[1]; // Extract the planet ID from the URL

	const [singlePlanetDetails, setSinglePlanetDetails] =
		useState<BodiesType | null>(null);
	const [moons, setMoons] = useState<MoonType[] | []>([]);
	const [clickedMoon, setClickedMoon] = useState<MoonType | null>(null);

	const [planetImages, setPlanetImages] = useState<PlanetImageType[] | null>(
		null,
	);
	const [clickedImages, setClickedImages] = useState(false);
	const [imageIterator, setImageIterator] = useState(0);

	const hasImages =
		planetImages &&
		planetImages.length > 0 &&
		planetImages[imageIterator] &&
		planetImages[imageIterator]?.links[0]?.href;

	useEffect(() => {
		//TODO should be moved to a services file and called once
		axios
			.get(
				`https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=id%2Ceq%2C${id}`,
			)
			.then((res) => {
				setSinglePlanetDetails(res.data.bodies[0]);
				setMoons(res.data.bodies[0].moons);
			})
			.catch((err) => console.log(err));
	}, [id]);
	// console.log(singlePlanetDetails)

	const getPlanetImages = () => {
		axios
			.get(
				`https://images-api.nasa.gov/search?description=${singlePlanetDetails?.englishName}&media_type=image`,
			)
			.then((res) => {
				setPlanetImages(res.data.collection.items);
				console.log(res.data.collection.items);
				setClickedImages(true);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				// Scroll to the images section after fetching
				window.scrollTo({
					top: document.getElementById("imageContainer")?.offsetTop,
					behavior: "smooth",
				});
			});
	};

	// increments the index of the array of images from the api and calls the next/prev image
	const iterate = (change: number) => {
		let i = imageIterator;
		if (planetImages && i === planetImages.length - 1 && change > 0) {
			i = 0;
			setImageIterator(i);
		} else if (planetImages && i === 0 && change < 0) {
			i = planetImages.length - 1;
			setImageIterator(i);
		} else {
			i = change > 0 ? i + 1 : i - 1;
			setImageIterator(i);
		}
	};
	// console.log(imageIterator);

	// console.log(clickedMoon, moons)

	return (
		<PageLayout title={`Details of ${singlePlanetDetails?.englishName}`}>
			<div className="flex">
				<div className={twMerge("text-start", bodyStyling)}>
					{clickedMoon === null ? (
						<div
							className={twMerge(
								"rounded-xl bg-neutral-900 p-6 text-slate-200",
							)}
						>
							<div className="flex items-center justify-between">
								<h1 className="text-xl leading-6">Let's Find Out More!</h1>
								{!clickedImages && (
									<button
										type="button"
										className={twMerge(buttonStyle, "max-w-52")}
										onClick={getPlanetImages}
									>
										See {singlePlanetDetails?.englishName} images
									</button>
								)}
							</div>

							<hr className="my-4"></hr>
							<div className="flex justify-evenly">
								<ul>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											perihelion:
										</span>{" "}
										{singlePlanetDetails?.perihelion} km
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											aphelion:
										</span>{" "}
										{singlePlanetDetails?.aphelion} km
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											mass:
										</span>{" "}
										{singlePlanetDetails?.mass.massValue}{" "}
										<sup>{singlePlanetDetails?.mass.massExponent}</sup> kg
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											volume:
										</span>{" "}
										{singlePlanetDetails?.vol.volValue}{" "}
										<sup>{singlePlanetDetails?.vol.volExponent}</sup> km
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											density:
										</span>{" "}
										{singlePlanetDetails?.density} kg
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											gravity:
										</span>{" "}
										{singlePlanetDetails?.gravity} m/s<sup>2</sup>
									</p>
									{moons === null ? (
										<p>
											<span
												className={twMerge(dataLabelStyle, "text-cyan-500")}
											>
												number of moons:
											</span>{" "}
											none
										</p>
									) : (
										<p>
											<span
												className={twMerge(dataLabelStyle, "text-cyan-500")}
											>
												number of moons:
											</span>{" "}
											{moons.length} (click a moon for more info.)
										</p>
									)}
								</ul>
								<ul>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											escape radius:
										</span>{" "}
										{singlePlanetDetails?.escape} km
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											equator radius:
										</span>{" "}
										{singlePlanetDetails?.equaRadius} km
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											olar radius:
										</span>{" "}
										{singlePlanetDetails?.polarRadius} km
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											sideral orbit:
										</span>{" "}
										{singlePlanetDetails?.sideralOrbit} Earth days
									</p>
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											sideral rotation:
										</span>{" "}
										{singlePlanetDetails?.sideralRotation} hours
									</p>
									{/* <p >discovered by: {singlePlanetDetails?.discoveredBy}</p> */}
									{/* <p >discovered on:{singlePlanetDetails?.discoveryDate}</p> */}
									<p>
										<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
											axial tilt:
										</span>{" "}
										{singlePlanetDetails?.axialTilt} degrees
									</p>
									<p>
										<span className={twMerge(dataLabelStyle)}>
											average temp:{" "}
										</span>
										{singlePlanetDetails?.avgTemp} degrees Kelvin
									</p>
								</ul>
							</div>
						</div>
					) : (
						<MoonDetails clickedMoon={clickedMoon} />
					)}
					{clickedImages && (
						<div className="rounded pt-5" id="#imageContainer">
							{hasImages && (
								<>
									<div className="flex items-center justify-between">
										<button
											type="button"
											className={twMerge(
												buttonStyle,
												"bg-slate-600 text-white hover:border-slate-900 hover:bg-slate-400 hover:text-slate-900",
											)}
											onClick={() => iterate(-1)}
										>
											Prev Image
										</button>
										<h3 className="truncate px-4">
											{planetImages[imageIterator].data[0].title}
										</h3>
										<button
											type="button"
											className={twMerge(
												buttonStyle,
												"bg-slate-600 text-white hover:border-slate-900 hover:bg-slate-400 hover:text-slate-900",
											)}
											onClick={() => iterate(1)}
										>
											Next Image
										</button>
									</div>
									<h5 className="mt-3 font-bold text-xl leading-6">
										Taken By: {planetImages[imageIterator].data[0].center}
									</h5>
									<img
										className="mx-auto mt-3 max-h-80 rounded-lg"
										src={planetImages[imageIterator].links[0].href}
										alt={`pictures of ${singlePlanetDetails?.englishName}`}
									/>
									<h5 className="mt-3 text-sm leading-6">
										{planetImages[imageIterator].data[0].description}
									</h5>
								</>
							)}
						</div>
					)}
				</div>
				<nav
					className={twMerge(
						asideNavbar
					)}
				>
					<Link to="/" className={twMerge(buttonStyle, "block text-center")}>
						Home
					</Link>
					{moons && (
						<>
							{clickedMoon && (
								<button
									type="button"
									onClick={() => setClickedMoon(null)}
									className={twMerge(buttonStyle, "mt-3")}
								>
									Show {singlePlanetDetails?.englishName}
								</button>
							)}
							<h5 className="mt-3 font-bold leading-6">
								Moons of {singlePlanetDetails?.englishName}:
							</h5>
						</>
					)}
					{moons &&
						moons.map(({ moon, rel }) => {
							return (
								<button
									key={moon}
									type="button"
									onClick={() => setClickedMoon({ moon, rel })}
									className={twMerge(buttonStyle, "mt-3")}
								>
									{moon}
								</button>
							);
						})}
				</nav>
			</div>
		</PageLayout>
	);
};
