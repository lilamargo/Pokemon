import { render, screen } from "@testing-library/react";
import App from "./App";
import Card from "./components/Card";

const pokemon = {
  name: "Test",
  image:
    "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb.jpg",
};

describe("Landing Page", () => {
  render(<App />);
  const button = screen.getByRole("button");

  it("Should render a button to enter Home", () => {
    expect(button).toBeInTheDocument();
  });
});

describe("Pokemon Card", () => {
  render(<Card {...pokemon} />);
  const name = screen.getByTestId("name");
  const image = screen.getByTestId("image");

  it("Name should render a name", () => {
    expect(name.innerHTML).toBe("Test");
  });

  it("Image should render a image", () => {
    expect(image.src).toBe(
      "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb.jpg"
    );
  });
});
