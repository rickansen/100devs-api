const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

let classes = [
  {
    classNumber: 39,
    classURL: 'https://www.youtube.com/watch?v=zHq0v5RD_Zk&ab_channel=LeonNoel',
    regularDeckURL: 'https://slides.com/leonnoel/100devs2-node-express-again',
    date: 'June 3, 2022',
  },
  {
    classNumber: 40,
    classURL: 'https://www.youtube.com/watch?v=3eafTTnEfMw&ab_channel=LeonNoel',
    regularDeckURL: 'https://slides.com/leonnoel/100devs2-express-crud',
    date: 'June 8, 2022',
  },
  {
    classNumber: 41,
    classURL: 'https://www.youtube.com/watch?v=LHf_STV_rLE&ab_channel=LeonNoel',
    regularDeckURL:
      'https://slides.com/leonnoel/100devs2-express-crud-cohort-2',
    date: 'June 10, 2022',
  },
  {
    classNumber: 42,
    classURL: 'https://www.youtube.com/watch?v=TEIf-OW_PZw&ab_channel=LeonNoel',
    regularDeckURL: 'https://slides.com/leonnoel/100devs-fresh',
    date: 'July 22, 2022',
  },
  {
    classNumber: 43,
    classURL: 'https://www.youtube.com/watch?v=zilKAamIvw4&ab_channel=LeonNoel',
    regularDeckURL: 'https://slides.com/leonnoel/100devs2-todo-list',
    date: 'August 3, 2022',
  },
];

app.use(express.json());

morgan.token('type', (req, res) => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :type')
);

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.get('/api/classes', (req, res) => {
  res.send(classes.sort((a, b) => +a.classNumber - +b.classNumber));
});

app.get('/api/classes/:id', (req, res) => {
  const param = Number(req.params.id);
  const _class = classes.find((el) => el.classNumber === param);
  if (!_class) res.status(404);
  res.send(_class);
});

app.post('/api/classes', (req, res) => {
  const body = req.body;
  const _class = {
    classNumber: body.classNumber,
    classURL: body.classURL,
    regularDeckURL: body.regularDeckURL,
    date: body.date,
  };

  classes = classes.concat(_class);

  res.json(_class);
  console.log(`Added Class ${body.classNumber}`);
});

app.delete('/api/classes/:id', (req, res) => {
  const param = +req.params.id;

  classes = classes.filter((el) => el.classNumber !== param);

  res.status(204).end();
  console.log(`Deleted class number ${param}`);
});

app.put('/api/classes/:id', (req, res) => {
  const body = req.body;
  const param = Number(req.params.id);
  const index = classes.findIndex((el) => el.classNumber === param);

  classes[index] = {
    classNumber: param,
    classURL: body.classURL,
    regularDeckURL: body.regularDeckURL,
    date: body.date,
  };

  res.json(classes);
  console.log(`Updated Class ${param}`);
});

app.listen(PORT || 4000, () => {
  console.log(`Listening on port ${PORT}`);
});
