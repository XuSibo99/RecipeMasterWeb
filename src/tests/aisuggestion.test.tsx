import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AiSuggestionPage from "../pages/aisuggestion/AiSuggestionPage";
import { describe, test, expect } from "vitest";
import { TestProviders } from "./TestProviders";

describe("AiSuggestionPage", () => {
  test("renders initial UI", () => {
    render(
      <TestProviders>
        <AiSuggestionPage />
      </TestProviders>
    );
    expect(
      screen.getByText(/AI-Powered Recipe Suggestions/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /suggest recipes/i })
    ).toBeDisabled();
  });

  test("enables the button when prompt is entered", async () => {
    render(
      <TestProviders>
        <AiSuggestionPage />
      </TestProviders>
    );
    await userEvent.type(screen.getByRole("textbox"), "salmon ideas");
    expect(
      screen.getByRole("button", { name: /suggest recipes/i })
    ).toBeEnabled();
  });

  //   test("shows loading and then suggestions after submit", async () => {
  //     render(
  //       <TestProviders>
  //         <AiSuggestionPage />
  //       </TestProviders>
  //     );
  //     await userEvent.type(screen.getByRole("textbox"), "salmon ideas");

  //     await userEvent.click(
  //       screen.getByRole("button", { name: /suggest recipes/i })
  //     );

  //     // await waitFor(() =>
  //     //   expect(
  //     //     screen.getByRole("button", { name: /generating.../i })
  //     //   ).toBeDisabled()
  //     // );

  //     await waitFor(() => {
  //       const items = screen.getAllByRole("ListItem");
  //       const found = items.some((item) =>
  //         item.textContent
  //           ?.toLowerCase()
  //           .includes("salmon rice bowl with broccoli")
  //       );
  //       expect(found).toBe(true);
  //     });
  //   });
});
