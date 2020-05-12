const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
          id: '124',
          name: 'sally',
          email: 'sally@gmail.com',
          password: 'bananas',
          entries: 0,
          joined: new Date()
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res)=> {
    bcrypt.compare("bacon", hash, (err, res) => {
        // res == true
    }); 
    bcrypt.compare("veggies", hash, (err, res) => {
        // res == false
    }); 
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
        res.json('done');
    } else {
        res.status(400).json('not working');
    }
})

app.post('/register', (req, res)=> {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, (err, hash) => {
        //Store hash in your password DB
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res)=> {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id ) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})
/*the app.post below is to get hw many entries 
have been made by the user */
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})
//Load hash from password DB
app.delete('/', (req, res)=> {
    res.send('working fine');
})

//the tutorial  port is 3000, but i left mine at 3001
app.listen(3001, () => {
    console.log('I am listening to port 3001');
})