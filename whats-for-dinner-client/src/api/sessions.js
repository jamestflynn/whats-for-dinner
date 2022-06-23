import URL from "./index"

const destroySession = () =>
  new Promise((resolve, reject) => {
    fetch(`${URL}/sessions`, {
      method: "DELETE",
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

export { destroySession }