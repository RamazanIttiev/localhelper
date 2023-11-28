import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ToursCheckoutForm } from './components/tours-checkout-form.tsx';

import { ToursFormFields } from './tours-checkout.model.ts';
import { HintText } from 'ui/atoms/hintText.tsx';
import { DefaultItemModel } from 'ui/organisms/item/domain/item.model.ts';

interface Props {
	item: DefaultItemModel;
	control: Control<ToursFormFields>;
	errors: FieldErrors<ToursFormFields>;
	register: UseFormRegister<ToursFormFields>;
}

export const ToursCheckoutComponent = ({ register, errors, control, item }: Props) => {
	return (
		<>
			<ToursCheckoutForm control={control} errors={errors} register={register} />
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
					<Box sx={{ display: 'flex', alignItems: 'self-start', flexDirection: 'column' }}>
						<Typography variant={'body1'}>{item.title}</Typography>

						<Typography variant={'body1'} sx={{ display: 'flex' }}>
							Total price:
							<Typography fontWeight={600} ml={1}>
								{item.price} Rs
							</Typography>
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
};
