import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { getDateDiff } from 'utils/date';

import { handleOrder } from 'actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

import { BikesCheckoutComponent } from './bikes-checkout.component';
import { BikesCheckoutModel } from './bikes-checkout.model';

export const BikesCheckoutContainer = () => {
	const { state } = useLocation();
	const product: DefaultProductModel = state.product || {};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<BikesCheckoutModel>({
		defaultValues: { startDate: null, endDate: null },
	});

	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	const onSubmit = useCallback(
		(data: BikesCheckoutModel) => {
			return handleOrder(
				state?.flowId,
				{
					placeContact: product.contact,
					placeName: product.place,
					itemPrice: product.price,
					itemTitle: product.title,
					rentStart: data.startDate?.toDateString(),
					endDate: data.endDate?.toDateString(),
					rentPeriod,
				},
				() => console.log(),
				() => console.log(),
			);
		},
		[product.contact, product.place, product.price, product.title, rentPeriod, state?.flowId],
	);

	const handleForm = useCallback(async () => {
		try {
			await handleSubmit(onSubmit)();
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}, [handleSubmit, onSubmit]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Order');
		handleMainButton(handleForm);

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleForm);
		};
	}, [handleForm]);

	return (
		<BikesCheckoutComponent
			errors={errors}
			product={product}
			control={control}
			register={register}
			rentPeriod={rentPeriod}
		/>
	);
};
