const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // 0-based
  const year = date.getFullYear();
  return `${month}/${year}`;
};

export { formatDate };
