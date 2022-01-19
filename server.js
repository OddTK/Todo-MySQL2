const express = require('express');
const connection = require('./config');

const PORT = process.env.PORT || 3001;

const app = express();

// Turn on body parser - makes req.body exist
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USER API's
app.post('/api/users', async (req, res) => {
    const [username ] = req.body;
    if (!username) {
        return res.status(400).json({ error: 'You must provide a username' });
    }
    try {
        const createUserQuery = 'INSERT INTO users(username) VALUES(?);';
        const getUserByIdQuery = 'SELECT * FROM users WHERE id = ?;';
        const [result] = await connection.query(createUserQuery, [username]);
        const [userResult] = await connection.query(getUserByIdQuery, [result.insertId]);
        res.json(userResult[0]);
    } catch (e) {
        res.json(400).json(e);
    }
});

app.get('/api/todos', async (req, res) => {
    try {
        const getAllTodosQuery = 'SELECT * FROM todos;';
        const [ todos ] = await connection.query(getAllTodosQuery);
        res.json(todos);
    } catch (e) {
        res.status(400).json(e);
    }
});

// Declaring a function as async allows us to use await syntax inside of that function
app.post('/api/todos', async (req, res) => {
    // { task: 'Sleep' } - destructuring task
    const { task } = req.body;
    // If the user does not provide a task, respond with an error
    if (!task) {
        return res.status(400).json({ error: 'You must provide a task' });
    }
    // If there is a task, save it to the database
    // JS will try to run every single line of code of the try block
    // If any lines of the code throw an error, JS will take that error and
    // put that error in the catch block, and then run the code in the catch block
    try {
        const insertQuery = 'INSERT INTO todos(task) VALUES(?);';
        const getTodoById = 'SELECT * FROM todos WHERE id = ?;';
        const [result] = await connection.query(insertQuery, [task]);
        // Async and await only work for promises
        // Await can only be used in async fucntion - declared on line 13
        // If succesful store in variable then return to user
        // Whenever we do an INSERT, UPDATE, OR DELETE query in mysql2 or mysql npm package
        // it doesnt give us the data that was interacted with. It instead tells us information
        // about how many rows were affected and maybe the insertID or updateID of the regarding data
        // It also gives us an array with 2 elements. The first one is an object where we have the informationwe need
        // second one is null or information about the fields of that row
        const [todosResult] = await connection.query(getTodoById, [result.insertId]);
        res.json(todosResult[0]);
    } catch (e) {
        // if there is an error return it as a 400 error
        res.status(400).json(e);
    }
});

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
