import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'theme/theme';

import { FlowersCheckoutComponent } from './flowers-checkout.component';
import { FlowersCheckoutModel } from './flowers-checkout.model';

export const FlowersCheckoutContainer = () => {
	const { state } = useLocation();
	const tgUser = getTelegramUser();

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const flowId = state.flowId || '';
	const product: DefaultProductModel = state.product || {};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FlowersCheckoutModel>({ defaultValues: { userName: tgUser?.first_name } });

	const onSubmit = handleSubmit(
		(data: FlowersCheckoutModel) => {
			impactOccurred('light');
			return handleOrder(
				flowId,
				{
					...data,
					productTitle: product.title,
					placeTitle: product.place,
					placeContact: product.contact,
					tgUserNick: tgUser?.username,
				},
				() => console.log(),
				() => console.log(),
			);
		},
		() => notificationOccurred('error'),
	);

	return (
		<>
			<FlowersCheckoutComponent product={product} register={register} errors={errors} />
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
