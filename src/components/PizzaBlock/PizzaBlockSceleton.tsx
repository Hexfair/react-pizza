import React from "react";
import ContentLoader from "react-content-loader";
//========================================================================================================================

export const PizzaBlockSceleton = (props: any) => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="141" cy="125" r="125" />
		<rect x="0" y="267" rx="9" ry="9" width="280" height="28" />
		<rect x="0" y="311" rx="9" ry="9" width="280" height="88" />
		<rect x="1" y="419" rx="9" ry="9" width="90" height="27" />
		<rect x="135" y="412" rx="9" ry="9" width="146" height="39" />
	</ContentLoader>
)
