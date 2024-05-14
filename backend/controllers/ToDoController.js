const ToDoSchema = require('../database/schemas/ToDoSchema');

module.exports.getToDo = async (req, res) => {
  const todo = await ToDoSchema.find();
  res.send(todo);
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;

  const toDo = await ToDoSchema.create({ text }).then((data) => {
    console.log(`${data} added`);
    res.send(data);
  });
  res.send(toDo);
};

module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;
  ToDoSchema.findByIdAndUpdate(_id, { text })
    .then(() => res.set(201).send('Updated successfully...'))
    .catch((err) => console.log(err));
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  ToDoSchema.findByIdAndDelete(_id)
    .then(() => res.set(201).send('Deleted successfully...'))
    .catch((err) => console.log(err));
};

