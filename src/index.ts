import "@/index.css";
import ParagraftsPage from "@/pages/ParagraftsPage/ParagraftsPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const paragraftsPage = ParagraftsPage();
  app.appendChild(paragraftsPage);
};

document.addEventListener("DOMContentLoaded", onInit);
