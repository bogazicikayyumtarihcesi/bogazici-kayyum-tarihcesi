const useDatePositions = (timeline) => {
  const dateDifference = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const eventToDate = (timelineObject) => new Date(timelineObject.date);

  const dateSpan = dateDifference(
    eventToDate(timeline[timeline.length - 1]),
    eventToDate(timeline[0])
  );

  const createDateMarks = () => {
    return timeline
      .map((item) => eventToDate(item))
      .map((date, index, array) => {
        if (index === 0) return { value: 0, label: "1deneme" };
        else if (index === array.length - 1)
          return { value: dateSpan, label: "last" };
        else {
          return {
            value: dateDifference(date, array[0]),
            label: timeline[index].title,
          };
        }
      });
  };

  const datePositions = createDateMarks().map(({ value }) => value);
  return datePositions;
};

export default useDatePositions;
