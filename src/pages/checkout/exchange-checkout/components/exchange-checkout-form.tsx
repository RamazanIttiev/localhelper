import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';
import { Label } from 'reactkit/label';
import { Select } from 'reactkit/select';

import { Box } from '@mui/material';

import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

interface Props {
	errors: FieldErrors<ExchangeCheckoutModel>;
	register: UseFormRegister<ExchangeCheckoutModel>;
}

export const ExchangeCheckoutForm = ({ register, errors }: Props) => {
	return (
		<form>
			<Box mb={'1rem'}>
				<Label text={'Name'} />
				<Input
					required
					type={'text'}
					register={register}
					fieldName={'userName'}
					requiredMessage={'Name is required'}
					pattern={/^[a-zA-Z]+$/}
					patternMessage={"I guess that's not a valid name..."}
					error={errors.userName !== undefined}
					placeholder={'John'}
				/>
				<ErrorText text={errors.userName?.message} />
			</Box>

			<Box mb={'1rem'}>
				<Label text={'Phone'} />
				<Input
					required
					fullWidth
					type={'tel'}
					register={register}
					fieldName={'userPhone'}
					error={errors.userPhone !== undefined}
					placeholder={'8 999 777 03 02'}
					pattern={/^[0-9+-]+$/}
					minLength={8}
					requiredMessage={'I need your phone number'}
					minLengthMessage={'Your phone number is too short'}
					patternMessage={"I think your phone number isn't correct..."}
				/>
				{<ErrorText text={errors.userPhone?.message} />}
			</Box>

			<Label text={'Amount'} />
			<Box sx={{ display: 'flex', alignItems: 'end' }}>
				<Input
					required
					type="number"
					register={register}
					fieldName={'exchangeAmount'}
					placeholder="100 000"
					error={errors.exchangeAmount !== undefined}
					sx={{
						mt: 0,
						mb: 0,
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
						'& .MuiOutlinedInput-root': {
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
						},
					}}
				/>

				<Select
					register={register}
					options={['USDT', 'INR']}
					fieldName={'exchangeCurrency'}
					defaultValue={'USDT'}
					sx={{
						width: '9rem',
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
						'& .MuiOutlinedInput-root': {
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
						},
					}}
				/>
			</Box>
			{<ErrorText text={errors.exchangeAmount?.message} />}
		</form>
	);
};
