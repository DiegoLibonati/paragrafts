import { screen } from "@testing-library/dom";

import type { ParagraphProps } from "@/types/props";
import type { ParagraphComponent } from "@/types/components";

import Paragraph from "@/components/Paragraph/Paragraph";

const defaultProps: ParagraphProps = {
  children: "Lorem ipsum dolor sit amet.",
};

const renderComponent = (
  props: Partial<ParagraphProps> = {}
): ParagraphComponent => {
  const element = Paragraph({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Paragraph", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a paragraph element", () => {
      renderComponent();
      expect(
        screen.getByText("Lorem ipsum dolor sit amet.")
      ).toBeInTheDocument();
    });

    it("should have the paragrafts__paragraph class", () => {
      renderComponent();
      expect(screen.getByText("Lorem ipsum dolor sit amet.")).toHaveClass(
        "paragrafts__paragraph"
      );
    });

    it("should render the provided children as content", () => {
      renderComponent({ children: "Custom paragraph text." });
      expect(screen.getByText("Custom paragraph text.")).toBeInTheDocument();
    });

    it("should render an empty paragraph when children is not provided", () => {
      const element = renderComponent({ children: undefined });
      expect(element).toBeEmptyDOMElement();
    });

    it("should render an empty paragraph when children is an empty string", () => {
      const element = renderComponent({ children: "" });
      expect(element).toBeEmptyDOMElement();
    });
  });
});
