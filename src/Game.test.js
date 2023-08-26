import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

describe("Game", () => {
  test("renders Game component", () => {
    render(<Game />);

    // square
    const squareList = screen.getAllByRole("button", { name: "" });
    squareList.forEach((button) => {
      expect(button.innerHTML).toEqual("");
    });

    // next player
    const nextPlayerElement = screen.getByText(/Next player/i);
    expect(nextPlayerElement.innerHTML).toEqual("Next player: X");

    // toggle button
    expect(screen.getByText("昇順")).toBeInTheDocument();

    // history
    const historyList = screen.getAllByText(/Go to/i);
    expect(historyList.map((history) => history.innerHTML)).toEqual([
      "Go to game start",
    ]);
  });

  test("click once square", () => {
    render(<Game />);

    // square
    const squareList = screen.getAllByRole("button", { name: "" });

    // 左上をクリックする
    userEvent.click(
      squareList.filter((square) => square.dataset.num === "0")[0]
    );

    squareList.forEach((button) => {
      const expected = button.dataset.num === "0" ? "X" : "";
      expect(button.innerHTML).toEqual(expected);
    });

    // next player
    const nextPlayerElement = screen.getByText(/Next player/i);
    expect(nextPlayerElement.innerHTML).toEqual("Next player: O");

    // toggle button
    expect(screen.getByText("昇順")).toBeInTheDocument();

    // history
    const historyList = screen.getAllByText(/Go to/i);
    expect(historyList.map((history) => history.innerHTML)).toEqual([
      "Go to game start",
      "Go to move #1 (1, 1)",
    ]);
  });

  test("click twice square", () => {
    render(<Game />);

    // square
    const squareList = screen.getAllByRole("button", { name: "" });

    // 2回をクリックする
    ["0", "4"]
      .map(
        (target) =>
          squareList.filter((square) => square.dataset.num === target)[0]
      )
      .forEach((square) => userEvent.click(square));

    squareList.forEach((button) => {
      let expected;
      switch (button.dataset.num) {
        case "0":
          expected = "X";
          break;
        case "4":
          expected = "O";
          break;
        default:
          expected = "";
          break;
      }
      expect(button.innerHTML).toEqual(expected);
    });

    // next player
    const nextPlayerElement = screen.getByText(/Next player/i);
    expect(nextPlayerElement.innerHTML).toEqual("Next player: X");

    // toggle button
    expect(screen.getByText("昇順")).toBeInTheDocument();

    // history
    const historyList = screen.getAllByText(/Go to/i);
    expect(historyList.map((history) => history.innerHTML)).toEqual([
      "Go to game start",
      "Go to move #1 (1, 1)",
      "Go to move #2 (2, 2)",
    ]);
  });

  test("click same square", () => {
    render(<Game />);

    // square
    const squareList = screen.getAllByRole("button", { name: "" });

    // 左上を3回クリックする
    ["0", "0", "0"]
      .map(
        (target) =>
          squareList.filter((square) => square.dataset.num === target)[0]
      )
      .forEach((button) => userEvent.click(button));

    squareList.forEach((button) => {
      const expected = button.dataset.num === "0" ? "X" : "";
      expect(button.innerHTML).toEqual(expected);
    });

    // next player
    const nextPlayerElement = screen.getByText(/Next player/i);
    expect(nextPlayerElement.innerHTML).toEqual("Next player: O");

    // toggle button
    expect(screen.getByText("昇順")).toBeInTheDocument();

    // history
    const historyList = screen.getAllByText(/Go to/i);
    expect(historyList.map((history) => history.innerHTML)).toEqual([
      "Go to game start",
      "Go to move #1 (1, 1)",
    ]);
  });

  test("click toggle", () => {
    render(<Game />);

    // square
    const squareList = screen.getAllByRole("button", { name: "" });

    // 2回をクリックする
    ["0", "4"]
      .map(
        (target) =>
          squareList.filter((square) => square.dataset.num === target)[0]
      )
      .forEach((square) => userEvent.click(square));

    // toggle button
    const toggle = screen.getByText("昇順");
    userEvent.click(toggle);
    expect(toggle.innerHTML).toEqual("降順");

    // history
    const historyList = screen.getAllByText(/Go to/i);
    expect(historyList.map((history) => history.innerHTML)).toEqual([
      "Go to move #2 (2, 2)",
      "Go to move #1 (1, 1)",
      "Go to game start",
    ]);
  });

  test("draw game", () => {
    render(<Game />);

    // square
    const squareList = screen.getAllByRole("button", { name: "" });

    // 下記を順番にクリックする
    ["0", "4", "2", "1", "7", "3", "5", "8", "6"].forEach((target) => {
      userEvent.click(
        squareList.filter((square) => square.dataset.num === target)[0]
      );
    });

    squareList.forEach((button) => {
      expect(button.innerHTML).toMatch(/[XO]/);
    });

    // next player
    expect(screen.queryByText(/Next player/i)).toBeNull();

    // draw
    expect(screen.getByText(/Draw/i)).toBeInTheDocument();

    // toggle button
    expect(screen.getByText("昇順")).toBeInTheDocument();

    // history
    const historyList = screen.getAllByText(/Go to/i);
    expect(historyList.length).toEqual(10);
  });
});

// describe('Square', () => {
//     it('rendering', () => {
//         render(<Square></Square>)
//     });
// });