import React from 'react';
import { Box, Icon, useTheme } from '@mui/material';

interface InfoBadgeProps {
	iterable: string[];
	containerStyles?: React.CSSProperties;
	iconStyles?: React.CSSProperties;
}
export const InfoBadge = ({ containerStyles, iconStyles, iterable }: InfoBadgeProps) => {
	const theme = useTheme();

	return (
		<Box sx={containerStyles}>
			{iterable.map(
				icon =>
					icon && (
						<Icon
							key={icon}
							sx={{
								...iconStyles,
								display: 'flex',
								width: '1.5rem',
								height: '1.5rem',
								fontSize: '1rem',
								alignItems: 'center',
								borderRadius: '0.5rem',
								justifyContent: 'center',
								background: theme.palette.background.default,
							}}
							color={'info'}>
							{icon}
						</Icon>
					),
			)}
		</Box>
	);
};
