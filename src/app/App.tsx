import React from 'react';
import Airtable from 'airtable';
import { Layout } from '../views/layout';
import { HeaderContainer } from '../views/header/header.container';

import './App.css';

export const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

export const App = () => {
	return (
		<div className="App">
			<HeaderContainer />
			<Layout />
		</div>
	);
};

export default App;
