import React, { ReactNode } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface DisplayWithArrowProps {
	direction?: string;
	children: ReactNode;
}

const DisplayWithArrow = (props: DisplayWithArrowProps) => {
	const { direction = 'right', children } = props;

	return (
		<div className="flex items-center gap-1">
			{direction === 'right' && (
				<>
					<ExpandMoreIcon className="-rotate-90" />
					{children}
				</>
			)}
			{direction === 'down' && (
				<>
					<ExpandMoreIcon />
					{children}
				</>
			)}
		</div>
	);
};

export default DisplayWithArrow;
