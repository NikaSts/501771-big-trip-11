
const createDestinationTemplate = (destination) => {

  return (
    `<section class="event__section  event__section--destination">
			<h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.photos.map((src) => (
      `<img class="event__photo" src="${src}" alt="Event photo">`
    )).join(` `)}
        </div>
      </div>
    </section>`

  );
};

export {createDestinationTemplate};