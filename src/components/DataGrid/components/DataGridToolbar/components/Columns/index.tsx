import React, { useEffect, useState } from 'react';

import { TABLE_CONFIG } from '@/models/tableConfig';

import { Divider, TextField, Checkbox, Button } from '@mui/material';
import { useDataGridContext } from '@/context/DataGridProvider';

const Columns = () => {
	const { tableConfigs, tableConfigsIsShow, setTableConfigIsShow: updateTableConfigsIsShow } = useDataGridContext();

	const [searchColumns, setSearchColumns] = useState('');
	const [isShowAll, setIsShowAll] = useState<boolean>(false);
	const [isInitialShow, setIsInitialShow] = useState(true);

	const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchColumns(event.target.value);
	};

	const handleSwitch = (updateConfig: string, checked: boolean) => {
		let updateConfigs = tableConfigsIsShow;

		if (checked) {
			updateConfigs = [...tableConfigsIsShow, updateConfig];
		} else {
			updateConfigs = tableConfigsIsShow.filter((fieldKey) => fieldKey !== updateConfig);
		}
		const isInitialShow = handleCheckIsInitial(updateConfigs);
		if (isInitialShow) {
			setIsInitialShow(true);
		} else {
			const isShowAll = handleCheckIsShowAll(updateConfigs);
			setIsShowAll(isShowAll);
			setIsInitialShow(false);
		}
		updateTableConfigsIsShow(updateConfigs);
	};

	const handleSwitchAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		let updateConfigs = tableConfigsIsShow;

		if (event.target.checked) {
			updateConfigs = tableConfigs.map((config) => config.fieldKey);
		} else {
			updateConfigs = tableConfigs.reduce((acc: string[], config: TABLE_CONFIG) => {
				if (config.disableSwitch) {
					acc.push(config.fieldKey);
				}
				return acc;
			}, []);
		}
		setIsShowAll(event.target.checked);
		const isInitialShow = handleCheckIsInitial(updateConfigs);
		setIsInitialShow(isInitialShow);
		updateTableConfigsIsShow(updateConfigs);
	};

	const handleReset = () => {
		let updateConfigs = [];
		for (let config of tableConfigs) {
			if (config.isShow) {
				updateConfigs.push(config.fieldKey);
			}
		}
		updateTableConfigsIsShow(updateConfigs);
		setIsInitialShow(true);
	};

	const handleCheckIsInitial = (configsIsShow: string[]) => {
		const filteredShowConfigs = tableConfigs.filter((config) => config.isShow).map((config) => config.fieldKey);

		return (
			configsIsShow.length === filteredShowConfigs.length &&
			configsIsShow.every((key) => filteredShowConfigs.includes(key))
		);
	};

	const handleCheckIsShowAll = (configsIsShow: string[]) => {
		return tableConfigs.every((config) => configsIsShow.includes(config.fieldKey));
	};

	useEffect(() => {
		const isInitialShow = handleCheckIsInitial(tableConfigsIsShow);
		const isShowAll = handleCheckIsShowAll(tableConfigsIsShow);
		setIsInitialShow(isInitialShow);
		setIsShowAll(isShowAll);
	}, []);

	return (
		<div className="flex flex-col text-black font-inter">
			<div className="flex flex-col gap-1 p-2">
				<TextField label="Search" variant="standard" value={searchColumns} onChange={onSearchTextChange} />
			</div>
			<div className="flex flex-col justify-start gap-2 py-2 px-2">
				{tableConfigs
					.filter(
						(config) =>
							searchColumns === '' ||
							config.fieldValue.toLocaleLowerCase().includes(searchColumns.toLocaleLowerCase())
					)
					.map((config, index) => (
						<div key={index} className="flex items-center gap">
							<Checkbox
								id={`column_${index}`}
								disabled={config.disableSwitch}
								checked={tableConfigsIsShow.includes(config.fieldKey)}
								onChange={(event, checked) => handleSwitch(config.fieldKey, checked)}
							/>
							<label
								className={`cursor-pointer ${config.disableSwitch ? 'opacity-45' : ''} `}
								htmlFor={`${`column_${index}`}`}
							>
								{config.fieldValue}
							</label>
						</div>
					))}
			</div>
			<Divider />
			<div className="flex items-center gap-12 py-2 px-2">
				<div className="flex items-center">
					<Checkbox
						id="switch_all"
						checked={isShowAll}
						indeterminate={isInitialShow}
						onChange={handleSwitchAll}
					/>
					<label className="cursor-pointer" htmlFor={'switch_all'}>
						Show/Hide All
					</label>
				</div>
				<Button disabled={isInitialShow} onClick={handleReset} className="btn-submit btn-small-size">
					Reset
				</Button>
			</div>
		</div>
	);
};

export default Columns;

const arr1 = [
	{
		id: 1,
		isShow: true,
	},
	{
		id: 2,
		isShow: true,
	},
	{
		id: 3,
		isShow: false,
	},
	{
		id: 4,
		isShow: true,
	},
];

const arr2 = [1, 2];
