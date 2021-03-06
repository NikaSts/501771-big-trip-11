export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const renderComponent = (container, component, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case Position.BEFOREEND:
      container.append(component.getElement());
      break;
    case Position.AFTEREND:
      container.after(component.getElement());
      break;
    default:
      throw new Error(`Case ${place} not found`);
  }
};

export const replaceComponent = (oldComponent, newComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const isExistElements = !!(newElement && oldElement);

  if (isExistElements) {
    oldElement.replaceWith(newElement);
  }
};

export const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};
