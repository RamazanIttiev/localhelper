import React, { FC } from 'react';
import { Box, Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface MenuProps {
	handleToggle: (isOpened: boolean) => () => void;
}

export const Menu: FC<MenuProps> = ({ handleToggle }) => {
	return (
		<Box role="presentation" onClick={handleToggle(false)}>
			<List>
				<ListItem key={1} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<Icon>restaurant</Icon>
						</ListItemIcon>
						<ListItemText primary={'Food'} />
					</ListItemButton>
				</ListItem>
				<ListItem key={2} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<Icon>auto_fix_normal</Icon>
						</ListItemIcon>
						<ListItemText primary={'Weed'} />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
		</Box>
	);
};
