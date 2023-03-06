import { useState } from "react"
import { api } from "../lib/axios"

interface userProps{
  name: string,
  login: string,
  avatar_url: string, 
}

export function SearchUser(){
  const [user, setUser] = useState('')
  const [findUser, setFindUser] = useState<userProps>()

  async function handleSearchUser(){
    const response = await api.get(`/users/${user}`)
    console.log(response.data)
    setFindUser(response.data)
  }

  return(
    <>
      <div className="search">
        <input type="text" onChange={(event) => setUser(event.target.value)} />
        <button onClick={handleSearchUser}>Search</button>
      </div>
      <div className="container">
          {findUser ?
            <div className="user">
              <h4>{findUser.name}</h4>
              <img src={findUser.avatar_url} alt={findUser.name} />
              <p><strong>{findUser.login}</strong></p>
            </div>
          :
            <>
            </>
          }
      </div>
    </>
  )
}