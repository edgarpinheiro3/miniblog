import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";
//hooks
import { useAuthValue } from "../../context/AuthContext"; //pega as informações do usuário
import { useFetchDocuments } from "../../hooks/useFetchDocuments"; //pega os posts do usuário

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  //pegar posts do usuário
  const posts = [];

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts!</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div>Tem posts!</div>
      )}
    </div>
  );
};

export default Dashboard;