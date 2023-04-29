import React from 'react';
import { Typography } from '@mui/material';
import { theme } from '../../theme';

interface WorkingStatusProps {
	workingTime: string;
	workingStatus: string;
}

export const WorkingStatus = ({ workingStatus, workingTime }: WorkingStatusProps) => {
	return (
		<>
			<Typography
				sx={{
					position: 'relative',
					width: 'fit-content',

					'&::after': {
						content: '""',
						width: '8px',
						height: '8px',
						right: '-16px',
						bottom: '6px',
						border: 'none',
						display: 'block',
						background: workingStatus === 'Opened' ? theme.palette.success.main : theme.palette.error.main,
						borderRadius: '50%',
						position: 'absolute',
					},
				}}
				component="p"
				variant={'body2'}>
				{workingStatus}
			</Typography>
			<Typography
				sx={{
					m: 0,
					display: 'flex',
					fontWeight: '600',
					alignItems: 'center',
					justifyContent: 'center',
					textTransform: 'capitalize',
				}}
				component="p"
				variant={'body2'}>
				{workingTime}
			</Typography>
		</>
	);
};
