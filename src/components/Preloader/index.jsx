import React from 'react';

import './index.css';

const Preloader = ({small = false, fill = false, page = false}) => {
	return(
		<div className={`preloader__inner${fill ? " fill" : ""}${page ? " page" : ""}`}>
			<div className={`preloader${small ? " small" : ""}`}></div>
		</div>
	)
}

export default Preloader;