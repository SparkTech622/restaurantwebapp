import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  // signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";;
import { addDoc, collection, getDocs } from 'firebase/firestore';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  // fetch users 
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return usersList;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };  
   
  //find user by uid
  const findUserByUid = async (uid) => {
    try {
      const users = await fetchUsers();
      const user = users.find(user => user.uid === uid);
      return user || null;
    } catch (error) {
      console.error("Error finding user by UID:", error);
      throw error;
    }
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is signed in
        setIsAuthenticated(true);
        // Fetch user data from Firestore
        findUserByUid(user.uid).then(fetchedUser => { 
          if (fetchedUser) {
             
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName || fetchedUser.name ,
          phone: fetchedUser.phone || ''
        });
      }}).catch(error => {
          console.error("Error fetching user data:", error);
          setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName || ''
          });
        }
        );

       
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const register = async (userData) => {
   
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const userCredit = userCredential.user;
      //console.log("User registered:", user.uid);
     // Update display name
      await updateProfile(userCredit, {
        displayName: userData.name
      });
      

      //  console.log("Registering user:", userCredit);
      // Update state
      setIsAuthenticated(true);
      setUser({
        uid: userCredit.uid,
        email: userCredit.email,
        name: userCredit.name
      });
      login({
        id: userCredit.uid,
        name: userData.name,
        email: userCredit.email
      });
      
      // Save user data to firebase
       await addDoc(collection(db, 'users'), {
        uid: userCredit.uid,
        name: userData.name,
        email: userCredit.email,
        phone: userData.phone || '',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error; // Re-throw the error for the component to handle
    }
  };

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};