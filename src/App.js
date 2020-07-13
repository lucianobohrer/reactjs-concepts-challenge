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
    // TODO
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    .then(() => {
      const index = repos.findIndex( repo => repo.id === id);
      if (index >= 0) {
        const updateRepos = repos.filter(project => project.id !== id);
        setRepos([...updateRepos]);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
