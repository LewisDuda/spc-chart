import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { DisplayWithArrow } from '@/components';

interface DecorateContentProps {
	item: any;
}

const DecorateContent = (props: DecorateContentProps) => {
	const { item } = props;

	return (
		<div className="w-full flex flex-wrap items-center justify-start gap-y-6">
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Line-Width: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['lineWidth']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Point-Radius: </div>
				</DisplayWithArrow>
				<div className=" text-base">{item['pointRadius']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Line-Radian: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['lineRadian']}</div>
			</div>
			<div className="flex w-full">
				<DisplayWithArrow>
					<div className="text-base pr-4">X Sub Label Angle: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['xSubLabelAngle']}</div>
			</div>
			<div className="flex w-full">
				<FormControlLabel
					control={<Switch checked={item['isShowXSubLabel']} />}
					label="Show X Sub Label"
					disabled
				/>
			</div>
		</div>
	);
};

export default DecorateContent;
