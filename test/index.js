let { User } = require("../models/users");
let { Task } = require("../models/tasks");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
const dotenv = require('dotenv');
dotenv.config();

chai.use(chaiHttp);
var token = "";
let uniqueKey = Math.floor(Math.random() * 100000000);


// User Part
describe('/POST register user', () => {
    it('it should POST a user ', (done) => {
        const user = { name: "Onur " + uniqueKey, email: "onur_" + uniqueKey + "@onur.com", password: "12345678" };
        chai.request(server)
            .post('/api/user/register')
            .set('x-access-token', token)
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('isActive');
                res.body.should.have.property('isAdmin');
                done();
            });
    });
});

describe('/POST login user', () => {
    it('it should POST a user ', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .set('x-access-token', token)
            .send({ email: "onur_" + uniqueKey + "@onur.com", password: "12345678" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            });
    });
});

describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
        const uniqueKey = Math.floor(Math.random() * 100000000);
        const user = new User({ name: "Onur" + uniqueKey, email: "onur" + uniqueKey + "@onur.com", password: "12345678" });
        user.save((err, user) => {
            chai.request(server)
                .get('/api/user/' + user.id)
                .set('x-access-token', token)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('isActive');
                    res.body.should.have.property('isAdmin');
                    res.body.should.have.property('_id').eql(user.id);
                    done();
                });
        });
    });
});

describe('/GET user', () => {
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/user')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/POST user', () => {
    const uniqueKey = Math.floor(Math.random() * 100000000);
    it('it should POST a user ', (done) => {
        const user = {
            name: "Onur" + uniqueKey,
            email: "onur" + uniqueKey + "@onur.com",
            password: "12345678",
        }
        chai.request(server)
            .post('/api/user')
            .set('x-access-token', token)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('isActive');
                res.body.should.have.property('isAdmin');
                done();
            });
    });
});

describe('/PUT/:id user', () => {
    it('it should UPDATE a user given the id', (done) => {
        const uniqueKey = Math.floor(Math.random() * 100000000);
        const user = new User({ name: "Onur" + uniqueKey, email: "onur" + uniqueKey + "@onur.com", password: "12345678" })
        user.save((err, user) => {
            chai.request(server)
                .put('/api/user/' + user.id)
                .set('x-access-token', token)
                .send({ name: "Onur 55", email: "onur" + uniqueKey + "@onur.com", password: "12345678" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('isActive');
                    res.body.should.have.property('isAdmin');
                    done();
                });
        });
    });
});

describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', (done) => {
        const uniqueKey = Math.floor(Math.random() * 100000000);
        const user = new User({ name: "Onur" + uniqueKey, email: "onur" + uniqueKey + "@onur.com", password: "12345678" })
        user.save((err, user) => {
            chai.request(server)
                .delete('/api/user/' + user.id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('acknowledged');
                    res.body.should.have.property('modifiedCount');
                    res.body.should.have.property('upsertedId');
                    res.body.should.have.property('upsertedCount');
                    res.body.should.have.property('matchedCount');
                    done();
                });
        });
    });
});




// Task Part
describe('/GET/:id task', () => {
    it('it should GET a task by the given id', (done) => {
        const uniqueKey = Math.floor(Math.random() * 100000000);
        const user = new User({ name: "Onur", email: "onur" + uniqueKey + "@onur.com", password: "12345678" });
        user.save((err, user) => {
            const task = new Task({ title: "Task Title" + uniqueKey, description: "Task Description" + uniqueKey, status: 1, user_id: user._id });
            task.save((err, task) => {
                chai.request(server)
                    .get('/api/task/' + task.id)
                    .set('x-access-token', token)
                    .send(task)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('status');
                        res.body.should.have.property('deadline');
                        res.body.should.have.property('created_at');
                        res.body.should.have.property('updated_at');
                        res.body.should.have.property('_id').eql(task.id);
                        done();
                    });
            });
        });
    });
});

describe('/GET task', () => {
    it('it should GET all the tasks', (done) => {
        chai.request(server)
            .get('/api/task')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/POST task', () => {
    it('it should POST a task ', (done) => {
        const uniqueKey = Math.floor(Math.random() * 100000000);
        const user = new User({ name: "Onur", email: "onur" + uniqueKey + "@onur.com", password: "12345678" });
        user.save((err, user) => {
            const task = {
                title: "Task title " + uniqueKey,
                description: "Task Description " + uniqueKey,
                status: 1,
                user_id: user._id
            }
            chai.request(server)
                .post('/api/task/save')
                .set('x-access-token', token)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('description');
                    res.body.should.have.property('status');
                    res.body.should.have.property('user_id');
                    res.body.should.have.property('deadline');
                    res.body.should.have.property('created_at');
                    res.body.should.have.property('updated_at');
                    done();
                });
        });
    });
});

describe('/PUT/:id task', () => {
    it('it should UPDATE a task given the id', (done) => {
        const uniqueKey = Math.floor(Math.random() * 100000000);
        const user = new User({ name: "Onur" + uniqueKey, email: "onur" + uniqueKey + "@onur.com", password: "12345678" })
        user.save((err, user) => {
            const task = new Task({ title: "Task Title " + uniqueKey, description: "Task Description " + uniqueKey, status: 1, user_id: user._id })
            task.save((err, task) => {
                chai.request(server)
                    .put('/api/task/' + task.id)
                    .set('x-access-token', token)
                    .send({ title: "Task Title " + uniqueKey, description: "Task Description " + uniqueKey, user_id: user.id, status: 2 })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('status');
                        res.body.should.have.property('user_id');
                        res.body.should.have.property('deadline');
                        res.body.should.have.property('created_at');
                        res.body.should.have.property('updated_at');
                        done();
                    });
            });
        });
    });
});

describe('/DELETE/:id task', () => {
    it('it should DELETE a task given the id', (done) => {
        const uniqueKey = Math.floor(Math.random() * 100000000);
        const user = new User({ name: "Onur" + uniqueKey, email: "onur" + uniqueKey + "@onur.com", password: "12345678" })
        user.save((err, user) => {
            const task = new Task({ title: "Task Title " + uniqueKey, description: "Task Description " + uniqueKey, user_id: user._id, status: 1 })
            task.save((err, task) => {
                chai.request(server)
                    .delete('/api/task/' + task.id)
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('acknowledged');
                        res.body.should.have.property('modifiedCount');
                        res.body.should.have.property('upsertedId');
                        res.body.should.have.property('upsertedCount');
                        res.body.should.have.property('matchedCount');
                        done();
                    });
            });
        });
    });
});

