import React, { ReactNode } from 'react';
import { Menu } from '@mui/material';

interface ContextMenuProps {
	anchorPosition: {
		mouseX: number;
		mouseY: number;
	} | null;
	handleClose: () => void;
	menuOptions: ReactNode;
}

const ContextMenu = (props: ContextMenuProps) => {
	const { anchorPosition, handleClose, menuOptions } = props;

	return (
		<Menu
			id="context-menu"
			anchorReference="anchorPosition"
			anchorPosition={
				anchorPosition !== null ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX } : undefined
			}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			keepMounted
			open={!!anchorPosition}
			onClose={handleClose}
		>
			{menuOptions}
		</Menu>
	);
};

export default ContextMenu;
