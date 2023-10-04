import React from 'react';
import { Link } from 'reactkit/link';

import { Box, Typography } from '@mui/material';

import arrowRight from 'assets/svg/arrowRight.svg';

import { theme } from 'theme/theme';

interface Props {
	userPhoto: string;
	userName: string;
}

export const ProfileCard = ({ userName, userPhoto }: Props) => {
	return (
		<Link to={'profile'} key={'profile'} sx={{ display: 'flex', alignItems: 'center' }}>
			<Box component={'img'} src={userPhoto} sx={{ borderRadius: '50%', mr: 2, height: '3.5rem' }} />
			<Typography
				sx={{
					position: 'relative',
					fontSize: theme.tg_theme.fontSize.title2,
					'&::after': {
						content: `url(${arrowRight})`,
						position: 'absolute',
						top: '2px',
						right: '-22px',
					},
				}}>
				{userName}
			</Typography>
		</Link>
	);
};
