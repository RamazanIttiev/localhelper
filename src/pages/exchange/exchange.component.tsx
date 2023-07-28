import React from 'react';
import { Input } from '../../reactkit/input';
import { Select } from '../../reactkit/select';
import { ErrorType } from '../../models/error.model';
import { HintTitle } from '../../components/hintTitle';
import { ErrorText } from '../../components/errorText';
import { ExchangeFormState } from './exchange.container';
import { LoaderButton } from '../../reactkit/loaderButton';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Box, Icon, MenuItem, Typography } from '@mui/material';

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

interface ExchangeComponentProps {
	loading: boolean;
	handleForm: () => void;
	errorState: ErrorType;
	errors: FieldErrors<ExchangeFormState>;
	register: UseFormRegister<ExchangeFormState>;
}

export const ExchangeComponent = ({ errors, loading, register, handleForm, errorState }: ExchangeComponentProps) => {
	return (
		<form>
			<HintTitle text={'Contacts'} />
			<Input
				required
				type="text"
				placeholder="Name"
				fieldName="userName"
				register={register}
				fieldError={errors.userName}
			/>
			{errors.userName?.type !== 'required' && <ErrorText text={errors.userName?.message} />}

			<Input
				required
				type="tel"
				fieldName="userPhone"
				register={register}
				fieldError={errors.userPhone}
				placeholder="Local phone number"
			/>
			{errors.userPhone?.type !== 'required' && <ErrorText text={errors.userPhone?.message} />}

			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Input
					required
					type="number"
					register={register}
					fieldName="exchangeAmount"
					placeholder="Exchange amount"
					fieldError={errors.exchangeAmount}
					sx={{
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
						'& .MuiOutlinedInput-root': {
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
						},
					}}
				/>
				{errors.exchangeAmount?.type !== 'required' && <ErrorText text={errors.exchangeAmount?.message} />}

				<Select
					register={register}
					fieldName={'exchangeCurrency'}
					defaultValue={'USDT'}
					sx={{
						width: '6rem',
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
						'& .MuiOutlinedInput-root': {
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
						},
					}}>
					{selectItems.map(option => {
						return (
							<MenuItem value={option.value}>
								<Icon>{option.label}</Icon>
							</MenuItem>
						);
					})}
				</Select>
			</Box>

			<Box sx={{ mt: '2rem' }}>
				<Typography variant={'body2'}>
					After confirming your order, you will need to provide your geolocation in telegram bot so the
					courier can find you
				</Typography>
			</Box>

			{!isUserAgentTelegram && (
				<LoaderButton
					isMainButton
					text={'Exchange'}
					loading={loading}
					errorState={errorState}
					handleClick={handleForm}
				/>
			)}
		</form>
	);
};
