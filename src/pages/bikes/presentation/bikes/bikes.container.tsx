import { useQuery } from '@tanstack/react-query';
import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { BikesFormFields } from 'pages/bikes/domain/model/bikes.model';
import { useBase } from 'pages/checkout/hooks/checkout.hook';
import { Items } from 'pages/items/domain/items.model';

import { getFlowId } from 'common/utils/airtable';
import { getDateDiff } from 'common/utils/date';

import { itemsQuery } from 'api/airtable/items';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'ui/theme/theme';

import { BikesCheckoutComponent } from './bikes.component';
import { useGeoLocationService } from 'common/service/geoLocation.service';

export const BikesContainer = () => {
	const { categoryId } = useParams();
	const geolocation = useGeoLocationService();

	const tgUser = getTelegramUser();

	const { data: items } = useQuery<Items>(itemsQuery(categoryId, geolocation));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://ralfkijumchkpoqmkbtw.supabase.co/rest/v1/Categories?select=*', {
					headers: {
						apikey:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhbGZraWp1bWNoa3BvcW1rYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4NTY2MTksImV4cCI6MjAxNzQzMjYxOX0.gjQQWeqPFcxHpJYR3FmhhhUT5ajk5Gz-BLcYw71sAGk',
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhbGZraWp1bWNoa3BvcW1rYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4NTY2MTksImV4cCI6MjAxNzQzMjYxOX0.gjQQWeqPFcxHpJYR3FmhhhUT5ajk5Gz-BLcYw71sAGk',
					},
				});

				if (!response.ok) {
					new Error('API request failed.');
				}

				console.log(response);
				return await response.json();
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(`API request failed: ${error.message}`);
				}
			}
		};

		fetchData();
	}, []);

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
		impactOccurred('light');
		setIsHelmet(prevState => !prevState);
	};

	const item = items?.find(item => {
		return item.id[0];
	});

	const flowId = getFlowId(categoryId);

	const onSubmit = handleSubmit(
		formData => {
			impactOccurred('light');
			return handleOrder(flowId || '', {
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
