import {getFormattedDate} from '../utils';

const createTripInfoTemplate = (tripDays) => {
  const totalPrice = tripDays.reduce((acc, item) => {
    for (const point of item.points) {
      acc += Number(point.basePrice);
    }
    // acc += item.points.forEach((point) => Number(point.basePrice)); // с foreEach не работает
    return acc;
  }, 0);
  const firstTripDate = getFormattedDate(tripDays[0].date);
  const [lastTripDay] = tripDays.slice(-1);
  const lastTripDate = getFormattedDate(lastTripDay.date);

  const firstVisitedCity = tripDays[0].points[0].destination.name;
  const [lastTripDayPoint] = lastTripDay.points.slice(-1);
  const lastVisitedCity = lastTripDayPoint.destination.name;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${firstVisitedCity} &mdash; Chamonix &mdash; ${lastVisitedCity}</h1>

        <p class="trip-info__dates">${firstTripDate.monthName} ${firstTripDate.day}&nbsp;&mdash;&nbsp;${lastTripDate.monthName} ${lastTripDate.day}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export {createTripInfoTemplate};
