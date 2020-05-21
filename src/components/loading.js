import AbstractComponent from './abstract-component';


export const createLoadingPointsTemplate = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};


export default class LoadingComponent extends AbstractComponent {
  getTemplate() {
    return createLoadingPointsTemplate();
  }
}