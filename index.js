const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const dataSource = require('./connect').dataSource;

const postRoute = require('./routes/post.route');
const categoryRoute = require('./routes/category.route');

app.use('/api/posts', postRoute);   // middleware
app.use('/api/categories', categoryRoute);  // middleware

app.listen(port, () => {
    console.log("Post-app is listening on port", port);
});
