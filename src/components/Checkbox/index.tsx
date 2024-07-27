'use client';

import React, { FC, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

interface MyCheckboxProps {
	checked: boolean;
	size?: 'sm' | 'md' | 'lg';
	indeterminate?: boolean;
}

const sizeMap = {
	sm: '1.5rem',
	md: '2rem',
	lg: '2.5rem',
};

const MyCheckbox: FC<MyCheckboxProps> = ({ checked, size = 'md', indeterminate }) => {
	const [checkboxSize, setCheckboxSize] = useState(sizeMap[size]);

	useEffect(() => {
		setCheckboxSize(sizeMap[size]);
	}, [size]);

	return (
		<Checkbox
			checked={checked}
			indeterminate={indeterminate}
			sx={{ '& .MuiSvgIcon-root': { fontSize: checkboxSize } }}
		/>
	);
};

export default MyCheckbox;
