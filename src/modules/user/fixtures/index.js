const sequelize_fixtures = require('sequelize-fixtures');
const models = require('../../../db');

sequelize_fixtures.loadFile('src/modules/user/fixtures/list/*.yaml', models).then(function(){
    console.log("Load Fixtures")
});