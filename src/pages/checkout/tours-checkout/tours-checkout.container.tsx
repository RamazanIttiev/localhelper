import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { handleOrder } from 'actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

import { ToursCheckoutComponent } from './tours-checkout.component';
import { ToursCheckoutModel } from './tours-checkout.model';

export const ToursCheckoutContainer = () => {
	const { state } = useLocation();

	const flowId = state.flowId || '';
	const product: DefaultProductModel = state.product || {};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ToursCheckoutModel>();

	const onSubmit = useCallback(
		(data: ToursCheckoutModel) => {
			return handleOrder(
				flowId,
				{
					data,
					tourTitle: product.title,
				},
				() => console.log(),
				() => console.log(),
			);
		},
		[product.title, flowId],
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

	return <ToursCheckoutComponent errors={errors} control={control} product={product} register={register} />;
};
