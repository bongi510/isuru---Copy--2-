// import React, { createContext, useState, useEffect } from "react";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// const AuthContext = createContext();
// const AuthProvider = (props) => {
//   const auth = firebase.auth();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     checkLogin();
//   }, []);

//   function checkLogin() {
//     auth.onAuthStateChanged((u) => {
//       if (u) {
//         setUser(true);
//         // getProfile();
//       } else {
//         setUser(false);
//       }
//     });
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const auth = firebase.auth();
  const [user, setUser] = useState(null);
  const [currentUser, setcurrentUser] = useState("");

  useEffect(() => {
    unsubscribe();
  }, []);

  function unsubscribe() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setcurrentUser(user);
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }
  const uid = currentUser ? currentUser.uid : null;
  if (uid === null) {
    console.log("UID is null, no user is logged in.");
  } else {
    console.log("User UID:", uid);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        uid,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
