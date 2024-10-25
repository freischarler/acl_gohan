import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    /*useEffect(() => {
        // Fetch user data from a secure source, e.g., an API
        const fetchUser = async () => {
            const response = await fetch('/api/user');
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, []);*/

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext };