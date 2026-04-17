import type { Page } from "@/types/pages";

import Paragraph from "@/components/Paragraph/Paragraph";

import paragraphs from "@/constants/paragraphs";

import "@/pages/ParagraftsPage/ParagraftsPage.css";

const ParagraftsPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "paragrafts-page";
  main.setAttribute("aria-label", "Lorem ipsum generator");

  main.innerHTML = `
    <section class="header-app" aria-label="Page header">
        <div class="header-app__content">
            <h1 class="header-app__title">TIRED OF BORING LOREM IPSUM?</h1>
        </div>
    </section>

    <section class="paragrafts" aria-label="Lorem ipsum generator">
        <form class="paragrafts__form" aria-label="Paragraph count form">
            <div class="paragrafts__content">
                <label for="paragraphs-input" class="paragrafts__label">Paragraphs:</label>
                <input type="number" id="paragraphs-input" class="paragrafts__input" aria-label="Number of paragraphs" />
            </div>
            <button
                type="submit"
                aria-label="Generate lorem ipsum paragraphs"
                class="paragrafts__btn-generate"
            >
                GENERATE
            </button>
        </form>

        <article class="paragrafts__paragraphs" aria-label="Generated paragraphs" aria-live="polite"></article>
    </section>
  `;

  const onSubmitForm = (e: SubmitEvent): void => {
    e.preventDefault();

    const paragraphsList = main.querySelector<HTMLElement>(
      ".paragrafts__paragraphs"
    )!;
    const input = main.querySelector<HTMLInputElement>(".paragrafts__input")!;

    paragraphsList.replaceChildren();

    const valueGenerate = Number(input.value);

    for (let i = 0; i < valueGenerate; i++) {
      const randomValue = Math.floor(Math.random() * paragraphs.length);
      const paragraph = paragraphs[randomValue]!;

      const paragraphElement = Paragraph({
        children: paragraph,
      });

      paragraphsList.append(paragraphElement);
    }
  };

  const form = main.querySelector<HTMLFormElement>(".paragrafts__form")!;

  form.addEventListener("submit", onSubmitForm);

  main.cleanup = (): void => {
    form.removeEventListener("submit", onSubmitForm);
  };

  return main;
};

export default ParagraftsPage;
