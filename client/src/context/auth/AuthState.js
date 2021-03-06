import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	// state allows access to what is in state
	// dispatch allows to dispatch objects to reducer
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User
	const loadUser = () => {
		console.log('Load User');
	};

	// Register User
	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/users', formData, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg
			});
		}
	};

	// Login User
	const login = () => {
		console.log('Login');
	};
	// Logout
	const logout = () => {
		console.log('Logout');
	};
	// Clear Errors
	const clearErrors = () => {
		const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				login,
				loadUser,
				logout,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
