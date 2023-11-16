import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup (não deixa resquisios de funções sendo executadas aindas. Para não ter problema de limite de memória)

  const [cancelled, setCancelled] = useState(false); // só vai ser cancelado depois que as coisas derem certas

  const auth = getAuth() //invoca para utilizar funções a partir desse cara

  function checkIfIsCancelled() { //nosso cleanup (evitar o vazamento de memória)
    if (cancelled) {
      return;
    }
  }

};