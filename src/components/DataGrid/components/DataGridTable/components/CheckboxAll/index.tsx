'use client';

import React, { useEffect, useState } from 'react';

import { Checkbox, MenuList, MenuItem, Divider, Popover } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { usePopper } from '@/hooks';

interface CheckboxOfAllProps {
<<<<<<< HEAD
	isItemsEmpty: boolean;
	isError: boolean;
=======
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
	isSelectedPageOfAll: boolean;
	isSelectedAll: boolean;
	handleChangeSelectAll: (type: string) => void;
}

const CheckboxOfAll = (props: CheckboxOfAllProps) => {
<<<<<<< HEAD
	const { isItemsEmpty, isError, isSelectedPageOfAll, isSelectedAll, handleChangeSelectAll } = props;
	const { id, isOpen, anchorEl, handleOpen, handleClose } = usePopper({});
	const [isChecked, setIsChecked] = useState(false);
	const [isIndeterminate, setIsIndeterminate] = useState(false);
	const backgroundColor = isOpen ? 'bg-checkbox-hover-bg' : '';
=======
	const { isSelectedPageOfAll, isSelectedAll, handleChangeSelectAll } = props;
	const { id, isOpen, anchorEl, handleOpen, handleClose } = usePopper({});
	const [backgroundColor, setBackgroundColor] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [isIndeterminate, setIsIndeterminate] = useState(false);
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)

	const handleChangeCheckbox = () => {
		if (!isChecked && !isIndeterminate) {
			setIsIndeterminate(true);
			handleChangeSelectAll('onePage');
		} else if (!isChecked && isIndeterminate) {
			setIsChecked(true);
			setIsIndeterminate(false);
			handleChangeSelectAll('all');
		} else if (isChecked && !isIndeterminate) {
			setIsChecked(false);
			setIsIndeterminate(false);
			handleChangeSelectAll('cancel');
		}
	};

	const handleMenuItemClick = (type: string) => {
		if (type === 'onePage') {
			handleClose();
			setIsChecked(false);
			setIsIndeterminate(true);
			handleChangeSelectAll('onePage');
		} else if (type === 'all') {
			handleClose();
			setIsChecked(true);
			setIsIndeterminate(false);
			handleChangeSelectAll('all');
		} else if (type === 'cancel') {
			handleClose();
			setIsChecked(false);
			setIsIndeterminate(false);
			handleChangeSelectAll('cancel');
		}
	};

	useEffect(() => {
<<<<<<< HEAD
=======
		if (isOpen) {
			setBackgroundColor('bg-checkbox-hover-bg');
		} else {
			setBackgroundColor('');
		}
	}, [isOpen]);

	useEffect(() => {
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
		if (isSelectedPageOfAll && isSelectedAll) {
			setIsChecked(true);
			setIsIndeterminate(false);
		} else if (isSelectedPageOfAll) {
			setIsChecked(false);
			setIsIndeterminate(true);
		} else if (!isSelectedPageOfAll && !isSelectedPageOfAll) {
			setIsChecked(false);
			setIsIndeterminate(false);
<<<<<<< HEAD
		} else if (isItemsEmpty || isError) {
			setIsChecked(false);
			setIsIndeterminate(false);
=======
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
		}
	}, [isSelectedPageOfAll, isSelectedAll]);

	return (
		<div className={`h-max w-max flex items-center box-border ${backgroundColor}`}>
			<Checkbox
				className="CheckboxOfAll"
				checked={isChecked && !isIndeterminate}
				indeterminate={isIndeterminate}
				onChange={handleChangeCheckbox}
			/>
			<div className={`h-full w-max cursor-pointer hover:bg-checkbox-hover-bg py-1.5`} onClick={handleOpen}>
				<ArrowDropDownIcon />
			</div>
			<Popover
				id={id}
				open={isOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<MenuList className="bg-gray opacity-100">
					<MenuItem onClick={() => handleMenuItemClick('all')}>Select All</MenuItem>
					<MenuItem disabled={isChecked} onClick={() => handleMenuItemClick('onePage')}>
						Select All on This Page
					</MenuItem>
					<Divider />
					<MenuItem onClick={() => handleMenuItemClick('cancel')}>Deselect All</MenuItem>
				</MenuList>
			</Popover>
		</div>
	);
};

export default CheckboxOfAll;
