import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { ToursCheckoutComponent } from './tours-checkout.component';
import { ToursCheckoutModel } from './tours-checkout.model';

export const ToursCheckoutContainer = () => {
	const { state } = useLocation();
	const tgUser = getTelegramUser();

	const flowId = state.flowId || '';
	const product: DefaultProductModel = state.product || {};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ToursCheckoutModel>({ defaultValues: { userName: tgUser?.first_name } });

	const onSubmit = handleSubmit((data: ToursCheckoutModel) => {
		return handleOrder(
			flowId,
			{
				data,
				tourTitle: product.title,
				tgUserNick: tgUser?.username,
			},
			() => console.log(),
			() => console.log(),
		);
	});

	return (
		<>
			<ToursCheckoutComponent errors={errors} control={control} product={product} register={register} />
			<MainButton text={'Order'} onClick={onSubmit} />
		</>
	);
};
