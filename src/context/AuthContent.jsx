import { createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,signOut,
    onAuthStateChanged,
 } from "firebase/auth";
import { useState } from "react";
import { auth,db } from "../services/firebase";

const AuthContext = createContext();
export function AuthContextProvider({children}) {
    const [user,setUser] = useState({});
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
        return () => {
            unsubscribe()

        };
    },[])
    

    function signUp(email,password) {
        createUserWithEmailAndPassword(auth,email,password)
    }
    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }
    function logOut(){
        return signOut(auth)
    }
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
          {children}
        </AuthContext.Provider>
      );
      
}
    export function UserAuth(){
        return useContext(AuthContext)
    }
