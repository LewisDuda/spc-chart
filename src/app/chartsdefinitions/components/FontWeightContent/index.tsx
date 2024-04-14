import React from 'react';
import { DisplayWithArrow } from '@/components';

interface FontWeightContentProps {
	item: any;
}

const FontWeightContent = (props: FontWeightContentProps) => {
	const { item } = props;

	return (
		<div className="w-full flex flex-wrap items-center justify-start gap-y-6">
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Chart Title: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['chartTitleWeight']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Y Title: </div>
				</DisplayWithArrow>
				<div className=" text-base">{item['yTitleWeight']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">X Label: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['xLabelWeight']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">X Sub Label: </div>
				</DisplayWithArrow>
				<div className="text-base">{item['xSubLabelWeight']}</div>
			</div>
			<div className="flex w-1/2">
				<DisplayWithArrow>
					<div className="text-base pr-4">Y Label: </div>
				</DisplayWithArrow>
				<div className=" text-base">{item['yLabelWeight']}</div>
			</div>
		</div>
	);
};

export default FontWeightContent;
