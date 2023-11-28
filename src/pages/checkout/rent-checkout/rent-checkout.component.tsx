import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { formatDaysText } from 'common/utils/date.ts';

import { theme } from 'ui/theme/theme.ts';

import { DefaultItemModel } from 'ui/organisms/item/domain/item.model.ts';
import { Box, Typography } from '@mui/material';
import { HintText } from 'ui/atoms/hintText.tsx';
import { RentCheckoutForm } from './components/rent-checkout-form.tsx';
import { RentFormFields } from './rent-checkout.model.ts';

interface Props {
	rentPeriod: number;
	item: DefaultItemModel;
	control: Control<RentFormFields>;
	errors: FieldErrors<RentFormFields>;
	register: UseFormRegister<RentFormFields>;
}

export const RentCheckoutComponent = ({ register, errors, control, item, rentPeriod }: Props) => {
	return (
		<>
			<RentCheckoutForm control={control} errors={errors} register={register} />
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
						<Typography
							component={'span'}
							variant={'body1'}
							fontWeight={'bold'}
							sx={{ color: theme.tg_theme.palette.text_color }}>
							{item.title}
						</Typography>

						<Typography
							component={'span'}
							variant={'body1'}
							fontWeight={'bold'}
							sx={{ color: theme.tg_theme.palette.text_color }}>
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
									backgroundColor: theme.tg_theme.palette.button_color,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									m: '0 0.5rem',
								}}>
								{rentPeriod}
							</Typography>
							{formatDaysText(rentPeriod)}
						</Typography>
						<Typography
							component={'span'}
							variant={'body1'}
							fontWeight={'bold'}
							sx={{ color: theme.tg_theme.palette.text_color }}>
							{item.price * rentPeriod} Rs
						</Typography>
					</Box>
				)}
			</Box>
		</>
	);
};
