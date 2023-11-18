import { useLocation } from "react-router-dom";
import { useMemo } from "react"; //para saber se objetos foi modificado

export function useQuery() {
  const { search } = useLocation(); //pega os parâmetros da URL

  return useMemo(() => new URLSearchParams(search), [search]); //só vai ser executada quando search for alterado
}