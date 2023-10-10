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
				flexDirection: 'column',
			}}>
			{children.map(node => {
				return (
					<Box
						sx={{
							display: 'flex',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
							background: theme.tg_theme.palette.bg_color,

							'&:first-child': {
								borderTopLeftRadius: theme.tg_theme.borderRadius.base,
								borderTopRightRadius: theme.tg_theme.borderRadius.base,
							},
							'&:last-child': {
								borderBottomLeftRadius: theme.tg_theme.borderRadius.base,
								borderBottomRightRadius: theme.tg_theme.borderRadius.base,
							},
						}}>
						<Box
							sx={{
								p: 1,
								height: '44px',
								display: 'flex',
								alignItems: 'center',
								background: theme.tg_theme.palette.bg_color,
								borderRadius: 'inherit',
							}}>
							<HintText text={'Name'} />
						</Box>
						<Box
							sx={{
								width: '100%',
								pl: 2,
								borderRadius: 'inherit',
								// '&:first-child': {
								// 	borderTopRightRadius: theme.tg_theme.borderRadius.base,
								// },
								'&:first-child::after': {
									content: "''",
									display: 'block',
								},
								// '&:last-child': {
								// 	borderBottomRightRadius: theme.tg_theme.borderRadius.base,
								// },
							}}>
							{node}
						</Box>
					</Box>
				);
			})}
		</Box>
	);
};
