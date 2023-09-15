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

import { useTelegramUser } from 'context/user.context';

import { RentCheckoutComponent } from './rent-checkout.component';
import { RentCheckoutModel } from './rent-checkout.model';

export const RentCheckoutContainer = () => {
	const { state } = useLocation();
	const product: DefaultProductModel = state.product || {};

	const tgUser = useTelegramUser();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RentCheckoutModel>({
		defaultValues: { userName: tgUser.first_name, startDate: null, endDate: null },
	});

	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	const onSubmit = useCallback(
		(data: RentCheckoutModel) => {
			return handleOrder(
				state?.flowId,
				{
					placeContact: product.contact,
					placeName: product.place,
					itemPrice: product.price,
					itemTitle: product.title,
					userName: data.userName,
					userPhone: data.userPhone,
					rentStart: data.startDate?.toDateString(),
					rentEnd: data.endDate?.toDateString(),
					rentPeriod,
					tgUserNick: tgUser.username,
				},
				() => console.log(),
				() => console.log(),
			);
		},
		[product.contact, product.place, product.price, product.title, rentPeriod, state?.flowId, tgUser.username],
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
		<RentCheckoutComponent
			errors={errors}
			product={product}
			control={control}
			register={register}
			rentPeriod={rentPeriod}
		/>
	);
};
