import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AiSuggestionPage from "../../pages/aisuggestion/AiSuggestionPage";
import MealPlannerPage from "../../pages/mealplanner/MealPlannerPage";
import RatingCommentsPage from "../../pages/ratingcomments/RatingCommentsPage";
import RecipeGenerationPage from "../../pages/recipegeneration/RecipeGenerationPage";
import SearchDiscoveryPage from "../../pages/searchdiscovery/SearchDiscoveryPage";
import ShoppingListPage from "../../pages/shoppinglist/ShoppingListPage";
import UserSubmitPage from "../../pages/usersubmit/UserSubmitPage";
import Header from "./header/Header";
import Home from "./home/Home";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Router>
        <Header />
        {/* <div className="separator"></div> */}
        <main className="layout-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="ai-suggestion" element={<AiSuggestionPage />} />
            <Route path="meal-planner" element={<MealPlannerPage />} />
            <Route path="rating-comments" element={<RatingCommentsPage />} />
            <Route
              path="recipe-generation"
              element={<RecipeGenerationPage />}
            />
            <Route path="search-discovery" element={<SearchDiscoveryPage />} />
            <Route path="shopping-list" element={<ShoppingListPage />} />
            <Route path="user-submit" element={<UserSubmitPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default Layout;
