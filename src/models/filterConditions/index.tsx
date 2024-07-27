import { FILTER_CONFIG, operatorOption, normalOption } from '../filterConfig';

export interface FILTER_CONDITIONS {
	logic: 'and' | 'or' | string;
	conditions: condition[];
}

interface condition {
	columnOptions: FILTER_CONFIG[];
	operatorOptions: operatorOption[];
	valueOptions: normalOption[];
	unitOptions: normalOption[];
	type: number;
	columnValue: FILTER_CONFIG;
	operatorValue: operatorOption;
	value: any;
}
