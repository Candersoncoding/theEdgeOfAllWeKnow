import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Earth from "../images/earth.jpg";
import Jupiter from "../images/jupiter.png";
import Mars from "../images/mars.jpg";
import Mercury from "../images/mercury.jpg";
import Neptune from "../images/neptune.jpg";
import Saturn from "../images/saturn.jpg";
import Sun from "../images/sun.jpg";
import Uranus from "../images/uranus.jpg";
import Venus from "../images/venus.jpg";
import type { BodiesType } from "../utils";
import { buttonStyle } from "../utils/styles";
import { DlItem } from "./dl-item";

type PlanetType = {
	planet: BodiesType;
};

const planetMap = {
	Sun: Sun,
	Mercury: Mercury,
	Venus: Venus,
	Earth: Earth,
	Mars: Mars,
	Jupiter: Jupiter,
	Saturn: Saturn,
	Uranus: Uranus,
	Neptune: Neptune,
};

export const SinglePlanet = (props: PlanetType) => {
	const { id, englishName, avgTemp, moons, meanRadius, gravity } = props.planet;

	return (
		<div className="rounded-xl bg-neutral-900 p-6 text-slate-200">
			<h2 className="font-bold text-2xl">{englishName}</h2>
			<img
				className="mx-auto my-3 w-3/4 rounded-lg"
				src={planetMap[englishName as keyof typeof planetMap]}
				alt={englishName}
			/>
			<hr className="my-4"></hr>
			<div className="grid grid-cols-2 gap-4 py-4">
				<div>
					<DlItem label="Average Temp:" value={`${avgTemp} K`} />
					<DlItem
						label="Number of Moons:"
						value={moons == null ? "0" : moons.length}
					/>
				</div>
				<div>
					<DlItem label="Mean Radius:" value={`${meanRadius} km`} />
					<DlItem
						label="Gravity:"
						value={
							<span>
								{gravity} m/s<sup>2</sup>
							</span>
						}
					/>
				</div>
			</div>
			<Link
				className={twMerge(
					buttonStyle,
					"mt-3 border-cyan-600 hover:bg-cyan-700 hover:text-white",
				)}
				to={`/${id}/details`}
			>
				Dive Deeper
			</Link>
		</div>
	);
};
