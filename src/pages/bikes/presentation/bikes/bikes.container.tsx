import { useQuery } from '@tanstack/react-query';
import { useHapticFeedback, MainButton } from '@vkruglikov/react-telegram-web-app';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { BikesFormFields } from 'pages/bikes/domain/model/bikes.model.ts';
import { BikesCheckoutComponent } from 'pages/bikes/presentation/bikes/bikes.component.tsx';
import { useBase } from 'pages/checkout/hooks/checkout.hook.ts';
import { Items } from 'pages/items/domain/items.model.ts';

import { getFlowId } from 'common/utils/airtable.ts';
import { getDateDiff } from 'common/utils/date.ts';

import { itemsQuery } from 'api/airtable/items.ts';

import { handleOrder } from 'actions/global-actions.ts';
import { getTelegramUser } from 'actions/webApp-actions.ts';

import { theme } from 'ui/theme/theme.ts';

import { useGeoLocationService } from 'common/service/geoLocation.service.ts';

export const BikesContainer = () => {
	const { categoryId } = useParams();
	const geolocation = useGeoLocationService();

	const tgUser = getTelegramUser();

	const { data: items } = useQuery<Items>(itemsQuery(categoryId, geolocation));

	const [selectedBike, setSelectedBike] = useState<string | undefined>(undefined);
	const [isHelmet, setIsHelmet] = useState(true);

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const { handleSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<BikesFormFields>({
			defaultValues: { userName: tgUser?.first_name, startDate: null, endDate: null },
		}),
	);

	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	const handleSelectedBike = (e: React.SyntheticEvent | null, newValue: string | number | null) => {
		impactOccurred('light');

		if (typeof newValue === 'string') {
			setSelectedBike(newValue);
		}
	};

	const handleHelmet = () => {
		setIsHelmet(prevState => !prevState);
	};

	const item = items?.find(item => {
		return item.id === selectedBike;
	});

	const flowId = getFlowId(categoryId);

	const onSubmit = handleSubmit(
		formData => {
			impactOccurred('light');
			return handleOrder(flowId, {
				item: item?.title || '',
				rentPeriod,
				helmet: isHelmet,
				...formData,
			});
		},
		() => notificationOccurred('error'),
	);

	return (
		<Container maxWidth={'md'} sx={{ py: 1 }}>
			<BikesCheckoutComponent
				bikes={items}
				errors={errors}
				control={control}
				register={register}
				rentPeriod={rentPeriod}
				handleHelmet={handleHelmet}
				handleSelectedBike={handleSelectedBike}
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
		</Container>
	);
};

export const mapItems = (items: Items | undefined) => {
	return items?.map(item => {
		return {
			...item,
			image: item.image[0].url,
		};
	});
};
