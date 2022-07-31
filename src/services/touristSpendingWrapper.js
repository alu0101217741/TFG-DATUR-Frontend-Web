export function touristSpendingWrapper(data) {
  const years = [];

  data.forEach((item) => {
    const yearAux = item.trimester.slice(0, 4);
    if (!years.includes(yearAux)) {
      years.push(yearAux);
    }
  });

  const container = years.map((item) => {
    return {
      year: item,
      data: [],
    };
  });

  data.forEach((item) => {
    const yearAux = item.trimester.slice(0, 4);
    const index = container.findIndex((i) => i.year === yearAux);
    container[index].data.push(item);
  });

  return container;
}
