import React from 'react';

import { Divider } from '@mui/material';
import { Conditions, Actions } from './components';

interface FiltersProps {
	handleClose: () => void;
}

const Filters = (props: FiltersProps) => {
	const { handleClose } = props;

	return (
		<div className="w-[40rem] flex flex-col gap-3">
			<div className="w-full max-h-60 flex flex-col items-center justify-between p-2  overflow-y-auto">
				<Conditions handleClose={handleClose} />
			</div>
			<Divider />
			<div className="w-full flex items-center justify-between p-2">
				<Actions handleClose={handleClose} />
			</div>
		</div>
	);
};

export default Filters;
