var Todo = require('./models/product');

function getTodos(res) {
    Todo.find(function (err, products) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(products); // return all products in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all products
    app.get('/api/products', function (req, res) {
        // use mongoose to get all products in the database
        getTodos(res);
    });

    // create product and send back all products after creation
    app.post('/api/products', function (req, res) {

        // create a product, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, product) {
            if (err)
                res.send(err);

            // get and return all the products after you create another
            getTodos(res);
        });

    });

    // delete a product
    app.delete('/api/products/:product_id', function (req, res) {
        Todo.remove({
            _id: req.params.product_id
        }, function (err, product) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
