import { twMerge } from "tailwind-merge";
import { styleHeader } from "../utils/styles";

type PageProps = {
	title: string;
	children: React.ReactNode;
};

export const PageLayout = (pageProps: PageProps) => {
	const { title, children } = pageProps;

	return (
		<div className="h-auto min-h-[100vh] bg-cover bg-slate-900">
			<div className="mx-auto max-w-screen-lg">
				<header className={styleHeader}>
					<h1 className="text-2xl">{title}</h1>
				</header>
				<main className="flex-grow p-4 xl:px-0 xl:py-4">
					{/* Main content goes here */}
					{children}
				</main>
				<footer
					className={twMerge("px-4 text-center md:text-left", styleHeader)}
				>
					<p>
						* Website updated 2025. Solar System data sourced from NASA and
						Solaire APIs.
					</p>
				</footer>
			</div>
		</div>
	);
};
