import { FILTER_CONFIG, operatorOption, filterFunctionProps } from '@/models/filterConfig';
import { FILTER_CONDITIONS } from '@/models/filterConditions';
import { FilterDefaultOperators } from '@/utils';

const initColumnOptions = (filterConfigs: FILTER_CONFIG[]) => {
	return filterConfigs;
};

const initOperatorOptions = (arg: { filterConfigs: FILTER_CONFIG[]; selectedIndex: number }) => {
	const { filterConfigs, selectedIndex } = arg;
	const { type, operatorOptions } = filterConfigs[selectedIndex];
	const defaultOptions: { [key: string]: any } = {
		string: FilterDefaultOperators.string,
		select: FilterDefaultOperators.select,
		number: FilterDefaultOperators.number,
		date: FilterDefaultOperators.date,
		dateTime: FilterDefaultOperators.dateTime,
		tag: FilterDefaultOperators.tag,
	};

	if (!(type in defaultOptions)) return FilterDefaultOperators.string;
	if (operatorOptions === 'default') return defaultOptions[type];
	return typeof operatorOptions !== 'string' ? operatorOptions : [];
};

const initValueOptions = (arg: { filterConfigs: FILTER_CONFIG[]; selectedIndex: number }) => {
	const { filterConfigs, selectedIndex } = arg;
	const { type, valueOptions } = filterConfigs[selectedIndex];

	switch (type) {
		case 'select':
		case 'selectWithSearch':
			return valueOptions ? valueOptions : [];
		default:
			return valueOptions ? valueOptions : [];
	}
};

const initUnitOptions = (arg: { filterConfigs: FILTER_CONFIG[]; selectedIndex: number }) => {
	const { filterConfigs, selectedIndex } = arg;
	const { type, unitOptions = [] } = filterConfigs[selectedIndex];

	switch (type) {
		case 'numberWithUnit':
			return unitOptions ? unitOptions : [];
		default:
			return unitOptions ? unitOptions : [];
	}
};

const initColumnValue = (arg: { filterConfigs: FILTER_CONFIG[]; selectedIndex: number }) => {
	const { filterConfigs, selectedIndex } = arg;
	return filterConfigs[selectedIndex];
};

const initOperatorValue = (arg: {
	filterConfigs: FILTER_CONFIG[];
	selectedColumnIndex: number;
	selectedOperatorIndex: number;
}) => {
	const { filterConfigs, selectedColumnIndex, selectedOperatorIndex } = arg;
	const operatorOptions = FilterConditionsUtils.options.operators({
		filterConfigs,
		selectedIndex: selectedColumnIndex,
	});

	return operatorOptions[selectedOperatorIndex];
};

const initType = (arg: {
	filterConfigs: FILTER_CONFIG[];
	selectedColumnIndex: number;
	selectedOperatorIndex: number;
}) => {
	const { filterConfigs, selectedColumnIndex, selectedOperatorIndex } = arg;
	let { type, operatorOptions } = filterConfigs[selectedColumnIndex];
	operatorOptions = FilterConditionsUtils.options.operators({ filterConfigs, selectedIndex: selectedColumnIndex });
	const operatorValue = operatorOptions[selectedOperatorIndex] as operatorOption;

	const typeLookup: { [key: string]: any } = {
		string: -1,
		select: 1,
		number: 2,
		date: 3,
		dateTime: 4,
		tag: 5,
		selectWithSearch: 6,
		numberWithUnit: 7,
	};

	if (/(is empty|is not empty|emptyValue_\d+)/.test(operatorValue.value)) return 0;
	if (type in typeLookup) return typeLookup[type];
	return -1;
};

const initQueryValue = (arg: {
	filterConfigs: FILTER_CONFIG[];
	selectedColumnIndex: number;
	selectedOperatorIndex: number;
	queryValue?: any;
}) => {
	const { filterConfigs, selectedColumnIndex, selectedOperatorIndex, queryValue } = arg;
	const type = FilterConditionsUtils.type({ filterConfigs, selectedColumnIndex, selectedOperatorIndex });

	const valueLookup: { [key: string]: any } = {
		5: [],
		6: { originValue: '', autoCompleteValue: '' },
		7: { inputValue: '', unitValue: '' },
	};

	if (queryValue) return queryValue;

	return valueLookup[type] ? valueLookup[type] : '';
};

const handleValidConditions = (filterConditions: FILTER_CONDITIONS) => {
	return filterConditions.conditions.filter((condition) => {
		const { operatorValue, type, value } = condition;
		if (/(is empty|is not empty|emptyValue_d+)/.test(operatorValue.value)) {
			return condition;
		}

		switch (type) {
			case -1:
			case 2:
			case 3:
			case 4:
			case 5:
				return value.length !== 0;
			case 1:
				return value.length !== 0 && value !== '_all';
			case 6:
				return value.originValue.length !== 0 && value.originValue !== '_all';
			case 7:
				return value.inputValue.length !== 0;
			default:
				return false;
		}
	});
};

