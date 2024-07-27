'use client';

import React from 'react';
import { Pixelify_Sans } from 'next/font/google';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person4Icon from '@mui/icons-material/Person4';
import { CAPTAIN_HEIGHT, CAPTAIN_WIDTH } from '@/const/layout';

const pixelify = Pixelify_Sans({ subsets: ['latin'] });

const Captain = () => {
	return (
		<header
			className={`flex items-center justify-between text-3xl p-4 ${pixelify.className}`}
			style={{ height: CAPTAIN_HEIGHT, width: CAPTAIN_WIDTH }}
		>
			<div className="cursor-pointer uppercase">SPC Chart</div>
			<div className="h-max flex gap-3">
				<IconButton className="h-max w-max text-4xl">
					<NotificationsIcon className="text-4xl" />
				</IconButton>
				<IconButton className="h-max w-max">
					<Person4Icon className="text-4xl" />
				</IconButton>
			</div>
		</header>
	);
};

export default Captain;
