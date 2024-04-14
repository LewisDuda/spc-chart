import { operatorOption } from '@/models/filterConfig';

const DefaultString: operatorOption[] = [
	{
		value: 'contains',
		label: 'contains',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item).toString().trim().includes(queryValue);
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey].toString().trim().includes(queryValue);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'equals',
		label: 'equals',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item).toString().trim() === queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey].toString().trim() === queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'starts with',
		label: 'starts with',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item).toString().trim().startsWith(queryValue);
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey].toString().trim().startsWith(queryValue);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'ends with',
		label: 'ends with',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item).toString().trim().endsWith(queryValue);
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey].toString().trim().endsWith(queryValue);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is empty',
		label: 'is empty',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item).toString().trim().length === 0;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey].toString().trim().length === 0;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is not empty',
		label: 'is not empty',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item).toString().trim().length !== 0;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey].toString().trim().length !== 0;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
];

const DefaultSelect: operatorOption[] = [
	{
		value: 'is',
		label: 'is',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item).toString().trim() === queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey].toString().trim() === queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is not',
		label: 'is not',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item).toString().trim() !== queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey].toString().trim() !== queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
];

const DefaultNumber: operatorOption[] = [
	{
		value: '=',
		label: '=',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) === queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] === queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: '!=',
		label: '!=',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) !== queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] !== queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: '>',
		label: '>',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) > queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] > queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: '>=',
		label: '>=',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) >= queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] >= queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: '<',
		label: '<',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) < queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] < queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: '<=',
		label: '<=',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) <= queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] <= queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is empty',
		label: 'is empty',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return isNaN(customItemValue(item));
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return isNaN(item[fieldKey]);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is not empty',
		label: 'is not empty',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return !isNaN(customItemValue(item));
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return !isNaN(item[fieldKey]);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
];

const DefaultDate: operatorOption[] = [
	{
		value: 'is',
		label: 'is',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) === queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] === queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is not',
		label: 'is not',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) !== queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] !== queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is after',
		label: 'is after',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) > queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] > queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is on or after',
		label: 'is on or after',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) >= queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] >= queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is before',
		label: 'is before',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) < queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] < queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is on or before',
		label: 'is on or before',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) <= queryValue;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] <= queryValue;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is empty',
		label: 'is empty',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return isNaN(customItemValue(item));
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return isNaN(item[fieldKey]);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is not empty',
		label: 'is not empty',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return !isNaN(customItemValue(item));
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return !isNaN(item[fieldKey]);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
];

const DefaultDateTime: operatorOption[] = [
	{
		value: 'is',
		label: 'is',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) === queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] === queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is',
		label: 'is not',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) !== queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] !== queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is after',
		label: 'is after',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) > queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] > queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is on or after',
		label: 'is on or after',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) >= queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] >= queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is before',
		label: 'is before',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) < queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] < queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is on or before',
		label: 'is on or before',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return customItemValue(item) <= queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return item[fieldKey] <= queryValue / 1000;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is empty',
		label: 'is empty',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return isNaN(customItemValue(item));
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return isNaN(item[fieldKey]);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is not empty',
		label: 'is not empty',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						return !isNaN(customItemValue(item));
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						return !isNaN(item[fieldKey]);
					})
					.map((item) => item[mainKey]);
			}
		},
	},
];

const DefaultTag: operatorOption[] = [
	{
		value: 'is',
		label: 'is',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => {
						const sortedItems = customItemValue(item).sort();
						const sortedQueryValue = queryValue.sort();

						for (let i = 0; i < sortedItems.length; i++) {
							if (sortedItems[i] !== sortedQueryValue[i]) return;
						}

						return item;
					})
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => {
						const sortedItems = item[fieldKey];
						const sortedQueryValue = queryValue.sort();

						for (let i = 0; i < sortedItems.length; i++) {
							if (sortedItems[i] !== sortedQueryValue[i]) return;
						}

						return item;
					})
					.map((item) => item[mainKey]);
			}
		},
	},
	{
		value: 'is any of',
		label: 'is any of',
		func: (props) => {
			const { fieldKey, customItemValue, queryValue, itemsArray, mainKey } = props;
			if (customItemValue) {
				return itemsArray
					.filter((item) => queryValue.some((el: any) => customItemValue(item).includes(el)))
					.map((item) => item[mainKey]);
			} else {
				return itemsArray
					.filter((item) => queryValue.some((el: any) => item[fieldKey].includes(el)))
					.map((item) => item[mainKey]);
			}
		},
	},
];

const FilterDefaultOperators = {
	string: DefaultString,
	select: DefaultSelect,
	number: DefaultNumber,
	date: DefaultDate,
	dateTime: DefaultDateTime,
	tag: DefaultTag,
};

export default FilterDefaultOperators;
