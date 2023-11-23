import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Box, Typography } from '@mui/material';

import { Items } from 'pages/items/domain/items.model';

import { theme } from 'ui/theme/theme';

import { BikesFormFields } from '../../domain/model/bikes.model';
import { BikesCheckoutForm } from '../bikes-form/bikes-form';
import { Switch } from 'ui/atoms/switch/switch';
import { TabsSkeleton } from 'ui/molecules/skeletons/tabsSkeleton';
import { Tabs } from 'ui/molecules/tabs/tabs.component';

interface Props {
	bikes: Items | undefined;
	rentPeriod: number;
	control: Control<BikesFormFields>;
	errors: FieldErrors<BikesFormFields>;
	register: UseFormRegister<BikesFormFields>;
	handleHelmet: () => void;
	handleSelectedBike: (e: React.SyntheticEvent | null, newValue: string | number | null) => void;
}

export const BikesCheckoutComponent = ({
	bikes,
	register,
	errors,
	control,
	handleSelectedBike,
	handleHelmet,
}: Props) => {
	return (
		<>
			<BikesCheckoutForm control={control} errors={errors} register={register} />

			{bikes ? (
				<Tabs
					onChange={handleSelectedBike}
					tabs={bikes}
					sxTabs={{ mt: 4, overflow: 'auto' }}
					sxTab={{ height: '96px', width: '96px' }}
				/>
			) : (
				<TabsSkeleton />
			)}
			<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
				<Typography sx={{ mr: 1, fontSize: theme.tg_theme.fontSize.info }}>Do you need a helmet?</Typography>
				<Switch handleHelmet={handleHelmet} />
			</Box>
			{/*<Box sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}>*/}
			{/*	<HintText text={'Order info'} sx={{ mb: '0.5rem' }} />*/}
			{/*	<Box sx={{ display: 'flex', alignItems: 'flex-start' }} mb={1}>*/}
			{/*		<Box*/}
			{/*			component={'img'}*/}
			{/*			src={item.image[0].url}*/}
			{/*			alt={item.title}*/}
			{/*			sx={{*/}
			{/*				mr: 2,*/}
			{/*				width: '5rem',*/}
			{/*				borderRadius: 1,*/}
			{/*				objectFit: 'cover',*/}
			{/*				aspectRatio: '2/2',*/}
			{/*			}}*/}
			{/*		/>*/}
			{/*		<Box sx={{ display: 'flex', alignItems: 'self-start', flexDirection: 'column' }} mb={'3rem'}>*/}
			{/*			<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>*/}
			{/*				{item.title}*/}
			{/*			</Typography>*/}

			{/*			<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>*/}
			{/*				{item.price} Rs*/}
			{/*			</Typography>*/}
			{/*		</Box>*/}
			{/*	</Box>*/}

			{/*	{rentPeriod > 0 && (*/}
			{/*		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} mb={1}>*/}
			{/*			<Typography fontSize={'1rem'} component={'span'} display={'flex'}>*/}
			{/*				Total price for*/}
			{/*				<Typography*/}
			{/*					fontSize={'1rem'}*/}
			{/*					component={'span'}*/}
			{/*					sx={{*/}
			{/*						width: '1.5rem',*/}
			{/*						height: '1.5rem',*/}
			{/*						borderRadius: '50%',*/}
			{/*						display: 'flex',*/}
			{/*						justifyContent: 'center',*/}
			{/*						alignItems: 'center',*/}
			{/*						m: '0 0.5rem',*/}
			{/*					}}>*/}
			{/*					{rentPeriod}*/}
			{/*				</Typography>*/}
			{/*				{formatDaysText(rentPeriod)}*/}
			{/*			</Typography>*/}
			{/*			<Typography component={'span'} variant={'body1'} fontWeight={'bold'}>*/}
			{/*				{item.price * rentPeriod} Rs*/}
			{/*			</Typography>*/}
			{/*		</Box>*/}
			{/*	)}*/}
			{/*</Box>*/}
		</>
	);
};
