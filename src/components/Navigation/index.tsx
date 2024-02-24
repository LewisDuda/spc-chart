'use client';

import React from 'react';
import ROUTES from '@/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@mui/material';
import { NAVIGATION_HEIGHT, NAVIGATION_WIDTH } from '@/const/layout';

const Navigation = () => {
	const pathName = usePathname();
	return (
		<div
			className="flex flex-col justify-center items-center gap-10 bg-secondary-background rounded-r-xl"
			style={{ height: NAVIGATION_HEIGHT, width: NAVIGATION_WIDTH }}
		>
			{ROUTES.map(({ path, title, icon }, index) => (
				<Link
					href={path}
					key={index}
					className={
						pathName === path
							? 'h-12 w-12 flex justify-center items-center rounded-full bg-primary-background text-white'
							: 'h-12 w-12 flex justify-center items-center rounded-full bg-gray text-primary-text hover:text-success-background'
					}
				>
					<Tooltip
						title={
							<div className="h-8 w-max flex items-center justify-center p-2 text-sm text-center">
								{title}
							</div>
						}
						placement="right"
						arrow
						PopperProps={{
							modifiers: [
								{
									name: 'offset',
									options: {
										offset: [0, 5],
									},
								},
							],
						}}
					>
						{icon()}
					</Tooltip>
				</Link>
			))}
		</div>
	);
};

export default Navigation;
