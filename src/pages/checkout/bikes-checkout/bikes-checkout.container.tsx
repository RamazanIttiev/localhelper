import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { getDateDiff } from 'utils/date';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { BikesCheckoutComponent } from './bikes-checkout.component';
import { BikesCheckoutModel } from './bikes-checkout.model';

export const BikesCheckoutContainer = () => {
	const { state } = useLocation();
	const product: DefaultProductModel = state.product || {};

	const tgUser = getTelegramUser();

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<BikesCheckoutModel>({
		defaultValues: { userName: tgUser?.first_name, startDate: null, endDate: null },
	});

	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	const onSubmit = handleSubmit(
		(data: BikesCheckoutModel) => {
			impactOccurred('light');
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
				},
				() => console.log(),
				() => console.log(),
			);
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
			<MainButton text={'Order'} onClick={onSubmit} />
		</>
	);
};
