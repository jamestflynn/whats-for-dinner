import AddRecipe from "./pages/AddRecipe"
import EditRecipe from "./pages/EditRecipe"
import Home from "./pages/Home"
import Recipes from "./pages/Recipes"
import SignIn from "./pages/SignIn"
import SignOut from "./pages/SignOut"
import SignUp from "./pages/SignUp"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home()
    },
    {
        path: "/add-recipe",
        name: "Add Recipe",
        component: AddRecipe()
    },
    {
        path: "/edit-recipe",
        name: "Edit Recipe",
        component: EditRecipe()
    },
    {
        path: "/recipes",
        name: "Recipes",
        component: Recipes()
    },
    {
        path: "/sign-in",
        name: "Sign-In",
        component: SignIn()
    },
    {
        path: "/sign-out",
        name: "Sign-Out",
        component: SignOut()
    },
    {
        path: "/sign-up",
        name: "Sign-Up",
        component: SignUp()
    }
]

export default routes