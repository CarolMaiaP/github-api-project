import { useState } from "react"
import { api } from "../lib/axios"

interface userProps{
  name: string,
  login: string,
  avatar_url: string, 
}

interface reposProps{
  name: string,
  html_url: string,
}

export function SearchUser(){
  const [user, setUser] = useState('')
  const [findUser, setFindUser] = useState<userProps>()
  const [repos, setRepos] = useState<reposProps[]>()

  async function handleSearchUser(){
    const response = await api.get(`/users/${user}`)
    console.log(response.data)
    setFindUser(response.data)
  }

  async function handleUserRepos(){
    const res = await api.get(`https://api.github.com/users/${user}/repos`)
    console.log(res.data)
    setRepos(res.data)
  }

  return(
    <>
      <div className="search">
        <input type="text" placeholder="Type a github username" onChange={(event) => setUser(event.target.value)} />
        <button onClick={handleSearchUser}>Search</button>
      </div>
      <div className="container">
          {findUser ?
            <div className="users">
              <div className="user">
                <img src={findUser.avatar_url} alt={findUser.name} />
                <div className="user-infos">
                  <h4>{findUser.name}</h4>
                  <p><strong>{findUser.login}</strong></p>
                </div>
              </div>
              <div className="repo-button">
                <button onClick={handleUserRepos}>Load Repos</button>
              </div>
            </div>
          :
            <>
            </>
          }

          {repos ?
            <div className="repos">
              {repos.map((repo) => {
                return(
                  <div className="repo">
                    <a href={repo.html_url} target="_blank">
                     <h4>{repo.name}</h4>
                    </a>
                  </div>
                )
              })}
            </div>
          :
            ""
          }
      </div>
    </>
  )
}