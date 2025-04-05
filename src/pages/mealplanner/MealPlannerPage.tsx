import MealCalendar from "./MealCalendar";

function MealPlannerPage() {
  return (
    <div style={homePageStyle}>
      <MealCalendar />
    </div>
  );
}

export default MealPlannerPage;

const homePageStyle = {
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
};
