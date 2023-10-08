import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'theme/theme';

import { ToursCheckoutComponent } from './tours-checkout.component';
import { ToursCheckoutModel } from './tours-checkout.model';

export const ToursCheckoutContainer = () => {
	const { state } = useLocation();
	const tgUser = getTelegramUser();

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const flowId = state.flowId || '';
	const product: DefaultProductModel = state.product || {};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<ToursCheckoutModel>({ defaultValues: { userName: tgUser?.first_name } });

	const onSubmit = handleSubmit(
		(data: ToursCheckoutModel) => {
			impactOccurred('light');
			return handleOrder(flowId, {
				data,
				tourTitle: product.title,
				tgUserNick: tgUser?.username,
			});
		},
		() => notificationOccurred('error'),
	);

	return (
		<>
			<ToursCheckoutComponent errors={errors} control={control} product={product} register={register} />
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
