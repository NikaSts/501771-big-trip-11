import SortComponent, {SortType} from '../components/sort';
import TripDaysComponent from '../components/trip-days';
import DayComponent from '../components/day';
import NoPointsComponent from '../components/no-points';
import {renderComponent} from '../utils/render';
import {getTripDays, getDuration, getPointPrice} from '../utils/common';
import PointController from './point-controller';


const renderDay = (day, index = null) => {
  const tripDay = new DayComponent(day, index);
  const points = day.points;
  points.forEach((point) => {
    const pointController = new PointController(point);
    tripDay.addPoint(pointController.render(point));
  });
  return tripDay;
};

const getSortedPoints = (points, sortType = SortType.DEFAULT) => {
  let sortedPoints = [];

  switch (sortType) {
    case SortType.DEFAULT:
      sortedPoints = points.slice().sort((a, b) => a.startDate - b.startDate);
      break;

    case SortType.TIME:
      const pointsWithDuration = points.map((point) => Object.assign({}, point, {duration: getDuration(point.startDate, point.endDate)}));
      sortedPoints = pointsWithDuration.sort((a, b) => b.duration - a.duration);
      break;

    case SortType.PRICE:
      const pointWithTotalPrice = points.map((point) => Object.assign({}, point, {total: getPointPrice(point)}));
      sortedPoints = pointWithTotalPrice.sort((a, b) => b.total - a.total);
      break;

    default:
      throw new Error(`Case ${sortType} not found`);
  }
  return sortedPoints;
};

const renderDefaultSort = (list, points) => {
  const days = getTripDays(points);
  days.forEach((day, index) => list.addDay(renderDay(day, index)));
};

const renderTypeSort = (list, points) => {
  const day = {'points': points};
  list.addDay(renderDay(day));
};


export default class TripController {
  constructor(container) {
    this._container = container;
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._tripDaysComponent = new TripDaysComponent();
  }

  render(points) {
    if (points.length === 0) {
      renderComponent(this._container, this._noPointsComponent);
      return;
    }

    renderComponent(this._container, this._sortComponent);
    renderComponent(this._container, this._tripDaysComponent);
    let sortedPoints = getSortedPoints(points);
    renderDefaultSort(this._tripDaysComponent, sortedPoints);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      sortedPoints = getSortedPoints(points, sortType);

      this._tripDaysComponent.removeChildrenElements();
      if (sortType === SortType.DEFAULT) {
        renderDefaultSort(this._tripDaysComponent, sortedPoints);
        return;
      }
      renderTypeSort(this._tripDaysComponent, sortedPoints);
    });
  }
}
