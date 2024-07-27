import { ReactNode } from 'react';

export interface TABLE_CONFIG {
	fieldKey: string;
	fieldValue: string;
	fieldContentSetting?: (item: any) => string | ReactNode;
	sort: (a: any, b: any) => number;
	maxWidth?: number;
	isShow: boolean;
	disableSwitch?: boolean;
	[key: string]: any;
}
