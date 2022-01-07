const formatArticleDate = (date) => {
  const match = date.match(/\d+/g);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${months[match[1] - 1]} ${match[2]}, ${match[0]}`;
};

export default formatArticleDate;
