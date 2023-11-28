import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { UseFormReturn } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { handleOrder } from 'actions/global-actions.ts';

export const useBase = (useForm: UseFormReturn<any, any>, restFormData?: object) => {
	const { state } = useLocation();

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm;

	const onSubmit = handleSubmit(
		(formData: any) => {
			impactOccurred('light');
			void handleOrder(state?.flowId, {
				item: state?.item.id || '',
				...formData,
				...restFormData,
			});
		},
		() => notificationOccurred('error'),
	);

	return {
		state,
		onSubmit,
		register,
		control,
		errors,
		handleSubmit,
		isSubmitting,
		isSubmitSuccessful,
	};
};
