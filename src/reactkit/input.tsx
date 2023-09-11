import { styled, TextField } from '@mui/material';

export const Input = styled(TextField)(
	`
  background: #303030;
  font-size: 14px !important;
  color: #fff;
  border-radius: 8px;
  width: 100%;
  box-shadow: none;
  `,

	({ theme }) => ({
		'& .MuiOutlinedInput-root': {
			color: theme.palette.text,
			'&:hover fieldset': {
				borderColor: theme.typography.caption.color,
			},
			'&.Mui-focused fieldset': {
				borderColor: theme.typography.caption.color,
				borderWidth: '1px',
			},
		},
	}),
);
