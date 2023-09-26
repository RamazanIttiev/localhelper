import React from 'react';
import { Label } from 'reactkit/label';

import { Box, Typography, useTheme } from '@mui/material';

interface OrderInfoProps {
	payment?: string;
	orderTotal: number;
	delivery?: string | number;
}

export const OrderInfo = ({ orderTotal, delivery = 'Free', payment = 'Cash' }: OrderInfoProps) => {
	const theme = useTheme();

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}>
			<Label text={'Order info'} labelStyles={{ marginBottom: '0.5rem' }} />
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>
				<Typography fontSize={'1rem'} component={'span'}>
					Total
				</Typography>
				<Typography
					component={'span'}
					variant={'body1'}
					fontWeight={'bold'}
					sx={{ color: theme.palette.info.main }}>
					{orderTotal} Rs
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>
				<Typography fontSize={'1rem'} component={'span'}>
					Delivery
				</Typography>
				<Typography
					component={'span'}
					variant={'body1'}
					fontWeight={'bold'}
					sx={{ color: theme.palette.info.main }}>
					{delivery}
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>
				<Typography fontSize={'1rem'} component={'span'}>
					Payment method
				</Typography>
				<Typography
					component={'span'}
					variant={'body1'}
					fontWeight={'bold'}
					sx={{ color: theme.palette.info.main }}>
					{payment}
				</Typography>
			</Box>
		</Box>
	);
};
