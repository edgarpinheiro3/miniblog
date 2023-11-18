import styles from "./CreatePost.module.css";

import { useState } from "react"; //para salvar no banco
import { useNavigate } from "react-router-dom"; // redirecionar após salvar
import { useAuthValue } from "../../context/AuthContext"; //pegar o usuário e atrelar no post
import { useInsertDocument } from "../../hooks/useinsertDocument";

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {user} = useAuthValue(); // pega os dados do usuário

  const {insertDocument, response} = useInsertDocument("posts"); //"posts" colection que quer criar no banco

  const handleSubmit = (e) => {
    e.preventDefault();

    //validate image URL

    //criar o array de tags

    //checar todos os valores

    insertDocument({
      title,
      image,
      body, 
      tags,
      uid: user.uid,
      createBy: user.displayName
    });

    // redirect home page


  };

  return (
  <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="text"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          >   
          </textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  )
};

export default CreatePost;