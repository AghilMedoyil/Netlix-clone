import { createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,signOut,
    onAuthStateChanged,
 } from "firebase/auth";
import { useState } from "react";
import { auth,db } from "../services/firebase";
import { setPersistence, browserSessionPersistence, browserLocalPersistence, inMemoryPersistence } from "firebase/auth";


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
    

    async function signUp(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await signOut(auth);
        return { success: true };
    } catch (error) {

        let errorMessage = "Signup failed!";
        if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use!";
        }
        else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters!";
        }
        return { success: false, error: errorMessage };
    }
    }

    async function logIn(email,password){
        try{
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth,email,password)
            return {success: true}
        }catch(error){
            console.log(error)
            let errorMessage = "Login failed"
 
        if (error.code === "auth/invalid-credential") {
            errorMessage = "Incorrect email or password";
        }
        return { success:false,error: errorMessage }
        }
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
