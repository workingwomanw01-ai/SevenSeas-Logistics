"use client";
import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

const ShipmentContext = createContext();

export function ShipmentProvider({ children }) {    const [user, setUser] = useState(null);
    const [rem, setRem] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);useEffect(() => {        // Check for stored user on mount (only on client side)
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(storedUser);
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email);
                setIsAuthenticated(true);            } else {
                setUser(null);
                setIsAuthenticated(false);
                if (typeof window !== 'undefined') {
                    localStorage.removeItem("user");
                }
            }
            setAuthLoading(false);
        });        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setIsAuthenticated(false);
            if (typeof window !== 'undefined') {
                localStorage.removeItem("user");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (        <ShipmentContext.Provider value={{ 
            user, 
            setUser, 
            rem, 
            setRem, 
            isAuthenticated, 
            setIsAuthenticated,
            authLoading,
            logout
        }}>
            {children}
        </ShipmentContext.Provider>
    );
}

export default ShipmentContext;
