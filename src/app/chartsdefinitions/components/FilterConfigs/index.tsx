import { FILTER_CONFIG } from '@/models/filterConfig';

const FilterConfigs: FILTER_CONFIG[] = [
	{
		fieldKey: 'name',
		fieldLabel: 'Name',
		type: 'string',
		customItemValue: (item) => `${item.toolName}_${item.chartName}`,
		operatorOptions: 'default',
	},
	{
		fieldKey: 'yAxialTitle',
		fieldLabel: 'Y Title',
		type: 'string',
		operatorOptions: 'default',
	},
	{
		fieldKey: 'maxSpec',
		fieldLabel: 'Max Spec',
		type: 'number',
		operatorOptions: 'default',
	},
	{
		fieldKey: 'minSpec',
		fieldLabel: 'Min Spec',
		type: 'number',
		operatorOptions: 'default',
	},
	{
		fieldKey: 'target',
		fieldLabel: 'Target',
		type: 'number',
		operatorOptions: 'default',
	},
];

export default FilterConfigs;
