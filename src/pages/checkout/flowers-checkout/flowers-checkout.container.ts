import { createElement, useCallback, useEffect } from 'react';
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

import { FlowersCheckoutComponent } from './flowers-checkout.component';
import { FlowersCheckoutModel } from './flowers-checkout.model';

export const FlowersCheckoutContainer = () => {
	const { state } = useLocation();

	const flowId = state.flowId || '';
	const product: DefaultProductModel = state.product || {};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FlowersCheckoutModel>();

	const onSubmit = useCallback(
		(data: FlowersCheckoutModel) => {
			return handleOrder(
				flowId,
				{
					...data,
					productTitle: product.title,
					placeTitle: product.place,
					placeContact: product.contact,
				},
				() => console.log(),
				() => console.log(),
			);
		},
		[flowId, product.title, product.place, product.contact],
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

	return createElement(FlowersCheckoutComponent, {
		product,
		register,
		errors,
	});
};
