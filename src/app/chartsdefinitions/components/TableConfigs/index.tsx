import React from 'react';
import { TABLE_CONFIG } from '@/models/tableConfig';
import { EllipsisWithTooltip } from '@/components';

const TableConfigs: TABLE_CONFIG[] = [
	{
		fieldKey: 'name',
		fieldValue: 'Name',
		fieldContentSetting: (item: any) => {
			return (
				<EllipsisWithTooltip title={`${item.toolName}_${item.chartName}`}>
					<div className="w-24 truncate">{`${item.toolName}_${item.chartName}`}</div>
				</EllipsisWithTooltip>
			);
		},
		sort: (a: any, b: any) => {
			return `"${a.toolName}_${a.chartName}"`.localeCompare(`"${b.toolName}_${b.chartName}"`);
		},
		downloadSetting: (item: any) => {
			return `${item.toolName}_${item.chartName}`;
		},
		isShow: true,
		disableSwitch: true,
	},
	{
		fieldKey: 'yAxialTitle',
		fieldValue: 'Y Title',
		sort: (a: any, b: any) => {
			return a.yAxialTitle.localeCompare(b.yAxialTitle);
		},
		downloadSetting: (item: any) => {
			return item.yAxialTitle;
		},
		isShow: true,
	},
	{
		fieldKey: 'maxSpec',
		fieldValue: 'Max Spec',
		sort: (a: any, b: any) => {
			return a.maxSpec - b.maxSpec;
		},
		downloadSetting: (item: any) => {
			return item.maxSpec;
		},
		isShow: true,
	},
	{
		fieldKey: 'minSpec',
		fieldValue: 'Min Spec',
		sort: (a: any, b: any) => {
			return a.minSpec - b.minSpec;
		},
		downloadSetting: (item: any) => {
			return item.minSpec;
		},
		isShow: true,
	},
	{
		fieldKey: 'target',
		fieldValue: 'Target',
		sort: (a: any, b: any) => {
			return a.target - b.target;
		},
		downloadSetting: (item: any) => {
			return item.target;
		},
		isShow: true,
	},
];

export default TableConfigs;
