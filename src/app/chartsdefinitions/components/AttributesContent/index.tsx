import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { DisplayWithArrow } from '@/components';

interface AttributesContentProps {
	item: any;
}

const AttributesContent = (props: AttributesContentProps) => {
	const { item } = props;

	return (
		<div className="w-full flex flex-wrap items-center justify-start gap-y-6">
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Max: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['max']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Min: </div>
				</DisplayWithArrow>
				<div className=" text-base">{item['min']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Max Spec: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['maxSpec']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Min Spec: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['minSpec']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Target: </div>
				</DisplayWithArrow>
				<div className=" text-base">{item['target']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Ticks Steps: </div>
				</DisplayWithArrow>
				<div className=" text-base">{item['ticksSteps']}</div>
			</div>
			<div className="flex w-full">
				<DisplayWithArrow direction={item['breakLine'].length === 0 ? 'right' : 'down'}>
					<div className="text-base pr-4">Break Line: </div>
				</DisplayWithArrow>
			</div>
			{item['breakLine'].length !== 0 && (
				<div className="flex w-full">
					<div className="text-base pl-6">{item['breakLine'].join(', ')}</div>
				</div>
			)}
			<div className="flex w-full">
				<FormControlLabel control={<Switch checked={item['isShowLegend']} />} label="Show Legend" disabled />
			</div>
		</div>
	);
};

export default AttributesContent;
