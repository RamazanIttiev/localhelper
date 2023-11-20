import * as React from 'react';
import { SwitchStyled } from 'reactkit/switch/switch.styled';

import { Switch as BaseSwitch } from '@mui/base/Switch';

interface Props {
	handleHelmet: () => void;
}

export const Switch = ({ handleHelmet }: Props) => {
	return <BaseSwitch onChange={handleHelmet} slots={{ root: SwitchStyled }} defaultChecked />;
};
