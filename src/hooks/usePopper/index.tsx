import React, { useEffect, useState } from 'react';
import { Popper, Fade } from '@mui/material';

interface UsePopperProps {
	id?: string;
}

interface UsePopperResult {
	id: string | undefined;
	isOpen: boolean;
	anchorEl: null | HTMLElement;
	handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
	handleClose: () => void;
}

const usePopper = (props: UsePopperProps): UsePopperResult => {
	const { id: propsId = 'default-popper' } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const isOpen = Boolean(anchorEl);
	const id = isOpen ? propsId : undefined;

	return {
		id,
		isOpen,
		anchorEl,
		handleOpen,
		handleClose,
	};
};

export default usePopper;
