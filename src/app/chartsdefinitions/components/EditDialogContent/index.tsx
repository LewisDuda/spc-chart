'use client';

import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { FormControl, Button, TextField } from '@mui/material';
import { EDIT_CONTENT_INTERFACE } from '@/models/chartsDefinitions';

interface EditDialogContentProps {
	editContent: EDIT_CONTENT_INTERFACE;
	validStatus: Record<string, string>;
	onTextChange: (field: string, value: string | number) => void;
	handleSubmit: () => void;
	enableSubmit: boolean;
}

const EditDialogContent = (props: EditDialogContentProps) => {
	const { editContent, validStatus, onTextChange, handleSubmit, enableSubmit } = props;

	const toolNameInputRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		let changeField = event.target.name;
		let value;

		if (changeField === 'maxSpec' || changeField === 'minSpec' || changeField === 'target') {
			value = parseFloat(event.target.value);
		} else {
			value = event.target.value;
		}

		onTextChange(changeField, value);
	};

	const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && enableSubmit) {
			return handleSubmit();
		}
		return;
	};

	useEffect(() => {
		toolNameInputRef.current?.focus();
	}, []);

	return (
		<div className="flex flex-col gap-10">
			<FormControl fullWidth>
				<TextField
					disabled={true}
					inputRef={toolNameInputRef}
					id="toolName"
					name="toolName"
					label="Tool Name"
					variant="standard"
					value={editContent.toolName}
					error={validStatus.toolName !== ''}
					helperText={validStatus.toolName}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					disabled={true}
					id="chartName"
					name="chartName"
					label="Chart Name"
					variant="standard"
					value={editContent.chartName}
					error={validStatus.chartName !== ''}
					helperText={validStatus.chartName}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="yAxialTitle"
					name="yAxialTitle"
					label="Y Axial Title"
					variant="standard"
					value={editContent.yAxialTitle}
					error={validStatus.yAxialTitle !== ''}
					helperText={validStatus.yAxialTitle}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="maxSpec"
					name="maxSpec"
					label="Max Spec"
					type="number"
					variant="standard"
					value={editContent.maxSpec}
					error={validStatus.maxSpec !== ''}
					helperText={validStatus.maxSpec}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="minSpec"
					name="minSpec"
					label="Min Spec"
					type="number"
					variant="standard"
					value={editContent.minSpec}
					error={validStatus.minSpec !== ''}
					helperText={validStatus.minSpec}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="target"
					name="target"
					label="Target"
					type="number"
					variant="standard"
					value={editContent.target}
					error={validStatus.target !== ''}
					helperText={validStatus.target}
					onChange={handleChange}
					onKeyDown={keyPress}
				/>
			</FormControl>
		</div>
	);
};

export default EditDialogContent;
