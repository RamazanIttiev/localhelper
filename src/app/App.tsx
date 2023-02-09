import React from 'react';
import './App.css';
import { Layout } from '../layout/layout';
import { HeaderContainer } from '../header/header.container';

// import { Pagination } from '@mui/material';

function App() {
	return (
		<div className="App">
			<HeaderContainer />
			<Layout />
			{/*<Pagination count={10} />*/}
		</div>
	);
}

export default App;
