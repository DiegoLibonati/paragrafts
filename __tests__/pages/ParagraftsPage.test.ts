import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import ParagraftsPage from "@/pages/ParagraftsPage/ParagraftsPage";

const renderPage = (): Page => {
  const page = ParagraftsPage();
  document.body.appendChild(page);
  return page;
};

describe("ParagraftsPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render a main element with the correct aria-label", () => {
      renderPage();
      expect(
        screen.getByRole("main", { name: "Lorem ipsum generator" })
      ).toBeInTheDocument();
    });

    it("should render the page title", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "TIRED OF BORING LOREM IPSUM?" })
      ).toBeInTheDocument();
    });

    it("should render the paragraphs input", () => {
      renderPage();
      expect(screen.getByLabelText("Number of paragraphs")).toBeInTheDocument();
    });

    it("should render the generate button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Generate lorem ipsum paragraphs" })
      ).toBeInTheDocument();
    });

    it("should render an empty article for generated paragraphs initially", () => {
      renderPage();
      const article = screen.getByRole("article", {
        name: "Generated paragraphs",
      });
      expect(article).toBeInTheDocument();
      expect(article.children).toHaveLength(0);
    });
  });

  describe("behavior", () => {
    describe("when the form is submitted", () => {
      it("should generate the correct number of paragraphs", async () => {
        jest.spyOn(Math, "random").mockReturnValue(0);
        const user = userEvent.setup();
        renderPage();
        const input = screen.getByLabelText("Number of paragraphs");
        const button = screen.getByRole("button", {
          name: "Generate lorem ipsum paragraphs",
        });
        await user.type(input, "3");
        await user.click(button);
        const generatedParagraphs =
          document.querySelectorAll<HTMLParagraphElement>(
            ".lorem-ipsum__paragraph"
          );
        expect(generatedParagraphs).toHaveLength(3);
      });

      it("should generate paragraphs with content from the paragraphs constant", async () => {
        jest.spyOn(Math, "random").mockReturnValue(0);
        const user = userEvent.setup();
        renderPage();
        const input = screen.getByLabelText("Number of paragraphs");
        const button = screen.getByRole("button", {
          name: "Generate lorem ipsum paragraphs",
        });
        await user.type(input, "1");
        await user.click(button);
        expect(
          screen.getByText(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          )
        ).toBeInTheDocument();
      });

      it("should clear previous paragraphs on a new submission", async () => {
        jest.spyOn(Math, "random").mockReturnValue(0);
        const user = userEvent.setup();
        renderPage();
        const input = screen.getByLabelText("Number of paragraphs");
        const button = screen.getByRole("button", {
          name: "Generate lorem ipsum paragraphs",
        });
        await user.type(input, "3");
        await user.click(button);
        await user.clear(input);
        await user.type(input, "1");
        await user.click(button);
        const generatedParagraphs =
          document.querySelectorAll<HTMLParagraphElement>(
            ".lorem-ipsum__paragraph"
          );
        expect(generatedParagraphs).toHaveLength(1);
      });

      it("should generate 0 paragraphs when input value is 0", async () => {
        const user = userEvent.setup();
        renderPage();
        const input = screen.getByLabelText("Number of paragraphs");
        const button = screen.getByRole("button", {
          name: "Generate lorem ipsum paragraphs",
        });
        await user.type(input, "0");
        await user.click(button);
        const generatedParagraphs =
          document.querySelectorAll<HTMLParagraphElement>(
            ".lorem-ipsum__paragraph"
          );
        expect(generatedParagraphs).toHaveLength(0);
      });

      it("should generate 0 paragraphs when input is empty", async () => {
        const user = userEvent.setup();
        renderPage();
        const button = screen.getByRole("button", {
          name: "Generate lorem ipsum paragraphs",
        });
        await user.click(button);
        const generatedParagraphs =
          document.querySelectorAll<HTMLParagraphElement>(
            ".lorem-ipsum__paragraph"
          );
        expect(generatedParagraphs).toHaveLength(0);
      });
    });
  });

  describe("cleanup", () => {
    it("should remove the submit event listener on cleanup", () => {
      const page = renderPage();
      const form = page.querySelector<HTMLFormElement>(".lorem-ipsum__form")!;
      const mockRemoveEventListener = jest.spyOn(form, "removeEventListener");
      page.cleanup!();
      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        "submit",
        expect.any(Function)
      );
    });
  });
});
