import React, { ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomDialogProps {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	isOpen: boolean;
	handleClose: () => void;
	title: string;
	dialogContent: ReactNode;
	enableSubmit: boolean;
	handleSubmit: (props: any) => void;
	submitText: string;
}

const CustomDialog = (props: CustomDialogProps) => {
	const { size = 'sm', isOpen, handleClose, title, dialogContent, enableSubmit, handleSubmit, submitText } = props;

	return (
		<Dialog fullWidth maxWidth={size} open={isOpen} onClose={handleClose}>
			<DialogTitle className="flex items-center justify-between p-2">
				<div>{title}</div>
				<IconButton size="small" onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent className="p-10" dividers>
				{dialogContent}
			</DialogContent>
			<DialogActions className="py-3 pr-4">
				<Button className="btn-submit btn-small-size" disabled={!enableSubmit} onClick={handleSubmit}>
					{submitText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CustomDialog;
