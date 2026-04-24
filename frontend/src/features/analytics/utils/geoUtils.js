/* 🔥 NORMALIZE COUNTRY */
export const normalizeCountry = (country) => {
  if (!country) return "Unknown";

  return country.trim();
};

/* 🔥 NORMALIZE CITY */
export const normalizeCity = (city) => {
  if (!city) return "Unknown";

  return city.trim();
};

/* 🔥 GROUP BY COUNTRY */
export const groupByCountry = (records = []) => {
  const map = {};

  records.forEach((item) => {
    const country = normalizeCountry(item.country);

    if (!map[country]) {
      map[country] = 0;
    }

    map[country] += 1;
  });

  return Object.entries(map)
    .map(([country, count]) => ({
      country,
      value: count,
    }))
    .sort((a, b) => b.value - a.value);
};

/* 🔥 GROUP BY CITY */
export const groupByCity = (records = []) => {
  const map = {};

  records.forEach((item) => {
    const city = normalizeCity(item.city);

    if (!map[city]) {
      map[city] = 0;
    }

    map[city] += 1;
  });

  return Object.entries(map)
    .map(([city, count]) => ({
      city,
      value: count,
    }))
    .sort((a, b) => b.value - a.value);
};

/* 🔥 GET TOP N */
export const getTop = (list = [], limit = 5) => {
  return list.slice(0, limit);
};