'use client';

import { styled } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const TableProgress = styled(LinearProgress)({
	'& .MuiLinearProgress-bar': {
		animationDuration: '4s',
	},
});

export default TableProgress;
