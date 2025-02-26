export const getCountdownTime = (duration) => {
  const hour = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minute = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const second = Math.floor((duration % (1000 * 60)) / 1000);
  return { hour, minute, second };
};
