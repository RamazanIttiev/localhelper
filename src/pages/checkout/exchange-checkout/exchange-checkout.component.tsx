import { FieldErrors, UseFormRegister, Control } from 'react-hook-form';

import Container from '@mui/material/Container';

import { ToChangeBox } from 'pages/checkout/exchange-checkout/components/to-change-box.tsx';
import { ToReceiveBox } from 'pages/checkout/exchange-checkout/components/to-receive-box.tsx';
import { ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model.ts';
import { ToChangeState, ToReceiveState } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model.ts';

import { HintText } from 'ui/atoms/hintText.tsx';
import { Separator } from 'ui/atoms/separator.tsx';

interface ExchangeComponentProps {
	exchangeRate: number | null;
	errors: FieldErrors<ExchangeFormFields>;
	register: UseFormRegister<ExchangeFormFields>;
	control: Control<ExchangeFormFields>;
	toChangeState: ToChangeState;
	toReceiveState: ToReceiveState;
}

export const ExchangeCheckoutComponent = ({
	errors,
	register,
	exchangeRate,
	control,
	toChangeState,
	toReceiveState,
}: ExchangeComponentProps) => {
	return (
		<>
			<ToChangeBox
				control={control}
				register={register}
				state={toChangeState}
				exchangeRate={exchangeRate}
				error={errors.amountToChange?.message}
			/>

			<Separator />

			<ToReceiveBox state={toReceiveState} />

			<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '1rem', position: 'relative' }}>
				<HintText
					sx={{ mt: '2rem' }}
					text={
						'After confirming your order, you will need to provide your geolocation in telegram bot so the courier can find you'
					}
				/>
			</Container>
		</>
	);
};
