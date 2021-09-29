export const dateTime = () => {
  const today = new Date();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return time;
};
