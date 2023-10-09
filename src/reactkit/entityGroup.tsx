import React, { ReactNode } from 'react';
import { HintText } from 'reactkit/hintText';

import { Box } from '@mui/material';

import { theme } from 'theme/theme';

interface Props {
	children: ReactNode[];
}

export const EntityGroup = ({ children }: Props) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				borderRadius: theme.tg_theme.borderRadius.base,
			}}>
			{children.map(node => {
				return (
					<Box sx={{ display: 'flex' }}>
						<Box
							sx={{
								p: 1,
								height: '44px',
								display: 'flex',
								alignItems: 'center',
								background: theme.tg_theme.palette.bg_color,
								borderTopLeftRadius: theme.tg_theme.borderRadius.base,

								'&:first-child': {
									borderTopLeftRadius: theme.tg_theme.borderRadius.base,
								},
								'&:last-child': {
									borderBottomLeftRadius: theme.tg_theme.borderRadius.base,
								},
							}}>
							<HintText text={'Name'} />
						</Box>
						<Box
							sx={{
								width: '100%',
								pl: 2,
								'&:first-child': {
									borderTopRightRadius: theme.tg_theme.borderRadius.base,
								},
								'&::after': {
									content: "''",
									display: 'block',
								},
								'&:last-child': {
									borderBottomRightRadius: theme.tg_theme.borderRadius.base,
								},
							}}>
							{node}
						</Box>
					</Box>
				);
			})}
		</Box>
	);
};
