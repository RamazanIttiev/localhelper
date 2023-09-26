import React from 'react';
import { HintText } from 'reactkit/hintText';

import { Box, Typography } from '@mui/material';

interface OrderInfoProps {
	payment?: string;
	orderTotal: number;
	delivery?: string | number;
}

export const OrderInfo = ({ orderTotal, delivery = 'Free', payment = 'Cash' }: OrderInfoProps) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}>
			<HintText text={'Order info'} sx={{ mb: '1rem' }} />
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>
				<Typography fontSize={'1rem'} component={'span'}>
					Total
				</Typography>
				<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
					{orderTotal} Rs
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>
				<Typography fontSize={'1rem'} component={'span'}>
					Delivery
				</Typography>
				<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
					{delivery}
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>
				<Typography fontSize={'1rem'} component={'span'}>
					Payment method
				</Typography>
				<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
					{payment}
				</Typography>
			</Box>
		</Box>
	);
};
