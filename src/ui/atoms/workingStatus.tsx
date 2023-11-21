import React from 'react';

import { Box, Typography } from '@mui/material';

import { theme } from '../theme/theme';

interface WorkingStatusProps {
	workingTime: string;
	workingStatus: string;
}

export const WorkingStatus = ({ workingStatus, workingTime }: WorkingStatusProps) => {
	return (
		<>
			<Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
				<Typography
					sx={{
						mr: 1,
						width: 'fit-content',
					}}
					component="p"
					variant={'body2'}>
					{workingStatus}
				</Typography>
				<Box
					sx={{
						width: '8px',
						height: '8px',
						border: 'none',
						display: 'block',
						borderRadius: '50%',
						position: 'relative',
						background: workingStatus === 'Opened' ? theme.palette.success.main : theme.palette.error.main,

						'&:after': {
							content: '""',
							width: '14px',
							height: '14px',
							display: 'block',
							borderRadius: '50%',
							background: workingStatus === 'Opened' ? '#00ff0d42' : '#ff000069',
							position: 'absolute',
							top: '-3px',
							left: '-3px',
						},
					}}
				/>
			</Box>

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
