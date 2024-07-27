import React from 'react';

import { FormControl, FormLabel, IconButton, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { useDataGridContext } from '@/context/DataGridProvider';
import { Value } from './components';
import { FilterConditionsUtils } from '@/utils';

import ClearIcon from '@mui/icons-material/Clear';

interface ConditionsProps {
	handleClose: () => void;
}

const Conditions = (props: ConditionsProps) => {
	const { filterConfigs, filterConditions, updateFilterConditions } = useDataGridContext();
	const { handleClose } = props;

	const handleCancelSearch = (rowIndex: number) => {
		if (filterConfigs) {
			if (filterConfigs && filterConditions.conditions.length === 1) {
				filterConditions.conditions = [];
				const updatedFilterConditions = FilterConditionsUtils.generateNewLine({
					filterConfigs,
					filterConditions,
				});
				updateFilterConditions(updatedFilterConditions);
				handleClose();
			} else {
				filterConditions.conditions.splice(rowIndex, 1);
				updateFilterConditions(filterConditions);
			}
		}
	};

	const handleChangeLogic = (event: SelectChangeEvent) => {
		filterConditions.logic = event.target.value;
		updateFilterConditions(filterConditions);
	};

	const handleChangeColumn = (event: SelectChangeEvent, rowIndex: number) => {
		if (filterConfigs) {
			const updatedFilterConditions = {
				...filterConditions,
				conditions: filterConditions.conditions.map((condition, index) => {
					if (index === rowIndex) {
						const selectedIndex = filterConfigs.findIndex(
							(config) => config.fieldKey === event.target.value
						);

						return {
							...condition,
							operatorOptions: FilterConditionsUtils.options.operators({
								filterConfigs,
								selectedIndex,
							}),
							valueOptions: FilterConditionsUtils.options.value({ filterConfigs, selectedIndex }),
							unitOptions: FilterConditionsUtils.options.unit({ filterConfigs, selectedIndex }),
							columnValue: FilterConditionsUtils.value.columnValue({
								filterConfigs,
								selectedIndex,
							}),
							operatorValue: FilterConditionsUtils.value.operatorValue({
								filterConfigs,
								selectedColumnIndex: selectedIndex,
								selectedOperatorIndex: 0,
							}),
							value: FilterConditionsUtils.value.queryValue({
								filterConfigs,
								selectedColumnIndex: selectedIndex,
								selectedOperatorIndex: 0,
							}),
							type: FilterConditionsUtils.type({
								filterConfigs,
								selectedColumnIndex: selectedIndex,
								selectedOperatorIndex: 0,
							}),
						};
					} else {
						return condition;
					}
				}),
			};

			updateFilterConditions(updatedFilterConditions);
		}
	};

	const handleChangeOperator = (event: SelectChangeEvent, rowIndex: number) => {
		if (filterConfigs) {
			const updatedFilterConditions = {
				...filterConditions,
				conditions: filterConditions.conditions.map((condition, index) => {
					if (index === rowIndex) {
						const selectedColumnIndex = filterConfigs.findIndex(
							(config) => config.fieldKey === condition.columnValue.fieldKey
						);

						const selectedOperatorIndex = condition.operatorOptions.findIndex(
							(option) => option.value === event.target.value
						);

						return {
							...condition,
							operatorValue: FilterConditionsUtils.value.operatorValue({
								filterConfigs,
								selectedColumnIndex,
								selectedOperatorIndex,
							}),
							value: FilterConditionsUtils.value.queryValue({
								filterConfigs,
								selectedColumnIndex,
								selectedOperatorIndex,
							}),
							type: FilterConditionsUtils.type({
								filterConfigs,
								selectedColumnIndex,
								selectedOperatorIndex,
							}),
						};
					} else {
						return condition;
					}
				}),
			};
			console.error(updatedFilterConditions);

			updateFilterConditions(updatedFilterConditions);
		}
	};

	return (
		<>
			{Array.from({ length: filterConditions.conditions.length }, (_, index) => (
				<div key={index} className="w-full flex">
					<div className="w-1/12">
						<FormControl sx={{ display: 'flex', flexGrow: 1 }}>
							<FormLabel>&nbsp;</FormLabel>
							<IconButton onClick={() => handleCancelSearch(index)}>
								<ClearIcon />
							</IconButton>
						</FormControl>
					</div>
					<div className="w-2/12">
						{index === 0 && (
							<FormControl sx={{ display: 'flex', flexGrow: 1 }}>
								<FormLabel>&nbsp;</FormLabel>
							</FormControl>
						)}
						{index === 1 && (
							<FormControl variant="standard" sx={{ display: 'flex', flexGrow: 1 }}>
								<FormLabel id={`logic_label_${index}`}>&nbsp;</FormLabel>
								<Select
									id={`logic_selector_${index}`}
									label=""
									labelId={`logic_label_${index}`}
									value={filterConditions.logic}
									onChange={handleChangeLogic}
								>
									<MenuItem value="and">{'AND'}</MenuItem>
									<MenuItem value="or">{'OR'}</MenuItem>
								</Select>
							</FormControl>
						)}
						{index !== 0 && index !== 1 && (
							<FormControl variant="standard" sx={{ display: 'flex', flexGrow: 1 }}>
								<FormLabel id={`logic_label_${index}`}>&nbsp;</FormLabel>
								<Select
									id={`logic_selector_${index}`}
									label=""
									labelId={`logic_label_${index}`}
									disabled={true}
									value={filterConditions.logic}
									onChange={handleChangeLogic}
								>
									<MenuItem value="and">{'AND'}</MenuItem>
									<MenuItem value="or">{'OR'}</MenuItem>
								</Select>
							</FormControl>
						)}
					</div>
					<div className="w-3/12">
						<FormControl variant="standard" sx={{ display: 'flex', flexGrow: 1 }}>
							<FormLabel id={`column_label_${index}`}>Column</FormLabel>
							<Select
								id={`column_selector_${index}`}
								label=""
								labelId={`column_label_${index}`}
								value={filterConditions.conditions[index].columnValue.fieldKey}
								onChange={(event) => handleChangeColumn(event, index)}
							>
								{filterConditions.conditions[index].columnOptions.map((option, optionIndex) => (
									<MenuItem key={optionIndex} value={option.fieldKey}>
										{option.fieldLabel}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="w-3/12">
						<FormControl variant="standard" sx={{ display: 'flex', flexGrow: 1 }}>
							<FormLabel id={`operator_label_${index}`}>Operator</FormLabel>
							<Select
								id={`operator_selector_${index}`}
								label=""
								labelId={`operator_label_${index}`}
								value={filterConditions.conditions[index].operatorValue.value}
								onChange={(event) => handleChangeOperator(event, index)}
							>
								{filterConditions.conditions[index].operatorOptions.map((option, optionIndex) => (
									<MenuItem key={optionIndex} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="w-3/12">
						<FormControl variant="standard" sx={{ display: 'flex', flexGrow: 1 }}>
							<FormLabel id={`value_label_${index}`}>Value</FormLabel>
							<Value rowIndex={index} />
						</FormControl>
					</div>
				</div>
			))}
		</>
	);
};

export default Conditions;
