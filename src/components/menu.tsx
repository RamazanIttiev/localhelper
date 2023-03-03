import React, { FC } from 'react';
import { Box, Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { categories } from '../utils/categories';
import { Category } from '../models/categories';

interface MenuProps {
	handleToggle: (isOpened: boolean) => () => void;
}

export const Menu: FC<MenuProps> = ({ handleToggle }) => {
	return (
		<Box role="presentation" onClick={handleToggle(false)}>
			<List>
				{categories.map(({ title, icon }: Category) => {
					return (
						<ListItem key={title} disablePadding>
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
