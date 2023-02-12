import React, { FC } from 'react';
import { Box, Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { menuList } from '../utils/menuList';

interface MenuProps {
	handleToggle: (isOpened: boolean) => () => void;
}

export const Menu: FC<MenuProps> = ({ handleToggle }) => {
	return (
		<Box role="presentation" onClick={handleToggle(false)}>
			<List>
				{menuList.map(({ title, icon }) => {
					return (
						<ListItem key={1} disablePadding>
							<Link style={{ width: '100%' }} to={`categories/${title}`.toLowerCase()}>
								<ListItemButton>
									<ListItemIcon>
										<Icon>{icon}</Icon>
									</ListItemIcon>
									<ListItemText primary={title} />
								</ListItemButton>
							</Link>
						</ListItem>
					);
				})}
			</List>
			<Divider />
		</Box>
	);
};
