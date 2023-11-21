import * as React from 'react';

import { Switch as BaseSwitch } from '@mui/base/Switch';

import { SwitchStyled } from './switch.styled';

interface Props {
	handleHelmet: () => void;
}

export const Switch = ({ handleHelmet }: Props) => {
	return <BaseSwitch onChange={handleHelmet} slots={{ root: SwitchStyled }} defaultChecked />;
};
