import { Box, Typography } from '@mui/material';

import { ToReceiveState } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model.ts';

import { theme } from 'ui/theme/theme.ts';

interface Props {
	state: ToReceiveState;
}

export const ToReceiveBox = ({ state }: Props) => {
	return (
		<Box sx={{ background: theme.tg_theme.palette.bg_color, p: 2, position: 'relative' }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ mr: 1, lineHeight: 1 }}>{state.icon}</Box>
				<Typography sx={{ color: theme.tg_theme.palette.hint_color, fontSize: theme.tg_theme.fontSize.info }}>
					You will receive
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					m: '24px 0',
				}}>
				<Typography
					sx={{
						overflow: 'hidden',
						color: theme.tg_theme.palette.text_color,
						fontSize: theme.tg_theme.fontSize.extraLargeTitle,
					}}>
					{state.value}
				</Typography>
				<Typography
					sx={{
						color: theme.tg_theme.palette.hint_color,
						fontWeight: theme.tg_theme.fontWeight.bold,
						fontSize: theme.tg_theme.fontSize.largeTitle,
					}}>
					{state.currency}
				</Typography>
			</Box>
		</Box>
	);
};
