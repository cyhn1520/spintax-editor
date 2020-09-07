const getAll = () => {
  return JSON.parse(localStorage.getItem("spintaxList")) || [];
};

const save = (value) => {
  localStorage.setItem("spintaxList", JSON.stringify([...getAll(), value]));
};

const deleteFromName = (name) => {
  localStorage.setItem(
    "spintaxList",
    JSON.stringify([...getAll().filter((item) => item.name !== name)])
  );
};

module.exports = {
  getAll,
  save,
  deleteFromName,
};
