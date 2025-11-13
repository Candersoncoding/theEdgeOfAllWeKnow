import { useState } from "react";
import type { BodiesType } from "../utils";

type Props = {
	planets: BodiesType[] | undefined;
	sun: BodiesType | undefined;
	setClickedPlanet: React.Dispatch<
		React.SetStateAction<BodiesType | undefined>
	>;
};

export const MobileNav = ({ planets, sun, setClickedPlanet }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	// const { setNewClickedPlanet } = usePlanetContext();
	return (
		<nav className="w-full text-white sm:hidden">
			<button
				className="w-full rounded-lg border-2 border-gray-300 bg-gray-700 px-4 py-2 text-center"
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				Menu
			</button>
			<ul
				className={`${isOpen ? "block" : "hidden"} fixed z-20 mt-2 w-11/12 rounded-lg bg-cyan-800 bg-opacity-95`}
			>
				<li
					onClick={() => {
						setClickedPlanet(sun);
						setIsOpen(false);
					}}
					className="rounded-t-lg bg-yellow-600 px-2 py-4 hover:bg-gray-300 hover:text-gray-900 hover:outline hover:outline-4 hover:outline-yellow-600 hover:outline-offset-0"
				>
					<p>{sun?.englishName ?? "Sun"}</p>
				</li>
				{planets?.map((planet) => (
					<li
						key={planet.id}
						onClick={() => {
							setClickedPlanet(planet);
							setIsOpen(false);
						}}
						className="border-gray-300 border-t px-2 py-4 last:rounded-b-lg hover:bg-gray-300 hover:text-gray-900 hover:outline hover:outline-4 hover:outline-gray-900 hover:outline-offset-0"
					>
						<p>{planet.englishName}</p>
					</li>
				))}
			</ul>
		</nav>
	);
};
