import express from 'express';
import routes from './routes.js';
import db from './src/db.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

db.sync(() => {
    console.log(`Database connected: ${process.env.DB_NAME}`);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});