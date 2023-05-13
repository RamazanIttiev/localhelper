import { FormControlLabel, FormGroup, styled, TextField } from '@mui/material';

export const SaveInfoWrapper = styled(FormGroup)(`
  margin: 3rem 0;
`);

export const SaveInfoField = styled(FormControlLabel)(`
	color: #fff;
  width: 100%;
	height: 100%;
  height: 56px;
  display: flex;
  margin-left: 0;
  padding: 0 1rem;
  box-shadow: none;
  border-radius: 8px;
  background: #303030;
  justify-content: space-between;
`);

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
