import React, { useEffect, useState } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(({ data }) => {
      setRepositories(data)
    })
  }, [])

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: `Desafio ReactJS - ${Date.now()}`,
      url: 'https://github.com/danielversiane13',
      techs: ['React', 'Node.js']
    })

    if (res.status === 200) {
      setRepositories([...repositories, res.data])
    }
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`/repositories/${id}`)
    if (res.status === 204) {
      const repositoryIndex = repositories.findIndex(r => r.id === id)

      if (repositoryIndex >= 0) {
        const tempRepositories = repositories
        tempRepositories.splice(repositoryIndex, 1)
        setRepositories([...tempRepositories])
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
