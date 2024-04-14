import React from 'react';

import {
	FormControl,
	FormLabel,
	IconButton,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Autocomplete,
	Chip,
} from '@mui/material';
import { useDataGridContext } from '@/context/DataGridProvider';
import { LocalizationProvider, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface valueProps {
	rowIndex: number;
}

const Value = (props: valueProps) => {
	const { filterConditions, updateFilterConditions } = useDataGridContext();
	const { rowIndex } = props;

	const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
		const updatedFilterConditions = {
			...filterConditions,
			conditions: filterConditions.conditions.map((condition, index) => {
				if (index === rowIndex) {
					return {
						...condition,
						value: event.target.value,
					};
				}
				return condition;
			}),
		};
		updateFilterConditions(updatedFilterConditions);
	};

	const handleChangeValueWithNumber = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
		const queryValue = !event.target.value ? '' : parseInt(event.target.value);

		const updatedFilterConditions = {
			...filterConditions,
			conditions: filterConditions.conditions.map((condition, index) => {
				if (index === rowIndex) {
					return {
						...condition,
						value: queryValue,
					};
				}
				return condition;
			}),
		};
		updateFilterConditions(updatedFilterConditions);
	};

	switch (filterConditions.conditions[rowIndex].type) {
		case 0:
			return '';
		case 1:
			return (
				<Select
					id={`value_${rowIndex}`}
					label=""
					labelId={`value_label_${rowIndex}`}
					value={filterConditions.conditions[rowIndex].value}
					// onChange={handleChangeLogic}
				>
					{filterConditions.conditions[rowIndex].valueOptions.map((option, index) => (
						<MenuItem key={index} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			);
		case 2:
			return (
				<TextField
					id={`value_${rowIndex}`}
					label=""
					variant="standard"
					autoFocus={true}
					type="number"
					className="pt-4"
					value={filterConditions.conditions[rowIndex].value}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						handleChangeValueWithNumber(event, rowIndex)
					}
				/>
			);
		case 3:
			return (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label=""
						format="YYYY/MM/DD"
						value={dayjs(filterConditions.conditions[rowIndex].value)}
						slotProps={{ textField: { variant: 'standard' } }}
					/>
				</LocalizationProvider>
			);
		case 4:
			return (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						label=""
						format="YYYY/MM/DD"
						value={dayjs(filterConditions.conditions[rowIndex].value)}
						slotProps={{ textField: { variant: 'standard' } }}
					/>
				</LocalizationProvider>
			);
		case 5:
			return (
				<Autocomplete
					id={`value_${rowIndex}`}
					options={[]}
					value={filterConditions.conditions[rowIndex].value}
					freeSolo
					renderTags={(value, getTagProps) =>
						value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
					}
					renderInput={(params) => (
						<TextField {...params} variant="standard" helperText="Press Enter to add tag" />
					)}
				/>
			);
		case 6:
			return (
				<Autocomplete
					id={`value_${rowIndex}`}
					options={filterConditions.conditions[rowIndex].valueOptions}
					value={filterConditions.conditions[rowIndex].value || null}
					getOptionLabel={(option) => option.label}
					freeSolo
					renderOption={(props, option) => <li {...props}>{option.label}</li>}
					renderInput={(params) => (
						<TextField
							{...params}
							variant="standard"
							inputProps={{ ...params.inputProps, autoComplete: 'anything' }}
						/>
					)}
				/>
			);
		case 7:
			return (
				<div className="flex items-center">
					<div className="w-1/2">
						<TextField
							id={`value_${rowIndex}`}
							label=""
							variant="standard"
							autoFocus={true}
							className="pt-4"
							value={filterConditions.conditions[rowIndex].value}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleChangeValue(event, rowIndex)
							}
						/>
					</div>
					<div className="w-1/2">
						<Select
							id={`value_${rowIndex}`}
							label=""
							labelId={`value_label_${rowIndex}`}
							value={filterConditions.conditions[rowIndex].value}
							// onChange={handleChangeLogic}
						>
							{filterConditions.conditions[rowIndex].valueOptions.map((option, index) => (
								<MenuItem key={index} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>
			);
		default:
			return (
				<TextField
					id={`value_${rowIndex}`}
					label=""
					variant="standard"
					autoFocus={true}
					className="pt-4"
					value={filterConditions.conditions[rowIndex].value}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeValue(event, rowIndex)}
				/>
			);
	}
};

export default Value;
