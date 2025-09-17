"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'superadmin' | 'admin' | 'sales_head' | 'sales_manager' | 'sales' | 'accounts_manager' | 'accounts' | 'guest';

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define users based on your requirements
const users: Record<string, User> = {
  superadmin: { id: 'superadmin', name: 'Super Admin', role: 'superadmin' },
  admin: { id: 'admin', name: 'Admin', role: 'admin' },
  saleshead: { id: 'saleshead', name: 'Sales Head', role: 'sales_head' },
  salesmanager: { id: 'salesmanager', name: 'Sales Manager', role: 'sales_manager' },
  sales: { id: 'sales', name: 'Sales Team', role: 'sales' },
  accountsmanager: { id: 'accountsmanager', name: 'Accounts Manager', role: 'accounts_manager' },
  accounts: { id: 'accounts', name: 'Accounts Team', role: 'accounts' },
};

const getRoleFromId = (userId: string): UserRole => {
    if (userId.startsWith('superadmin')) return 'superadmin';
    if (userId.startsWith('admin')) return 'admin';
    if (userId.startsWith('saleshead')) return 'sales_head';
    if (userId.startsWith('salesmanager')) return 'sales_manager';
    if (userId.startsWith('sales')) return 'sales';
    if (userId.startsWith('accountsmanager')) return 'accounts_manager';
    if (userId.startsWith('accounts')) return 'accounts';
    return 'guest';
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const role = getRoleFromId(storedUserId);
      const name = users[storedUserId]?.name || 'Guest';
      setUser({ id: storedUserId, name, role });
    } else {
      setUser({ id: 'guest', name: 'Guest', role: 'guest' });
    }
  }, []);

  const login = (userId: string) => {
    const role = getRoleFromId(userId);
    const name = users[userId]?.name || 'Guest';
    const loggedInUser = { id: userId, name, role };
    setUser(loggedInUser);
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
    window.location.href = '/auth/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
