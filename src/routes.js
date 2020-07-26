import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/NewLoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/privateRecipe/:recipeId",
    name: "privateRecipe",
    component: () => import("./pages/PrivateRecipeViewPage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoriteRecipesPage"),
  },
  {
    path: "/familyRecipeFull/:recipeId",
    name: "familyRecipeFull",
    component: () => import("./pages/FamilyRecipeViewPage"),
  },
  
  {
    path: "/FamilyRecipe",
    name: "familyRecipe",
    component: () => import("./pages/FamilyRecipe"),
  },
  {
    path: "/PrivateRecipes",
    name: "privateRecipes",
    component: () => import("./pages/PrivateRecipesPage"),
  },
  
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
