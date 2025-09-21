import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token && username) {
            setUser({ username, token });
        }

        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);

            if (response.success) {
                const { token, username: user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', user);
                setUser({ username: user, token });
                return { success: true };
            } else {
                return { success: false, message: response.message };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (username, password, email, craftType) => {
        try {
            const response = await authService.register(username, password, email, craftType);

            if (response.success) {
                const { token, username: user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', user);
                setUser({ username: user, token });
                return { success: true };
            } else {
                return { success: false, message: response.message };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};