const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const database = {
    users = [
        {
          id: '123',
          name: 'sally',
          email: 'sally@gmail.com',
          password: 'cookies',
          entries: 0,
          hobby: 'tennis',
          joined: new Date()
        },
        {
          id: '234',
          name: 'esther',
          email: 'esther@gmail.com',
          password: 'wahala',
          entries: 0,
          hobby: 'making noise'.
          joined: new Date()
        },
        {
          id: '345',
          name: 'solomon',
          email: 'solomon@gmail.com',
          password: 'cookies',
          entries: 0,
          hobby: 'praying',
          joined: new Date()
        }
    ]
}

app.get('/', (req, res)=> {
    res.send('working fine');
})

app.post('/signin', (req, res)=> {
    if (req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password) {
        res.json('done');
    } else {
        res.status(400).json('not working');
    }
})

/*app.put('/', (req, res)=> {
    res.send('working fine');
})*/

app.delete('/', (req, res)=> {
    res.send('working fine');
})

app.listen(3200, () => {
    console.log('I am listening to port 3200');
})