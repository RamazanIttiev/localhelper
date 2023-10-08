import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';
import { Input } from 'reactkit/input';
import { Separator } from 'reactkit/separator';

import { Box, Container } from '@mui/material';

import { ProfileModel } from 'pages/profile/model/profile.model';

import profileImage from 'assets/profileImage.jpeg';

import { theme } from 'theme/theme';

interface Props {
	errors: FieldErrors<ProfileModel>;
	register: UseFormRegister<ProfileModel>;
}

export const ProfileComponent = ({ register, errors }: Props) => {
	return (
		<Container>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box
					sx={{
						background: theme.tg_theme.palette.bg_color,
						width: 'fit-content',
						padding: '13px',
						borderTopLeftRadius: theme.tg_theme.borderRadius.base,
						borderBottomLeftRadius: theme.tg_theme.borderRadius.base,
					}}>
					<Box component={'img'} src={profileImage} sx={{ borderRadius: '50%', height: '3.5rem' }} />
				</Box>
				<Box sx={{ width: '100%' }}>
					<Input
						required
						type={'text'}
						register={register}
						fieldName={'userName'}
						requiredMessage={'Name is required'}
						pattern={/^[a-zA-Z]+$/}
						patternMessage={"I guess that's not a valid name..."}
						error={errors.userName !== undefined}
						placeholder={'Name'}
						sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
					/>
					<Separator
						sx={{
							width: '95%',
							height: '0.5px',
							background: theme.tg_theme.palette.secondary_bg_color,
							ml: 'auto',
						}}
					/>
					<Input
						type={'text'}
						register={register}
						fieldName={'userLastname'}
						pattern={/^[a-zA-Z]+$/}
						patternMessage={"I guess that's not a valid last name..."}
						error={errors.userLastname !== undefined}
						placeholder={'Last name'}
						sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0 }}
					/>
				</Box>
			</Box>
			<HintText text={'Enter your name and add a profile photo.'} sx={{ textTransform: 'none', pl: 1, mt: 1 }} />
		</Container>
	);
};
