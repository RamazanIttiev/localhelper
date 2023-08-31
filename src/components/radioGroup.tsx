import React from 'react';
import { HintTitle } from '../reactkit/hintTitle';
import { FormControl, FormControlLabel, Radio, useTheme } from '@mui/material';
import { RadioButtonsGroup } from '../pages/productDetails/productDetails.styled';
import { FoodExtraOptions } from '../models/product.model';

interface RadioButtonsProps {
	buttons: string[];
	productExtra?: FoodExtraOptions;
	handleExtra?: (event: React.SyntheticEvent) => void;
}

export const RadioButtons = ({ buttons, productExtra, handleExtra }: RadioButtonsProps) => {
	const theme = useTheme();

	return (
		<FormControl sx={{ width: '100%', mt: '1rem' }}>
			<HintTitle text={'Options'} styles={{ marginBottom: '0.5rem' }} />
			<RadioButtonsGroup
				value={productExtra?.dishSize}
				onChange={handleExtra}
				defaultValue="small"
				aria-labelledby="demo-customized-radios"
				name="customized-radios">
				{buttons.map(button => {
					return (
						<FormControlLabel
							label={button}
							value={button}
							sx={{ mb: 1 }}
							control={
								<Radio disableRipple color="primary" sx={{ color: theme.palette.background.paper }} />
							}
						/>
					);
				})}
			</RadioButtonsGroup>
		</FormControl>
	);
};
