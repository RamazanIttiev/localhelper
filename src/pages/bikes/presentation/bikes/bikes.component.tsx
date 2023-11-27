import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Box, Skeleton, Typography } from '@mui/material';

import { Items } from 'pages/items/domain/items.model';

import { theme } from 'ui/theme/theme';

import { BikesFormFields } from '../../domain/model/bikes.model';
import { BikesCheckoutForm } from '../bikes-form/bikes-form';
import { Switch } from 'ui/atoms/switch/switch';
import { Tabs } from 'ui/molecules/tabs/tabs.component';

interface Props {
	bikes: Items | undefined;
	rentPeriod: number;
	control: Control<BikesFormFields>;
	errors: FieldErrors<BikesFormFields>;
	register: UseFormRegister<BikesFormFields>;
	handleHelmet: () => void;
	handleSelectedBike: (e: React.SyntheticEvent | null, newValue: string | number | null) => void;
}

export const BikesCheckoutComponent = ({
	bikes,
	register,
	errors,
	control,
	handleSelectedBike,
	handleHelmet,
}: Props) => {
	const renderBikes = () => {
		if (bikes === undefined) {
			return <Skeleton />;
		}
		if (bikes.length === 0) {
			return <Typography>There are no bikes available in your country</Typography>;
		}
		return (
			<>
				<BikesCheckoutForm control={control} errors={errors} register={register} />
				<Tabs onChange={handleSelectedBike} tabs={bikes} sxTabs={{ mt: 4 }} />
				<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
					<Typography sx={{ mr: 1, fontSize: theme.tg_theme.fontSize.info }}>
						Do you need a helmet?
					</Typography>
					<Switch handleHelmet={handleHelmet} />
				</Box>
			</>
		);
	};

	return renderBikes();
};
