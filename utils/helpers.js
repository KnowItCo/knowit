import groupBy from 'lodash/groupBy';

export const groupByTags = (dataObj, prop) => {
  const groups = groupBy(dataObj, function (value) {
    return value[prop][0];
  });

  const array = [];
  for (const key in groups) {
    if ({}.hasOwnProperty.call(groups, key)) {
      array.push(key);
    }
  }

  return array;
};
