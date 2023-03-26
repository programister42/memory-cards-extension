export const ElementFactory = (
  name,
  { classList, textContent, children, listeners }
) => {
  const element = document.createElement(name);

  if (classList) element.classList.add(...classList);
  if (textContent) element.textContent = textContent;
  if (children) children.forEach((child) => element.append(child));
  if (listeners)
    listeners.forEach(([eventName, listener]) =>
      element.addEventListener(eventName, listener)
    );

  element.setText = (text) => {
    element.textContent = text;
  };
  element.addClass = (className) => element.classList.add(className);
  element.removeClass = (className) => element.classList.remove(className);
  element.toggleClass = (className) => element.classList.toggle(className);

  return element;
};
