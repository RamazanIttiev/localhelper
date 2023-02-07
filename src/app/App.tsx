import React from 'react';
import './App.css';
import { Layout } from '../layout/layout';
import { HeaderContainer } from '../header/header.container';

function App() {
	return (
		<div className="App">
			<HeaderContainer />
			<Layout />
		</div>
	);
}

export default App;
