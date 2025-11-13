import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { Loader } from "./components/loader";

const root = document.getElementById("app");
if (!root) {
	throw new Error(
		'Root container missing: could not find element with id "app"',
	);
}
const rootElement = createRoot(root);

rootElement.render(
	<StrictMode>
		<Suspense fallback={<Loader />}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Suspense>
	</StrictMode>,
);
