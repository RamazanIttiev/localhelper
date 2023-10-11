import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { base } from 'airtable';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { getDateDiff } from 'utils/date';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'theme/theme';

import { BikesCheckoutComponent } from './bikes-checkout.component';
import { BikesCheckoutModel, CheckoutModel } from './bikes-checkout.model';

export const BikesCheckoutContainer = () => {
	const { state } = useLocation();
	const product: DefaultProductModel = state.product || {};

	const tgUser = getTelegramUser();

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<BikesCheckoutModel>({
		defaultValues: { userName: tgUser?.first_name, startDate: null, endDate: null },
	});

	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	const onSubmit = handleSubmit(
		(data: BikesCheckoutModel) => {
			impactOccurred('light');
			return handleOrder(state?.flowId, {
				placeContact: product.contact,
				placeName: product.place,
				itemPrice: product.price,
				itemTitle: product.title,
				userName: data.userName,
				userPhone: data.userPhone,
				rentStart: data.startDate?.toDateString(),
				rentEnd: data.endDate?.toDateString(),
				rentPeriod,
			});
		},
		() => notificationOccurred('error'),
	);

	return (
		<>
			<BikesCheckoutComponent
				errors={errors}
				product={product}
				control={control}
				register={register}
				rentPeriod={rentPeriod}
			/>
			<MainButton
				text={'Order'}
				onClick={onSubmit}
				disabled={isSubmitting}
				progress={isSubmitting}
				color={
					isSubmitting ? theme.tg_theme.palette.button_disabled_color : theme.tg_theme.palette.button_color
				}
			/>
		</>
	);
};

const useBase = (url: string, params: any, form: UseFormReturn<CheckoutModel, any>, formData: CheckoutModel) => {
	const { state } = useLocation();
	const product: DefaultProductModel = state.product || {};

	const tgUser = getTelegramUser();

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = form;

	const onSubmit = handleSubmit(
		() => {
			impactOccurred('light');
			return handleOrder(state?.flowId, {
				productId: product.id,
				...formData,
			});
		},
		() => notificationOccurred('error'),
	);

	const sendRequest = (url: string, params: any) => {};

	return {
		onSubmit,
	};
};

const Bikes = () => {
	const form = useForm<BikesCheckoutModel>({
		defaultValues: { userName: '', startDate: null, endDate: null },
	});

	return base('', {});
};
