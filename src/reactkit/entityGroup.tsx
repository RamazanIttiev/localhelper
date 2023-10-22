import React, { ReactNode } from 'react';
import { HintText } from 'reactkit/hintText';

import { Box } from '@mui/material';

import { addOpacityToHexColor } from 'utils/service';

import { theme } from 'theme/theme';

interface Props {
	children: {
		label: string;
		icon?: string;
		element: ReactNode;
	}[];
}

export const EntityGroup = ({ children }: Props) => {
	const delimiterColor = addOpacityToHexColor(theme.tg_theme.palette.bg_color, 0.1);

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				borderRadius: theme.tg_theme.borderRadius.base,
				flexDirection: 'column',
			}}>
			{children.map(({ label, icon, element }, index) => {
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
								minWidth: '84px',
								alignItems: 'center',
								background: theme.tg_theme.palette.bg_color,
								borderRadius: 'inherit',
							}}>
							{icon ? <Box component="img" src={icon} /> : <HintText text={label} />}
						</Box>
						<Box
							id="entityElement"
							sx={{
								width: '100%',
								ml: 2,
								borderRadius: 'inherit',
								borderBottom: index === children.length - 1 ? 'none' : `0.5px solid ${delimiterColor}`,
							}}>
							{element}
						</Box>
					</Box>
				);
			})}
		</Box>
	);
};
