import { useContext } from 'react'

import { AuthContext } from './AuthContext'
import { NavigationContext, NavType } from './NavigationContext'

export const useAuthState = () => useContext(AuthContext)
export const useNavigationState = () => useContext(NavigationContext)
export { NavType }
