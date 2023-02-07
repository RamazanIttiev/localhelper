import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	return (
		<Container sx={{ pt: 2 }}>
			<Typography>Food</Typography>
			<Grid container spacing={2} sx={{ pt: 2 }}>
				<Grid item xs={6}>
					<Card>
						<CardContent>
							<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
								Word of the Day
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Learn More</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={6}>
					<Card>
						<CardContent>
							<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
								Word of the Day
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Learn More</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};
