import { db } from "../firebase/config";

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

  //register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {

      const {user} = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName
      });

      setLoading(false);

      return user;
      
    } catch (error) {

      console.log(error.message);
      console.log(typeof error.message);  

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if(error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu erro, por favor tente mais tarde.";
      }

      setLoading(false);
      setError(systemErrorMessage);

    }

  };

  //logout - sign out
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth)
  }

  //login - sign in
  const login = async(data) => { //async - para usar o await (espera o usuário para autenticação)
    checkIfIsCancelled(); //para não vazar do hook
    setLoading(true);
    setError(false);

    try {

      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);

    } catch (error) {

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
      } else if(error.message.includes("wrong-password")){
        systemErrorMessage = "Senha incorreta."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }

      setError(systemErrorMessage);
      setLoading(false);

    }

  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []); //[] diz que é só uma vez que será executada

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  }

};