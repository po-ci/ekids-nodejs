const sequelize_fixtures = require('sequelize-fixtures');
const models = require('../../../db');

sequelize_fixtures.loadFile('src/modules/learn/fixtures/list/*.yaml', models).then(function(){
    console.log("Load Fixtures")
});