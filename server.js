const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const restaurants = require('./models/restaurants');
const user = require ('./models/users');
const address=require('./models/address');
const menu=require('./models/menu');
const login=require('./models/login');
const managerlogin=require('./models/manager-login');
const ownerlogin=require('./models/owner-login');
const section=require('./models/section');
const menuitem=require('./models/menuitem');
const booking=require('./models/booking');
const owner=require('./models/owner')
const manager=require('./models/manager')
const host=require('./models/host')
const tablesection=require('./models/tablesection');
const table=require('./models/table');
const dateTableDate=require('./models/dateTableDate')
const restaurantitem=require('./models/restaurantitem')
const manageritem=require('./models/manageritem')
const managersection=require('./models/managersection')
const customerBooking=require('./models/customerBooking')
const noteCustomer=require('./models/noteCustomer')
const manageremail=require('./models/manageremail')
const restaurantsaddress=require('./models/restaurantaddress')
const note=require('./models/notes')
const mysql=require('mysql')
const passport = require("passport");
var methodOverride = require('method-override')
const connection = mysql.createConnection({
 host     : 'mymysql.senecacollege.ca',
  user     : 'prj566_201a04',
  password : 'ngNQ@6374',
  database : 'prj566_201a04'
});

connection.connect();
const port = process.env.PORT || 8080;

const app = express()
.use(methodOverride('X-HTTP-Method-Override'))
  .use(cors())
  .use(bodyParser.json())
  .use(express.json())
  .use(passport.initialize())
  .use(restaurants(connection))
  .use(user(connection))
  .use(login(connection))
  .use(managerlogin(connection))
  .use(ownerlogin(connection))
  .use(address(connection))
  .use(menu(connection))
  .use(section(connection))
  .use(menuitem(connection))
  .use(booking(connection))
  .use(owner(connection))
  .use(manager(connection))
  .use(host(connection))
  .use(tablesection(connection))
  .use(table(connection))
  .use(dateTableDate(connection))
  .use(restaurantitem(connection))
  .use(manageritem(connection))
  .use(managersection(connection))
  .use(note(connection))
  .use(noteCustomer(connection))
  .use(customerBooking(connection))
  .use(manageremail(connection))
  .use(restaurantsaddress(connection))
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
//connection.end();
