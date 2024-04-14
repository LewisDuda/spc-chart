'use client';

import React, { ReactElement, useState, useRef, useEffect, ReactNode } from 'react';
import { Tooltip } from '@mui/material';

interface EllipsisWithTooltipProps {
	children: ReactElement;
	title: ReactNode;
}

const EllipsisWithTooltip = ({ children, title }: EllipsisWithTooltipProps) => {
	const parentRef = useRef<HTMLDivElement>(null);
	const [isShowTitle, setIsShowTitle] = useState(false);

	useEffect(() => {
		const childElement = parentRef.current?.children[0];

		if (childElement) {
			setIsShowTitle(childElement.scrollWidth > childElement.clientWidth);
		}
	}, [children]);

	return (
		<Tooltip title={isShowTitle ? title : null}>
			<div ref={parentRef}>{children}</div>
		</Tooltip>
	);
};

export default EllipsisWithTooltip;
