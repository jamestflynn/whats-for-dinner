import URL from "./index"

const createUser = (values) =>
  new Promise((resolve, reject) => {
    fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user: values }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })

const getUsers = () =>
  new Promise((resolve, reject) => {
      console.log("test")
    fetch(`https://randomuser.me/api/?results=5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })

const getMe = () =>
  new Promise((resolve, reject) => {
    fetch(`${URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })

export { createUser, getUsers, getMe }