const generateNewLine = (arg: {
	filterConditions: FILTER_CONDITIONS;
	filterConfigs: FILTER_CONFIG[];
	queryParams?: {
		[x: string]: any;
		column: string;
		value: string;
	};
}) => {
	const { filterConditions, filterConfigs, queryParams } = arg;

	let filterConditionsNewLines = filterConditions;

	if (queryParams) {
		queryParams.forEach((queryParam: { column: string; value: any }) => {
			const selectedFilterConfig = {
				filterConfigs,
				selectedIndex: filterConfigs.findIndex((config) => config.fieldKey === queryParam.column),
			};

			const columnOptions = FilterConditionsUtils.options.columns(filterConfigs);
			const operatorOptions = FilterConditionsUtils.options.operators(selectedFilterConfig);
			const valueOptions = FilterConditionsUtils.options.value(selectedFilterConfig);
			const unitOptions = FilterConditionsUtils.options.unit(selectedFilterConfig);
			const type = FilterConditionsUtils.type({
				filterConfigs: selectedFilterConfig.filterConfigs,
				selectedColumnIndex: selectedFilterConfig.selectedIndex,
				selectedOperatorIndex: 0,
			});
			const columnValue = FilterConditionsUtils.value.columnValue(selectedFilterConfig);
			const operatorValue = FilterConditionsUtils.value.operatorValue({
				filterConfigs: selectedFilterConfig.filterConfigs,
				selectedColumnIndex: selectedFilterConfig.selectedIndex,
				selectedOperatorIndex: 0,
			});
			const queryValue = FilterConditionsUtils.value.queryValue({
				filterConfigs: selectedFilterConfig.filterConfigs,
				selectedColumnIndex: selectedFilterConfig.selectedIndex,
				selectedOperatorIndex: 0,
				queryValue: queryParam.value,
			});

			const filterCondition = {
				columnOptions,
				operatorOptions,
				valueOptions,
				unitOptions,
				type,
				columnValue,
				operatorValue,
				value: queryValue,
			};

			filterConditionsNewLines.conditions.push(filterCondition);
		});
	} else {
		const selectedFilterConfig = {
			filterConfigs,
			selectedIndex: 0,
		};

		const columnOptions = FilterConditionsUtils.options.columns(filterConfigs);
		const operatorOptions = FilterConditionsUtils.options.operators(selectedFilterConfig);
		const valueOptions = FilterConditionsUtils.options.value(selectedFilterConfig);
		const unitOptions = FilterConditionsUtils.options.unit(selectedFilterConfig);
		const type = FilterConditionsUtils.type({
			filterConfigs: selectedFilterConfig.filterConfigs,
			selectedColumnIndex: selectedFilterConfig.selectedIndex,
			selectedOperatorIndex: 0,
		});
		const columnValue = FilterConditionsUtils.value.columnValue(selectedFilterConfig);
		const operatorValue = FilterConditionsUtils.value.operatorValue({
			filterConfigs: selectedFilterConfig.filterConfigs,
			selectedColumnIndex: selectedFilterConfig.selectedIndex,
			selectedOperatorIndex: 0,
		});
		const queryValue = FilterConditionsUtils.value.queryValue({
			filterConfigs: selectedFilterConfig.filterConfigs,
			selectedColumnIndex: selectedFilterConfig.selectedIndex,
			selectedOperatorIndex: 0,
		});

		const filterCondition = {
			columnOptions,
			operatorOptions,
			valueOptions,
			unitOptions,
			type,
			columnValue,
			operatorValue,
			value: queryValue,
		};

		filterConditionsNewLines.conditions.push(filterCondition);
	}

	return filterConditionsNewLines;
};

const handleBasicFilter = (filterConditions: FILTER_CONDITIONS, items: any[], mainKey: string | number) => {
	const validConditions = FilterConditionsUtils.handleValidConditions(filterConditions);
	const itemsOfMainKey = items.map((item) => item[mainKey]);
	if (validConditions.length === 0) {
		return [itemsOfMainKey, itemsOfMainKey];
	} else {
		return validConditions.map((condition) => {
			const FilterFunction = condition.operatorValue.func;
			const column = condition.columnValue.fieldKey;
			const customItemValue = condition.columnValue.customItemValue;
			const type = condition.type;
			const queryValue = condition.value;

			let FilterFunctionProps: filterFunctionProps = {
				fieldKey: column,
				customItemValue: customItemValue,
				queryValue,
				itemsArray: items,
				mainKey,
			};

			switch (type) {
				case -1:
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 7:
					return FilterFunction(FilterFunctionProps);
				case 6:
					FilterFunctionProps.queryValue = queryValue.originValue;
					return FilterFunction(FilterFunctionProps);
			}
		});
	}
};

const handleGetIntersectionFilter = (items: any[]) => {
	if (items.length === 0) {
		return [];
	} else {
		return items.reduce((intersection, currentArray) => {
			return intersection.filter((item: any[]) =>
				currentArray.some((currentItem: any[]) => currentItem === item)
			);
		});
	}
};

const handleGetUnionFilter = (items: any[]) => {
	if (items.length === 0) {
		return [];
	} else {
		return items.reduce((union, currentArray) => {
			return union.concat(
				currentArray.filter((currentItem: any[]) => union.every((item: any[]) => item !== currentItem))
			);
		});
	}
};

const FilterConditionsUtils = {
	options: {
		columns: initColumnOptions,
		operators: initOperatorOptions,
		value: initValueOptions,
		unit: initUnitOptions,
	},
	value: {
		columnValue: initColumnValue,
		operatorValue: initOperatorValue,
		queryValue: initQueryValue,
	},
	type: initType,
	handleValidConditions: handleValidConditions,
	generateNewLine: generateNewLine,
	handleBasicFilter: handleBasicFilter,
	handleGetIntersectionFilter: handleGetIntersectionFilter,
	handleGetUnionFilter: handleGetUnionFilter,
};

export default FilterConditionsUtils;
