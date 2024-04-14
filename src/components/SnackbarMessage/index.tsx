'use client';

import React, { FC } from 'react';

interface SnackbarMessageProps {
	title?: string | null | undefined;
	method?: string | null | undefined;
	description?: string | null | undefined;
}

const SnackbarMessage: FC<SnackbarMessageProps> = (props) => {
	const { title, method, description } = props;

	return (
		<div className="flex flex-col">
			<h1 className="text-lg">Title: {title}</h1>
			<h1 className="text-lg">Method: {method}</h1>
			{description ? (
				<div className="flex flex-col">
					<h1 className="text-lg">Description:</h1>
					<h1 className="text-base pl-2"> {description}</h1>
				</div>
			) : null}
		</div>
	);
};

export default SnackbarMessage;
