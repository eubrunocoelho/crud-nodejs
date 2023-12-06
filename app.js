const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
    express.static(path.join(__dirname, 'public'))
);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});