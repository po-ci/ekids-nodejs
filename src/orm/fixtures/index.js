const sequelize_fixtures = require('sequelize-fixtures');
const models = require('./../models');

sequelize_fixtures.loadFile('src/orm/fixtures/list/*.yaml', models).then(function(){
    console.log("Load Fixtures")
});