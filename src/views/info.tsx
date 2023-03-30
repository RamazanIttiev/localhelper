import React from 'react';
import { device, isUserAgentTelegram } from '../utils/user-agent';
import { browserName, deviceType, engineName, isAndroid, isDesktop, isIOS, isMobile } from 'react-device-detect';
import { Outlet } from 'react-router-dom';
export const Info = () => (
	<div>
		<strong>{isUserAgentTelegram ? 'UserAgent is Telegram' : 'UserAgent is Browser'}</strong>
		<br />
		<br />
		{isIOS ? (
			<strong>BrowserName: {browserName === 'WebKit' ? 'ios WebKit' : browserName}</strong>
		) : isAndroid ? (
			<strong>BrowserName: {browserName === 'Chrome WebView' ? 'android Chrome WebView' : browserName}</strong>
		) : (
			browserName
		)}
		<br />
		<br />
		Device data
		<br />
		<p style={{ overflow: 'auto' }}>{JSON.stringify(device)}</p>
		<br />
		<br />
		<p>EngineName: {engineName}</p>
		<br />
		<br />
		<p>DeviceType: {deviceType}</p>
		<br />
		<br />
		{isDesktop ? 'isDesktop' : isMobile ? 'isMobile' : null}
		<Outlet />
	</div>
);
