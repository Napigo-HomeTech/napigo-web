/**
 *
 * @param freeze
 * @returns
 */
export const freezePage = (freeze: boolean) => {
  const html = document.getElementsByTagName("html");
  if (freeze) {
    html[0].classList.add("freeze");
    return;
  }
  html[0].classList.remove("freeze");
};
