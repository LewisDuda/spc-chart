import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { DisplayWithArrow } from '@/components';

interface FontSizeContentProps {
	item: any;
}

const FontSizeContent = (props: FontSizeContentProps) => {
	const { item } = props;

	return (
		<div className="w-full flex flex-wrap items-center justify-start gap-y-6">
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Chart Title: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['chartTitleSize']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Y Title: </div>
				</DisplayWithArrow>
				<div className=" text-base">{item['yTitleSize']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">X Label: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['xLabelSize']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">X Sub Label: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['xSubLabelSize']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Y Label: </div>
				</DisplayWithArrow>
				<div className=" text-base">{item['yLabelSize']}</div>
			</div>
		</div>
	);
};

export default FontSizeContent;
