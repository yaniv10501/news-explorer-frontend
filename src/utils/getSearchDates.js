const d = new Date();
const getSearchDates = {
  from: new Date(d.getTime() - 1000 * 3600 * 24 * 7).toISOString(),
  to: new Date(d.getTime()).toISOString(),
};

export default getSearchDates;
