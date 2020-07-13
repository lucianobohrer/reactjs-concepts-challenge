import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repo random ${Date.now()}`,
    });

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    .then((res) => {
      if (res.status === 204) {
        const updateRepos = repos.filter(project => project.id !== id);
        setRepos([...updateRepos]);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))
        }
      </ul>
      <input type="text" placeholder="Repository name" />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
