'use client';

import React, { FC, ReactNode } from 'react';
import { DETAILS } from '@/models/details';
import { AttributesContent, FontSizeContent, FontWeightContent, DecorateContent } from '../../components';

interface DetailsProps extends DETAILS {
	item: any;
}

const Details: FC<DetailsProps> = (props): ReactNode => {
	const { item } = props;

	return (
		<div className="w-full flex flex-wrap gap-10 p-8">
			<div className="w-full flex flex-col gap-6">
				<p className="uppercase	text-lg">Attributes</p>
				<div className="pl-4">
					<AttributesContent item={item} />
				</div>
			</div>
			<div className="w-full flex flex-col gap-6">
				<p className="uppercase	text-lg">Font Size</p>
				<div className="pl-4">
					<FontSizeContent item={item} />
				</div>
			</div>
			<div className="w-full flex flex-col gap-6">
				<p className="uppercase	text-lg">Font Weight</p>
				<div className="pl-4">
					<FontWeightContent item={item} />
				</div>
			</div>
			<div className="w-full flex flex-col gap-6">
				<p className="uppercase	text-lg">Decorate</p>
				<div className="pl-4">
					<DecorateContent item={item} />
				</div>
			</div>
		</div>
	);
};

export default Details;
