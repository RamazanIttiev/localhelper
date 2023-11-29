import { SyntheticEvent } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { BikesFormFields } from 'pages/bikes/domain/model/bikes.model.ts';
import { BikesCheckoutForm } from 'pages/bikes/presentation/bikes-form/bikes-form.tsx';
import { Items } from 'pages/items/domain/items.model.ts';

import { theme } from 'ui/theme/theme.ts';

import { Switch } from 'ui/atoms/switch/switch.tsx';
import { Tabs } from 'ui/molecules/tabs/tabs.component.tsx';

interface Props {
	bikes: Items | undefined;
	rentPeriod: number;
	control: Control<BikesFormFields>;
	errors: FieldErrors<BikesFormFields>;
	register: UseFormRegister<BikesFormFields>;
	handleHelmet: () => void;
	handleSelectedBike: (e: SyntheticEvent | null, newValue: string | number | null) => void;
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
