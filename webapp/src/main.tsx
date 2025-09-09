/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mobonill <mobonill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/09/08 16:28:22 by mobonill          #+#    #+#             */
/*   Updated: 2025/09/09 10:51:32 by mobonill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
