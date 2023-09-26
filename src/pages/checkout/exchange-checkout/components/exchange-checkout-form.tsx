import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { InputGroup } from 'reactkit/inputGroup';
import { Select } from 'reactkit/select';

import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

interface Props {
	errors: FieldErrors<ExchangeCheckoutModel>;
	register: UseFormRegister<ExchangeCheckoutModel>;
}

export const ExchangeCheckoutForm = ({ register, errors }: Props) => {
	return (
		<form>
			<InputGroup
				label={'Name'}
				errorMessage={errors.userName?.message}
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

			<InputGroup
				label={'Phone'}
				required
				type={'tel'}
				register={register}
				fieldName={'userPhone'}
				error={errors.userPhone !== undefined}
				placeholder={'8 999 777 03 02'}
				pattern={/^[0-9+-]+$/}
				minLength={8}
				errorMessage={errors.userPhone?.message}
				requiredMessage={'I need your phone number'}
				minLengthMessage={'Your phone number is too short'}
				patternMessage={"I think your phone number isn't correct..."}
			/>

			<InputGroup
				label={'Amount'}
				required
				type="number"
				register={register}
				fieldName={'exchangeAmount'}
				placeholder="100 000"
				error={errors.exchangeAmount !== undefined}
				errorMessage={errors.exchangeAmount?.message}
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
			{<ErrorText text={errors.exchangeAmount?.message} />}
		</form>
	);
};
