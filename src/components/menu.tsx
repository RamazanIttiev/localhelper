import React, { FC } from 'react';
import { Box, Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface MenuProps {
	handleToggle: (isOpened: boolean) => () => void;
}

export const Menu: FC<MenuProps> = ({ handleToggle }) => {
	return (
		<Box role="presentation" onClick={handleToggle(false)}>
			<List>
				<ListItem key={1} disablePadding>
					<Link style={{ width: '100%' }} to={`categories/food`}>
						<ListItemButton>
							<ListItemIcon>
								<Icon>restaurant</Icon>
							</ListItemIcon>
							<ListItemText primary={'Food'} />
						</ListItemButton>
					</Link>
				</ListItem>
				<ListItem key={2} disablePadding>
					<Link to={`categories/weed`}>
						<ListItemButton>
							<ListItemIcon>
								<Icon>auto_fix_normal</Icon>
							</ListItemIcon>
							<ListItemText primary={'Weed'} />
						</ListItemButton>
					</Link>
				</ListItem>
			</List>
			<Divider />
		</Box>
	);
};
