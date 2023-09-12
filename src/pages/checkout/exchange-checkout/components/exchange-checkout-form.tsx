import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintTitle } from 'reactkit/hintTitle';
import { Input } from 'reactkit/input';
import { Select } from 'reactkit/select';

import { Box, MenuItem } from '@mui/material';

import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

interface Props {
	errors: FieldErrors<ExchangeCheckoutModel>;
	register: UseFormRegister<ExchangeCheckoutModel>;
}

const selectItems = [
	{
		value: 'USDT',
		label: 'attach_money',
	},
	{
		value: 'INR',
		label: 'currency_rupee',
	},
];

export const ExchangeCheckoutForm = ({ register, errors }: Props) => {
	return (
		<form>
			<Box mb={'1rem'}>
				<HintTitle text={'Name'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.userName !== undefined}
					placeholder={'John'}
					{...register('userName', {
						required: {
							value: true,
							message: 'Name is required',
						},
						pattern: {
							value: /^[a-zA-Z]+$/,
							message: "I guess that's not a valid name...",
						},
					})}
				/>
				<ErrorText text={errors.userName?.message} />
			</Box>

			<HintTitle text={'Phone'} />
			<Input
				fullWidth
				type={'tel'}
				margin="dense"
				color={'info'}
				error={errors.userPhone !== undefined}
				placeholder={'8 999 777 03 02'}
				{...register('userPhone', {
					required: { value: true, message: 'I need your phone number' },
					pattern: { value: /^[0-9+-]+$/, message: "I think your phone number isn't correct..." },
					minLength: { value: 8, message: 'Your phone number is too short' },
				})}
			/>
			{<ErrorText text={errors.userPhone?.message} />}

			<HintTitle text={'Amount'} />
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Input
					required
					type="number"
					margin="dense"
					placeholder="100 000"
					error={errors.exchangeAmount !== undefined}
					{...register('exchangeAmount', {
						required: { value: true, message: 'How much do you want to exchange?' },
						pattern: {
							value: /^[1-9]\d*(\d+)?$/i,
							message: 'Please enter an integer',
						},
						min: {
							value: 1,
							message: 'Value should be at least 1',
						},
					})}
					sx={{
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
					fieldName={'exchangeCurrency'}
					defaultValue={'USDT'}
					sx={{
						width: '9rem',
						height: 56,
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
						'& .MuiOutlinedInput-root': {
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
						},
					}}>
					{selectItems.map(option => {
						return <MenuItem value={option.value}>{option.value}</MenuItem>;
					})}
				</Select>
			</Box>
			{<ErrorText text={errors.exchangeAmount?.message} />}
		</form>
	);
};
