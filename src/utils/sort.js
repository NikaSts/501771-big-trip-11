import {getDuration} from './funcs';


export const SortType = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const SORT_TYPES = [SortType.DEFAULT, SortType.TIME, SortType.PRICE];

export const getSortedPoints = (points, sortType = SortType.DEFAULT) => {
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
      sortedPoints = points.slice().sort((a, b) => b.basePrice - a.basePrice);
      break;

    default:
      throw new Error(`Case ${sortType} not found`);
  }
  return sortedPoints;
};
