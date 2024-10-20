/* Generate a unique ID for a new device */
export const generateDerId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  const derId = `${timestamp}-${random}`;
  return derId;
};
