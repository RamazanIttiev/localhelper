import React, { useCallback, useMemo, useReducer } from 'react';
import { Container } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';

import { TelegramUser } from '../../app/App';
import { getDateDiff } from '../../utils/date';
import { useLocation } from 'react-router-dom';
import { DefaultProductModel } from '../../models/product.model';
import { TransportCheckoutModel } from './transportCheckout.model';
import { TransportCheckoutComponent } from './transportCheckout.component';
import { handleFormSubmit } from '../../actions/global-actions';
import { initialState, reducer } from '../../utils/reducers';
import { useMainButton } from '../../hooks/useMainButton';

interface RouteState {
	state: { flowId: string; product: DefaultProductModel };
}

export const TransportCheckoutContainer = () => {
	const { state } = useLocation() as RouteState;
	const flowId = state.flowId || '';
	const product = useMemo(() => state.product || {}, [state.product]);

	const [{ loading, errorState }, dispatch] = useReducer(reducer, initialState);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TransportCheckoutModel>({
		defaultValues: { userName: TelegramUser?.first_name || '', startDate: null, endDate: null },
	});

	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	const onSubmit = useCallback(
		async (formData: TransportCheckoutModel) => {
			await handleFormSubmit(dispatch, flowId, {
				placeContact: product.contact,
				placeName: product.place,
				itemPrice: product.price,
				itemTitle: product.title,
				rentStart: formData.startDate?.toDateString(),
				rentEnd: formData.endDate?.toDateString(),
				rentPeriod,
			});
		},
		[dispatch, flowId, product, rentPeriod],
	);

	const handleForm = async () => {
		try {
			await handleSubmit(onSubmit)();
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	useMainButton({ handleClick: handleForm, dispatch, errorState, buttonLabel: 'order' });

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<TransportCheckoutComponent
				errors={errors}
				loading={loading}
				product={product}
				control={control}
				register={register}
				onSubmit={handleForm}
				rentPeriod={rentPeriod}
				errorState={errorState}
			/>
		</Container>
	);
};
