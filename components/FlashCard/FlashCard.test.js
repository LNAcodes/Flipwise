import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FlashCard from "./index";

describe("FlashCard", () => {
  const question = "What is the powerhouse of the cell?";
  const answer = "The mitochondrion.";

  it("shows the question on the front side initially", () => {
    render(<FlashCard question={question} answer={answer} />);
    expect(screen.getByText(question)).toBeInTheDocument();
    expect(screen.getByText("Question")).toBeInTheDocument();
  });

  it("shows 'Flip to show answer' hint on the front side", () => {
    render(<FlashCard question={question} answer={answer} />);
    expect(screen.getByText(/Flip to show answer/i)).toBeInTheDocument();
  });

  it("flips to show the answer when clicked", async () => {
    const user = userEvent.setup();
    render(<FlashCard question={question} answer={answer} />);
    await user.click(screen.getByText(question));
    expect(screen.getByText(answer)).toBeInTheDocument();
    expect(screen.getByText("Answer")).toBeInTheDocument();
  });

  it("flips back to the question when clicked again", async () => {
    const user = userEvent.setup();
    render(<FlashCard question={question} answer={answer} />);
    await user.click(screen.getByText(question));
    await user.click(screen.getByText(answer));
    expect(screen.getByText(question)).toBeInTheDocument();
  });

  it("is keyboard accessible and flips on Enter key", async () => {
    const user = userEvent.setup();
    render(<FlashCard question={question} answer={answer} />);
    const card = screen.getByRole("button");
    card.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText(answer)).toBeInTheDocument();
  });

  it("has correct aria-label on front side", () => {
    render(<FlashCard question={question} answer={answer} />);
    expect(
      screen.getByRole("button", { name: /flip flashcard to show answer/i })
    ).toBeInTheDocument();
  });
});
