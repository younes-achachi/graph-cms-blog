import '../styles/globals.scss';
import React, { useState, useEffect } from 'react';
import { Layout } from '../components/index';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} key={1} />
		</Layout>
	);
}

export default MyApp;
