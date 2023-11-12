import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';

import { Box, Typography } from '@mui/material';

import { DefaultItemModel } from 'pages/item/domain/item.model';

import { formatDaysText } from 'utils/date';

import { BikesFormFields } from '../../domain/model/bikes.model';
import { BikesCheckoutForm } from '../bikes-form/bikes-form';

interface Props {
	rentPeriod: number;
	item: DefaultItemModel;
	control: Control<BikesFormFields>;
	errors: FieldErrors<BikesFormFields>;
	register: UseFormRegister<BikesFormFields>;
}

export const BikesCheckoutComponent = ({ register, errors, control, item, rentPeriod }: Props) => {
	return (
		<>
			<BikesCheckoutForm control={control} errors={errors} register={register} />
			<Box sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}>
				<HintText text={'Order info'} sx={{ mb: '0.5rem' }} />
				<Box sx={{ display: 'flex', alignItems: 'flex-start' }} mb={1}>
					<Box
						component={'img'}
						src={item.image[0].url}
						alt={item.title}
						sx={{
							mr: 2,
							width: '5rem',
							borderRadius: 1,
							objectFit: 'cover',
							aspectRatio: '2/2',
						}}
					/>
					<Box sx={{ display: 'flex', alignItems: 'self-start', flexDirection: 'column' }} mb={'3rem'}>
						<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
							{item.title}
						</Typography>

						<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
							{item.price} Rs
						</Typography>
					</Box>
				</Box>

				{rentPeriod > 0 && (
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>
						<Typography fontSize={'1rem'} component={'span'} display={'flex'}>
							Total price for
							<Typography
								fontSize={'1rem'}
								component={'span'}
								sx={{
									width: '1.5rem',
									height: '1.5rem',
									borderRadius: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									m: '0 0.5rem',
								}}>
								{rentPeriod}
							</Typography>
							{formatDaysText(rentPeriod)}
						</Typography>
						<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>
							{item.price * rentPeriod} Rs
						</Typography>
					</Box>
				)}
			</Box>
		</>
	);
};
