import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material';

export const CustomLoadingButton = styled(LoadingButton)(() => ({
	'&.Mui-disabled': {
		'& > div': {
			color: '#fff',
		},
	},
}));
