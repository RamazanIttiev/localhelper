import React from 'react';

import Box from '@mui/material/Box';

import { theme } from 'ui/theme/theme.ts';

interface Props {
	iconBadges: { url: string }[] | undefined;
}

export const IconBadges = ({ iconBadges }: Props) => {
	return (
		<Box sx={{ position: 'absolute', top: '0.3rem', left: '0.3rem', display: 'flex' }}>
			{iconBadges?.sort().map(({ url }) => {
				return (
					<Box
						component={'img'}
						src={url}
						key={url}
						sx={{
							margin: '0 2px',
							p: '4px',
							display: 'flex',
							width: '1.5rem',
							height: '1.5rem',
							fontSize: '1rem',
							alignItems: 'center',
							borderRadius: theme.tg_theme.borderRadius.actionButton,
							justifyContent: 'center',
							background: theme.palette.background.default,
						}}
						color={'info'}
					/>
				);
			})}
		</Box>
	);
};
