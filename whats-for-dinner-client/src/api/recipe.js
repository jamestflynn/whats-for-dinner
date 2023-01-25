import WHATS_FOR_DINNER_API_URL from "./index"

const importRecipe = (values) =>
  new Promise((resolve, reject) => {
    console.log("importRecipe")
    console.log(values)
    console.log("url: " + WHATS_FOR_DINNER_API_URL)
    fetch(`${WHATS_FOR_DINNER_API_URL}/scrape_recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ values }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("importRecipe - data")
        resolve(data)
      })
      .catch((error) => {
        console.log("importRecipe - error")
        reject(error)
      })
  })

const getRecipe = () =>
    new Promise((resolve,reject) => {
        console.log("getRecipe hit")
        fetch(URL+'/recipes/1', {
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


const getRecipes = () =>
    new Promise((resolve,reject) => {
        console.log("getRecipes hit")
        fetch('https://randomuser.me/api/', {
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

export { importRecipe, getRecipe, getRecipes}