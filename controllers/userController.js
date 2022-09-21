const fs = require("fs");
// **********Reading Users From File
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

// // Middleware
const checkLimit = (req, res, next) => {
  if (req.query.limit > users.length) {
    return res.status(404).send({
      status: "fail",
      message: `You can request for ${users.length} users`,
    });
  }
  next();
};
const checkId = (req, res, next) => {
  const usersIds = users.map((val) => val.id);
  if (!usersIds.includes(+req.params.id)) {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};
const checkBody = (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.gender ||
    !req.body.address ||
    !req.body.contact ||
    !req.body.photoUrl
  ) {
    return res.status(404).send({
      status: "fail",
      message:
        "Missing name or gender or address or contact or photoUrl or all",
    });
  }
  next();
};
const checkBulkUpdateBody = (req, res, next) => {
  const ids = req.body.map((val) => val.id);
  const usersIds = users.map((val) => val.id);

  if (!ids.every((elem) => usersIds.includes(elem))) {
    return res.status(404).send({
      status: "fail",
      message: "Invalid ID",
    });
  }

  next();
};
//************************************* Handlers Functions

// GET /user/random (A random user)
const getARandomUser = (req, res) => {
  res.status(200).send({
    status: "success",
    user: users[Math.trunc(Math.random() * users.length)],
  });
};

// GET /user/all (A list of random users)
const getAllUsers = (req, res) => {
  const { limit } = req.query;

  res.status(200).send({
    status: "success",
    results: limit ? limit : String(users.length),
    users: limit ? users.slice(0, limit) : users,
  });
};
// PATCH /user/update (Update a random user vai ID)
const updateAUser = (req, res) => {
  const { id } = req.params;
  const updatedUser = users.find((val) => val.id == id);

  for (let x in req.body) {
    updatedUser[x] = req.body[x];
  }

  fs.writeFileSync(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users)
  );

  res.status(200).send({ status: "success", data: "Updated success" });
};

// POST /user/save (Save a random user)
const createAUser = (req, res) => {
  const max_id = Math.max(...users.map((val) => val.id));
  users.push({ id: max_id + 1, ...req.body });
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users)
  );
  res.status(201).send({ status: "User Create Successfully" });
};

// DELETE /user/ delete
const deleteAUser = (req, res) => {
  const newUsers = users.filter((val) => val.id !== +req.params.id);
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(newUsers)
  );
  res.status(200).send({ status: "User Delete Successfully" });
};
// PATCH /user/bulk-update
const bulkUpdate = (req, res) => {
  for (const x of req.body) {
    const updatedUser = users.find((val) => val.id == x.id);
    for (const y in x) {
      updatedUser[y] = x[y];
    }
  }
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users)
  );
  res.status(200).send({ status: "All Users Updated Successfully" });
};

module.exports = {
  getARandomUser,
  getAllUsers,
  createAUser,
  updateAUser,
  deleteAUser,
  bulkUpdate,
  checkLimit,
  checkId,
  checkBody,
  checkBulkUpdateBody,
};
