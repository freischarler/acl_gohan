// useAuth.js
import { useContext } from 'react';
import AuthContext from './AuthContext'; // Adjust the path as necessary

const useAuth = () => useContext(AuthContext);

export default useAuth;