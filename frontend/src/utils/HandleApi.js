import axios from 'axios';

const baseUrl = 'http://localhost:5000';

const getAllToDos = (setToDos) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log(`data: ${data}`);
    setToDos(data);
  });
};

const addToDo = (text, setText, setToDos) => {
  axios.post(`${baseUrl}/save`, { text }).then((data) => {
    console.log(data);
    setText('');
    getAllToDos(setToDos);
  });
};

const deleteToDo = (_id, setToDos) => {
  axios.post(`${baseUrl}/delete`, { _id }).then((data) => {
    console.log(data);
    getAllToDos(setToDos);
  });
};

const updateToDo = (_id, text, setToDos) => {
  axios.post(`${baseUrl}/update`, { text, _id }).then((data) => {
    console.log(data);
    getAllToDos(setToDos);
  });
};

export { getAllToDos, addToDo, deleteToDo, updateToDo};
