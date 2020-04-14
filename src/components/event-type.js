import {capitalizeFirstLetter} from '../utils';

const createEventTypeTemplate = (types) => {
  return types
    .map((type, index) => {
      const capitalizedType = capitalizeFirstLetter(type);
      return (
        `<div class="event__type-item">
          <input id="event-type-${type}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index}">${capitalizedType}</label>
        </div>`
      );
    }).join(`\n`);
};

export {createEventTypeTemplate};
