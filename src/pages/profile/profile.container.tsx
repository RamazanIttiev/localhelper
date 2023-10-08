import React from 'react';
import { useForm } from 'react-hook-form';

import { ProfileModel } from 'pages/profile/model/profile.model';
import { ProfileComponent } from 'pages/profile/profile.component';

import { getTelegramUser } from 'actions/webApp-actions';

export const ProfileContainer = () => {
	const tgUser = getTelegramUser();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ProfileModel>({
		defaultValues: { userName: tgUser?.first_name, userLastname: tgUser?.last_name },
	});

	return <ProfileComponent errors={errors} register={register} />;
};
