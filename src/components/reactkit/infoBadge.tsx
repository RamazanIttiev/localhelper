import React from 'react';
import { Box, Icon, useTheme } from '@mui/material';
import { mapInfoBadges } from '../../utils/mappers';

interface InfoBadgeProps {
	icon: string;
	containerStyles?: React.CSSProperties;
	iconStyles?: React.CSSProperties;
}
export const InfoBadge = ({ containerStyles, iconStyles, icon }: InfoBadgeProps) => {
	const theme = useTheme();

	return (
		<Box sx={containerStyles}>
			<Icon
				key={icon}
				sx={{
					display: 'flex',
					width: '1.5rem',
					height: '1.5rem',
					fontSize: '1rem',
					alignItems: 'center',
					borderRadius: '0.5rem',
					justifyContent: 'center',
					background: theme.palette.background.default,
					...iconStyles,
				}}
				color={'info'}>
				{mapInfoBadges(icon)}
			</Icon>
		</Box>
	);
};
