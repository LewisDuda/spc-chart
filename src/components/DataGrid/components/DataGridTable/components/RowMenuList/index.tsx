import React from 'react';
import { MenuItem } from '@mui/material';
import { useDataGridContext } from '@/context/DataGridProvider';

interface RowMenuListProps {
	item: any;
	handleCloseMenu: () => void;
}

const RowMenuList = (props: RowMenuListProps) => {
	const { actions: Actions } = useDataGridContext();
	const { item, handleCloseMenu } = props;

	return (
		<>
			{Actions?.map((action, index) => {
				const disabledFunc = action.disabledFunc ? action.disabledFunc(item) : false;
				const hiddenFunc = action.hiddenFunc ? action.hiddenFunc(item) : false;

				return (
					<MenuItem
						className={`${action.hidden || hiddenFunc ? 'hidden' : 'flex'}`}
						disabled={action.disabled || disabledFunc}
						key={index}
						onClick={() => action.func({ item, handleCloseMenu })}
					>
						{action.label}
					</MenuItem>
				);
			})}
		</>
	);
};

export default RowMenuList;
