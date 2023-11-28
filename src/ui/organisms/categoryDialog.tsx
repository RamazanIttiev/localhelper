import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import React, { useCallback } from 'react';

import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { isUserAgentTelegram } from 'common/utils/deviceInfo.ts';
import { openTelegram } from 'common/utils/service.ts';

import { handleOrder } from 'actions/global-actions.ts';

import { theme } from 'ui/theme/theme.ts';

import { ActionButton } from 'ui/atoms/actionButton.tsx';

interface Props {
	title: string;
	image: string;
	isOpened: boolean;
	flowId: string;
	handleClose: () => void;
	userCountry?: string;
}

export const CategoryDialog = ({ title, image, isOpened, handleClose, flowId, userCountry }: Props) => {
	const [impactOccurred] = useHapticFeedback();

	const handleSubmit = useCallback(() => {
		impactOccurred('light');
		void handleOrder(flowId, {
			itemName: title,
			userCountry,
		});
	}, [flowId, impactOccurred, title, userCountry]);

	return (
		<Drawer
			anchor={'bottom'}
			onClose={handleClose}
			open={isOpened}
			sx={{
				'& .MuiPaper-root': {
					background: theme.tg_theme.palette.bg_color,
				},
			}}>
			<Box
				sx={{
					p: '3rem 3rem',
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					background: theme.tg_theme.palette.bg_color,
				}}>
				<Box
					component={'img'}
					src={image}
					alt={title}
					fontSize="small"
					sx={{
						width: '7rem',
						height: '7rem',
						display: 'block',
						mb: '1rem',
					}}
				/>
				<Typography sx={{ textAlign: 'center', fontWeight: '600', mb: '1rem' }} component={'p'} variant="body1">
					{title}
				</Typography>
				{!isUserAgentTelegram ? (
					<ActionButton isMainButton text={'Open Telegram'} handleClick={openTelegram} />
				) : (
					<MainButton onClick={handleSubmit} />
				)}
			</Box>
		</Drawer>
	);
};
