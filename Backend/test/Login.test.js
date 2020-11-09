//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let should = chai.should();
let routeConstants = require('../config/routeConstants')

chai.use(chaiHttp);



describe('Restaurants', () => {

    describe('/restaurant/all', () => {
        it('it should GET unauthorized', (done) => {
            chai.request(`${routeConstants.BACKEND_URL}`)
                .get(`/restaurant${routeConstants.GET_ALL_RESTAURANTS}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

});


describe('Events', () => {

    describe('/events/all', () => {
        it('it should GET all the events', (done) => {
            chai.request(`${routeConstants.BACKEND_URL}`)
                .get(`/events${routeConstants.GET_ALL_EVENTS}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});


describe('login', () => {
    describe('/POST login', () => {
        it('Give a an error on non existent user', (done) => {
            let body = {
                email_id: "xyz@abc.com",
                password: "123",
            }
            chai.request(`${routeConstants.BACKEND_URL}`)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    })
});



describe('Restaurant Search', () => {
    describe('/POST Search', () => {
        it('Get unauthorized error', (done) => {
            let body = {
                search_string: "pizza"
            }
            chai.request(`${routeConstants.BACKEND_URL}`)
                .get(`/restaurant${routeConstants.GET_RESTAURANT_SEARCH}`)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    })
});

describe('Reviews by Restaurant', () => {
    describe('/GET Search', () => {
        it('Give a array of reviews', (done) => {
            let body = {
                restaurant_id: 1
            }
            chai.request(`${routeConstants.BACKEND_URL}`)
                .get(`/reviews${routeConstants.GET_REVIEWS_BY_RESTAURANT}/?restaurant_id=1`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })
});

