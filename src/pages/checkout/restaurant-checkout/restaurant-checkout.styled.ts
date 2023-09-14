import { FormControlLabel, FormGroup, styled } from '@mui/material';

export const SaveInfoWrapper = styled(FormGroup)(`
  margin: 2rem 0;
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
