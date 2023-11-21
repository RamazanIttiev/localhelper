import React, { ReactNode } from 'react';

import { Box } from '@mui/material';

import { addOpacityToHexColor } from 'common/utils/service';

import { theme } from '../theme/theme';

import { HintText } from '../atoms/hintText';

interface EntityGroupChild {
	label: string;
	icon?: string;
	element: ReactNode;
}

interface Props {
	children: Array<EntityGroupChild | null>;
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
			{children.map((value, index) => {
				return (
					value && (
						<Box
							sx={{
								display: 'flex',
								width: '100%',
								height: '45px',
								pl: 1,
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
									display: 'flex',
									minWidth: '90px',
									alignItems: 'center',
									background: theme.tg_theme.palette.bg_color,
									borderRadius: 'inherit',
								}}>
								{value?.icon ? (
									<Box component="img" src={value?.icon} />
								) : (
									<HintText text={`${value?.label}`} />
								)}
							</Box>
							<Box
								id="entityElement"
								sx={{
									height: '100%',
									width: '100%',
									ml: 2,
									pr: 1,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'end',
									borderRadius: 'inherit',
									borderBottom:
										index === children.length - 1 ? 'none' : `0.5px solid ${delimiterColor}`,
								}}>
								{value?.element}
							</Box>
						</Box>
					)
				);
			})}
		</Box>
	);
};
