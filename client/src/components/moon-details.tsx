import axios from "axios";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { BodiesType, MoonType } from "../utils";
import { bodyStyling, dataLabelStyle } from "../utils/styles";

type Props = {
	clickedMoon: MoonType;
};

export const MoonDetails = (props: Props) => {
	const { clickedMoon } = props;

	const [currentMoon, setCurrentMoon] = useState<BodiesType | null>(null);

	const hasRetrograde =
		currentMoon?.sideralOrbit && currentMoon?.sideralOrbit < 0;

	useEffect(() => {
		axios
			.get(`${clickedMoon.rel}`)
			.then((res) => {
				setCurrentMoon(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, [clickedMoon.rel]);

	return (
		<div
			className={twMerge(
				bodyStyling,
				"w-full rounded-xl bg-neutral-900 p-6 text-slate-200",
			)}
		>
			<h2 className="font-bold text-xl leading-8">{clickedMoon.moon}</h2>
			<div className="flex justify-between">
				<ul className="mt-3">
					<p className="leading-6">
						<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
							density:
						</span>{" "}
						{currentMoon?.density}
					</p>
					<p className="leading-6">
						<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
							mean radius:
						</span>{" "}
						{currentMoon?.meanRadius} km
					</p>
					{hasRetrograde ? (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								sideral orbit:
							</span>{" "}
							(retrograde) {currentMoon?.sideralOrbit} Earth days
						</p>
					) : (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								sideral orbit:
							</span>{" "}
							{currentMoon?.sideralOrbit} Earth days
						</p>
					)}
					{currentMoon?.sideralRotation === 0 ? (
						<p className="lead text-secondary">sideral rotation: N/A</p>
					) : (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								sideral rotation:
							</span>{" "}
							{currentMoon?.sideralRotation} hours
						</p>
					)}
					{currentMoon?.mass && currentMoon?.mass.massValue === 0 ? (
						<p className="lead text-secondary">mass: N/A</p>
					) : (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								mass:
							</span>{" "}
							{currentMoon?.mass.massValue}{" "}
							<sup>{currentMoon?.mass.massExponent}</sup> kg
						</p>
					)}
				</ul>
				<ul className="hover:-translate-x-4 hover:-translate-y-4 max-w-[50%] hover:rounded-xl hover:border hover:border-white hover:bg-cyan-900 hover:p-4">
					<p className="text-sm leading-6">
						(<span className="font-bold">retrograde</span>) moon orbiting
						travels in opposite direction of planet's rotation
					</p>
					<p className="mt-3 text-sm leading-6">
						(<span className="font-bold">sideral orbit</span>) how long it takes
						for one revolution around moon's planet
					</p>
				</ul>
			</div>
			<hr className="my-4"></hr>
			<div className="flex justify-between">
				<ul className="hover:-translate-x-4 hover:-translate-y-4 max-w-[50%] hover:rounded-2xl hover:border hover:border-white hover:bg-cyan-900 hover:p-4">
					<p className="text-sm leading-6">
						(<span className="font-bold">sideral rotation</span>) how long it
						takes for a moon or planet to complete one full rotation{" "}
					</p>
					<p className="mt-3 text-sm leading-6">
						(<span className="font-bold">orbital eccentricity</span>) defined
						between 0 and 1, this describes the orbitalal shape. Closer to 0 =
						more circular, and closer to 1 = a longer, more stretched oval or
						ellipse shape.
					</p>
				</ul>
				<ul className="center mx-auto">
					{currentMoon?.discoveredBy !== "" && (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								discoverd by:
							</span>{" "}
							{currentMoon?.discoveredBy}
						</p>
					)}
					{currentMoon?.discoveryDate !== "" && (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								discovery date:
							</span>{" "}
							{currentMoon?.discoveryDate}
						</p>
					)}
					<p className="leading-6">
						<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
							orbital eccentricity:
						</span>{" "}
						{currentMoon?.eccentricity}
					</p>
					{currentMoon?.aphelion === 0 ? (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								aphelion:
							</span>{" "}
							N/A
						</p>
					) : (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								aphelion:
							</span>{" "}
							{currentMoon?.aphelion} km
						</p>
					)}
					{currentMoon?.perihelion === 0 ? (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								perihelion:
							</span>{" "}
							N/A
						</p>
					) : (
						<p className="leading-6">
							<span className={twMerge(dataLabelStyle, "text-cyan-500")}>
								perihelion:
							</span>{" "}
							{currentMoon?.perihelion} km
						</p>
					)}
				</ul>
			</div>
		</div>
	);
};
