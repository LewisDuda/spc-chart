export interface FILTER_CONFIG {
	fieldKey: string;
	fieldLabel: string;
	customItemValue?: (item: any) => any;
	type: string;
	operatorOptions: string | operatorOption[];
	valueOptions?: normalOption[];
	unitOptions?: normalOption[];
}

export type operatorOption = {
	value: string;
	label: string;
	func: (props: filterFunctionProps) => string | number[];
};

export interface filterFunctionProps {
	fieldKey: string | number;
	customItemValue?: (item: any) => any;
	queryValue: any;
	itemsArray: any[];
	mainKey: string | number;
}

export type normalOption = {
	value: string;
	label: string;
};
