import React from 'react';

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDataGridContext } from '@/context/DataGridProvider';
import { FilterConditionsUtils } from '@/utils';

interface ActionsProps {
	handleClose: () => void;
}

const Actions = (props: ActionsProps) => {
	const { filterConfigs, filterConditions, updateFilterConditions } = useDataGridContext();
	const { handleClose } = props;

	const handleAdd = () => {
		if (filterConfigs) {
			const updatedFilterConditions = FilterConditionsUtils.generateNewLine({
				filterConfigs,
				filterConditions,
			});
			updateFilterConditions(updatedFilterConditions);
		}
	};

	const handleRemoveAll = () => {
		if (filterConfigs) {
			if (filterConditions.conditions.length === 1) {
				handleClose();
			}
			filterConditions.conditions = [];
			const updatedFilterConditions = FilterConditionsUtils.generateNewLine({
				filterConfigs,
				filterConditions,
			});
			updateFilterConditions(updatedFilterConditions);
		}
	};

	return (
		<>
			<Button className="btn-submit" startIcon={<AddIcon />} onClick={handleAdd}>
				Add Filter
			</Button>
			<Button className="btn-submit" startIcon={<DeleteForeverIcon />} onClick={handleRemoveAll}>
				Remove All
			</Button>
		</>
	);
};

export default Actions;
