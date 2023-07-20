import React from 'react';
import { HintTitle } from '../../components/hintTitle';
import { Input } from '../checkout/checkout.styled';
import { ErrorText } from '../../components/errorText';
import { Box, styled } from '@mui/material';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { TransportCheckoutModel } from './transportCheckout.model';
import { DatePicker } from '@mui/x-date-pickers';

const InputGroupBox = styled(Box)`
	margin-bottom: 1rem;
`;

interface Props {
	errors: FieldErrors<TransportCheckoutModel>;
	control: Control<TransportCheckoutModel, any>;
	register: UseFormRegister<TransportCheckoutModel>;
}

export const TransportCheckoutForm = ({ register, errors, control }: Props) => {
	return (
		<form>
			<InputGroupBox>
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
			</InputGroupBox>
			<Box display={'flex'}>
				<Box>
					<HintTitle text={'From'} styles={{ marginBottom: '0.5rem' }} />
					<Controller
						control={control}
						{...register('startDate', {
							required: {
								value: true,
								message: 'When do you need the bike?',
							},
						})}
						render={({ field: { ...field }, fieldState }) => (
							<DatePicker
								{...field}
								disablePast
								format={'DD.MM.YYYY'}
								slotProps={{
									textField: {
										sx: {
											background: '#303030',
											fontSize: '14px !important',
											color: '#fff',
											borderRadius: '8px',
											boxShadow: 'none',
											mr: '8px',
											height: 'fit-content',
										},
									},
								}}
							/>
						)}
					/>
				</Box>

				<Box>
					<HintTitle text={'To'} styles={{ marginBottom: '0.5rem' }} />
					<Controller
						control={control}
						{...register('endDate', {
							required: {
								value: true,
								message: 'When will you return the bike?',
							},
						})}
						render={({ field: { ...field }, fieldState }) => (
							<DatePicker
								{...field}
								disablePast
								format={'DD.MM.YYYY'}
								slotProps={{
									textField: {
										error: !!errors.endDate,
										sx: {
											background: '#303030',
											fontSize: '14px !important',
											color: '#fff',
											borderRadius: '8px',
											boxShadow: 'none',
											mr: '8px',
											mb: '4px',
											height: 'fit-content',
										},
									},
								}}
							/>
						)}
					/>
					<ErrorText text={errors.endDate?.message} />
				</Box>
			</Box>
		</form>
	);
};
