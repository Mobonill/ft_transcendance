/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Login.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mobonill <mobonill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/09/08 16:38:43 by mobonill          #+#    #+#             */
/*   Updated: 2025/09/09 13:19:39 by mobonill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// import login from '../../style/login/login.css'
import Button42 from './utils/Button42'

export default function Login() {

	return (
		<div className="login">
			<a href='http://localhost:3000/auth/42/login'>
			<Button42/>
			</a>
		</div>
	)
}