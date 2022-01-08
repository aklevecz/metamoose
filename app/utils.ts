export const delay = (callback: any, time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve(true);
    }, time);
  });
};
