import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateMealDialog from "../pages/mealplanner/CreateMealDialog";
import { expect, test, vi, describe, beforeEach } from "vitest";
import UpdateMealDialog from "../pages/mealplanner/UpdateMealDialog";
import DeleteMealDialog from "../pages/mealplanner/DeleteMealDialog";
import { TestProviders } from "./TestProviders";

const defaultMeal = {
  id: "meal-123",
  title: "Lunch",
  name: "Chicken Salad",
  start: "2025-05-01",
  userId: "sibo.xu",
};

const deleteSpy = vi.fn();

describe("CreateMealDialog", () => {
  test("renders form inputs", () => {
    render(
      <CreateMealDialog
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        defaultDate="2024-01-01"
      />
    );

    expect(screen.getByLabelText(/Meal Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Meal Name/i)).toBeInTheDocument();
  });

  test("submits correct data and closes the form", async () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    render(
      <CreateMealDialog
        open={true}
        onClose={handleClose}
        onSubmit={handleSubmit}
        defaultDate="2030-01-01"
      />
    );

    await userEvent.type(screen.getByLabelText(/Meal Title/i), "Dinner");
    await userEvent.type(screen.getByLabelText(/Meal Name/i), "Steak");
    await userEvent.type(screen.getByLabelText(/User ID/i), "sibo.xu");

    await userEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: "Dinner",
      name: "Steak",
      start: "2030-01-01",
      userId: "sibo.xu",
    });

    expect(handleClose).toHaveBeenCalled();
  });

  test("shows error messages when required fields are empty", async () => {
    render(
      <CreateMealDialog
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        defaultDate="2025-04-01"
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(screen.getByText(/Meal title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Meal name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/User ID is required/i)).toBeInTheDocument();
  });
});

describe("UpdateMealDialog", () => {
  test("renders with default values", () => {
    render(
      <TestProviders>
        {" "}
        <UpdateMealDialog
          open={true}
          onClose={() => {}}
          onSubmit={() => {}}
          defaultValues={defaultMeal}
        />{" "}
      </TestProviders>
    );

    expect(screen.getByLabelText(/Meal Title/i)).toHaveValue("Lunch");
    expect(screen.getByLabelText(/Meal Name/i)).toHaveValue("Chicken Salad");
    expect(screen.getByLabelText(/Start Date/i)).toHaveValue("2025-05-01");
    expect(screen.getByLabelText(/User ID/i)).toHaveValue("sibo.xu");
  });

  test("submits updated values", async () => {
    const handleSubmit = vi.fn();

    render(
      <TestProviders>
        <UpdateMealDialog
          open={true}
          onClose={() => {}}
          onSubmit={handleSubmit}
          defaultValues={defaultMeal}
        />
      </TestProviders>
    );

    await userEvent.clear(screen.getByLabelText(/Meal Name/i));
    await userEvent.type(screen.getByLabelText(/Meal Name/i), "Sushi Bowl");

    await userEvent.click(screen.getByRole("button", { name: /Update/i }));

    expect(handleSubmit).toHaveBeenCalledWith("meal-123", {
      title: "Lunch",
      name: "Sushi Bowl",
      start: "2025-05-01",
      userId: "sibo.xu",
      id: "meal-123",
    });
  });

  test("calls onClose when cancel is clicked", async () => {
    const handleClose = vi.fn();

    render(
      <TestProviders>
        <UpdateMealDialog
          open={true}
          onClose={handleClose}
          onSubmit={() => {}}
          defaultValues={defaultMeal}
        />
      </TestProviders>
    );

    await userEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(handleClose).toHaveBeenCalled();
  });

  test("opens delete confirmation dialog", async () => {
    render(
      <TestProviders>
        <UpdateMealDialog
          open={true}
          onClose={() => {}}
          onSubmit={() => {}}
          defaultValues={defaultMeal}
        />
      </TestProviders>
    );

    await userEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(
      screen.getAllByText(
        (_, element) =>
          element?.textContent?.includes(
            "Are you sure you want to delete Lunch"
          ) ?? false
      ).length
    ).toBeGreaterThan(0);
  });
});

// Create the spy outside the mock so we can track calls

// Use vi.mock with vi.importActual to keep the rest of the module intact
vi.mock("../../services/mealevent/useDeleteMealEvent", async () => {
  const actual = await vi.importActual<
    typeof import("../services/mealevent/useDeleteMealEvent")
  >("../../services/mealevent/useDeleteMealEvent");

  return {
    ...actual,
    useDeleteMealEvent: () => ({
      deleteMeal: deleteSpy,
    }),
  };
});

describe("DeleteMealDialog", () => {
  beforeEach(() => {
    deleteSpy.mockClear();
  });

  const defaultProps = {
    open: true,
    id: "meal-123",
    itemName: "A testing meal",
  };

  test("renders confirmation message", () => {
    render(
      <TestProviders>
        <DeleteMealDialog {...defaultProps} onClose={() => {}} />
      </TestProviders>
    );
    expect(
      screen.getAllByText(
        (_, element) =>
          element?.textContent?.includes(
            "Are you sure you want to delete A testing meal"
          ) ?? false
      ).length
    ).toBeGreaterThan(0);
  });

  test("calls onClose when cancel is clicked", async () => {
    const handleClose = vi.fn();

    render(
      <TestProviders>
        <DeleteMealDialog {...defaultProps} onClose={handleClose} />
      </TestProviders>
    );

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(handleClose).toHaveBeenCalled();
  });
});
