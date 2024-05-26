import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase from "../firebaseAuth"; // Ensure this imports the correct initialized app
import { useNavigation } from "expo-router";

const AuthContext = createContext({
  username: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const auth = getAuth(firebase.app()); // Ensure this gets the Firebase app instance
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (username && navigation) {
      navigation.navigate("exercise");
    }
  }, [username, navigation]);

  const login = async (email, password) => {
    console.log("Login function called with:", email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      setUsername(user.email);
      console.log("Logged in as:", user.email);
    } catch (error) {
      console.log("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUsername(null);
    } catch (error) {
      console.log("Log out failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
