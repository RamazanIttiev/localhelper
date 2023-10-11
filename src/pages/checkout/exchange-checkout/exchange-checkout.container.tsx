import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useChange } from 'pages/checkout/exchange-checkout/hooks/useChange';
import { useRateFetcher } from 'pages/checkout/exchange-checkout/hooks/useRateFetcher';
import { useReceive } from 'pages/checkout/exchange-checkout/hooks/useReceive';
import { ExchangeForm } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';
import { ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model';
import { useBase } from 'pages/checkout/hooks/checkout.hook';

import { getTelegramUser } from 'actions/webApp-actions';

import { ReactComponent as RupeeIcon } from 'assets/svg/rupee.svg';
import { ReactComponent as USDIcon } from 'assets/svg/usd.svg';

import { theme } from 'theme/theme';

import { ExchangeCheckoutComponent } from './exchange-checkout.component';

export const ExchangeContainer = () => {
	const { state } = useLocation();
	const [impactOccurred, notificationOccurred] = useHapticFeedback();


  const [amountToReceive, setAmountToReceive] = useState(0);

  useEffect(() => {
    const resolveAmount = async () => {
      const amount = await exchangeRate;

      setAmountToReceive(amount);
    };

    resolveAmount();
  }, [exchangeRate]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
	} = useForm<ExchangeForm>({
		defaultValues: { currencyToChange: 'USD' },
	});

	const amountToChange = useWatch({ control, name: 'amountToChange' });
	const currencyToChange = useWatch({ control, name: 'currencyToChange' });

	const exchangeRate = useRateFetcher(currencyToChange);
	const toChangeState = useChange(currencyToChange);
	const toReceiveState = useReceive(exchangeRate, amountToChange);

	const flowId: string = state;

	const { onSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<ExchangeFormFields>({
			defaultValues: { userName: tgUser?.first_name, currency: 'USDT' },
		}),
		{ currencyToChange: 'USDT', currencyToReceive: 'LK', amountToReceive },
	);

  const amountToChange = useWatch({ control, name: 'amountToChange' });
  const currencyToChange = useWatch({ control, name: 'currencyToChange' });

  const exchangeRate = useRateFetcher(currencyToChange);
  const toChangeState = useChange(currencyToChange);
  const toReceiveState = useReceive(exchangeRate, amountToChange);

	return (
		<>
			<ExchangeCheckoutComponent
				errors={errors}
				register={register}
				exchangeRate={exchangeRate}
				control={control}
				toChangeState={toChangeState}
				toReceiveState={toReceiveState}
			/>
			<MainButton
				text="Exchange"
				onClick={onSubmit}
				disabled={isSubmitting}
				progress={isSubmitting}
				color={
					isSubmitting ? theme.tg_theme.palette.button_disabled_color : theme.tg_theme.palette.button_color
				}
			/>
		</>
	);
};
