import React, { useState } from 'react';
import { HeaderComponent } from './header.component';

export const HeaderContainer = () => {
	const [open, setOpen] = useState(false);

	const toggleMenu = (isOpened: boolean) => {
		setOpen(!isOpened);
	};

	return <HeaderComponent open={open} toggleMenu={toggleMenu} />;
};
