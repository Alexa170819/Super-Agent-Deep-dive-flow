/**
 * RoleContext Provider
 * Manages user role from URL parameters and provides role-based functionality
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const RoleContext = createContext(null);

/**
 * RoleContext Provider Component
 * Reads role from URL parameter (?role=cfo) and provides it to children
 */
export function RoleProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [role, setRole] = useState('cfo'); // Default to 'cfo'
  
  // Read role from URL parameter on mount and when params change
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam) {
      // Validate role
      const validRoles = ['cfo', 'financial-manager', 'regional-manager', 'marketing-director'];
      if (validRoles.includes(roleParam)) {
        setRole(roleParam);
      } else {
        // Invalid role, default to cfo
        setRole('cfo');
      }
    } else {
      // No role parameter, default to cfo
      setRole('cfo');
    }
  }, [searchParams]);
  
  /**
   * Update role in URL and state
   */
  const updateRole = (newRole) => {
    const validRoles = ['cfo', 'financial-manager', 'regional-manager', 'marketing-director'];
    if (validRoles.includes(newRole)) {
      setRole(newRole);
      setSearchParams({ role: newRole });
    }
  };
  
  const value = {
    role,
    updateRole
  };
  
  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

/**
 * Hook to use RoleContext
 * @returns {Object} { role, updateRole }
 */
export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

/**
 * Get role display name
 * @param {string} role - Role identifier
 * @returns {string} Display name
 */
export function getRoleDisplayName(role) {
  const displayNames = {
    'cfo': 'CFO',
    'financial-manager': 'Financial Manager',
    'regional-manager': 'Regional Manager',
    'marketing-director': 'Marketing Director'
  };
  return displayNames[role] || 'CFO';
}
