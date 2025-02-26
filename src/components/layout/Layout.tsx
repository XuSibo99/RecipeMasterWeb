import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./background/Background";
import AiSuggestionPage from "../../pages/aisuggestion/AiSuggestionPage";
import MealPlannerPage from "../../pages/mealplanner/MealPlannerPage";
import RatingCommentsPage from "../../pages/ratingcomments/RatingCommentsPage";
import RecipeGenerationPage from "../../pages/recipegeneration/RecipeGenerationPage";
import SearchDiscoveryPage from "../../pages/searchdiscovery/SearchDiscoveryPage";
import ShoppingListPage from "../../pages/shoppinglist/ShoppingListPage";
import UserSubmitPage from "../../pages/usersubmit/UserSubmitPage";

function Layout() {
  return (
    <Router>
      <Routes>
        {/* The parent route uses Background as the layout */}
        <Route path="/" element={<Background />}>
          {/* Nested routes render inside the <Outlet> of Background */}
          <Route path="ai-suggestion" element={<AiSuggestionPage />} />
          <Route path="meal-planner" element={<MealPlannerPage />} />
          <Route path="rating-comments" element={<RatingCommentsPage />} />
          <Route path="recipe-generation" element={<RecipeGenerationPage />} />
          <Route path="search-discovery" element={<SearchDiscoveryPage />} />
          <Route path="shopping-list" element={<ShoppingListPage />} />
          <Route path="user-submit" element={<UserSubmitPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Layout;
