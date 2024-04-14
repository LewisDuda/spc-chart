'use client';

import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { FormControl, Button, TextField } from '@mui/material';
import { ADD_CONTENT_INTERFACE } from '@/models/chartsDefinitions';

interface PanelProps {
	content: ADD_CONTENT_INTERFACE;
	validStatus: Record<string, string>;
	onTextChange: (field: string, value: string | number) => void;
	handleSubmit: () => void;
	handleCancel: () => void;
	enableAdd: boolean;
}

const Panel = (props: PanelProps) => {
	const { content, validStatus, onTextChange, handleSubmit, handleCancel, enableAdd } = props;

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
		if (event.key === 'Enter') {
			return handleSubmit();
		}
		return;
	};

	useEffect(() => {
		toolNameInputRef.current?.focus();
	}, []);

	return (
		<>
			<FormControl fullWidth>
				<TextField
					inputRef={toolNameInputRef}
					id="toolName"
					name="toolName"
					label="Tool Name"
					variant="standard"
					value={content.toolName}
					error={validStatus.toolName !== ''}
					helperText={validStatus.toolName}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth>
				<TextField
					id="chartName"
					name="chartName"
					label="Chart Name"
					variant="standard"
					value={content.chartName}
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
					value={content.yAxialTitle}
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
					value={content.maxSpec}
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
					value={content.minSpec}
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
					value={content.target}
					error={validStatus.target !== ''}
					helperText={validStatus.target}
					onChange={handleChange}
					onKeyDown={keyPress}
				/>
			</FormControl>
			<div className="w-full flex flex-wrap justify-around">
				<Button className="btn-submit btn-medium-size" disabled={!enableAdd} onClick={handleSubmit}>
					Add
				</Button>
				<Button className="btn-cancel btn-medium-size" onClick={handleCancel}>
					Cancel
				</Button>
			</div>
		</>
	);
};

export default Panel;
