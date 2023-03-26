import { browserName, deviceDetect, getUA } from 'react-device-detect';

const device = JSON.stringify(deviceDetect(getUA));

const deviceIsNull = device === null;
export const isUserAgentTelegram = deviceIsNull || browserName === 'WebKit' || browserName === 'Chrome WebView';
