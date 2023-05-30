import { RadioGroup, styled } from '@mui/material';

export const RadioButtonsGroup = styled(RadioGroup)(
	`
   
  `,

	({ theme }) => ({
		'& .MuiFormControlLabel-root': {
			marginLeft: 0,
			width: '100%',
			color: '#fff',
			boxShadow: 'none',
			borderRadius: '8px',
			background: theme.palette.background.default,
			fontSize: '14px !important',
			border: '2px #303030 solid',

			'& .MuiFormLabel-root.Mui-focused': {
				color: '#fff',
			},
		},
	}),
);
