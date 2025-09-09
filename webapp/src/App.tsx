/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mobonill <mobonill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/09/08 16:28:16 by mobonill          #+#    #+#             */
/*   Updated: 2025/09/09 10:56:23 by mobonill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import './App.css'

import { Routes, Route } from 'react-router-dom';

import Login from './components/login/Login'
// import Home from './qkwdjqkwdkqwjd' #TODO

function App() {
	return (
		<Routes>
            <Route path="/home" element={<Login/>}/>
			{/* <Route path="/home" element={Home}/> */}
		</Routes>
	)
}

export default App

