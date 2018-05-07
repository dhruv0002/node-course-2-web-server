const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');//This is used to make use of templates of html which are used in every page.
app.set('view engine', 'hbs');//This function is from hbs(handlebars) package to render hbs files.
app.use(express.static(__dirname + '/public'));//'app.use' is how you register middleware. It takes a function.

//''req, res' in app.use is same as 'req, res' in app.get
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
    {
      console.log('Unable to append to server.log'); 
    }
  });
  console.log(log);
  next();//If next is not there then the programme won't progress after this line, It will stuck the programme here. So to end the middleware and proceeed further we need 'next()'.
});

/*
app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'We will be right back!',
    message: 'Site is currently under maintenance'
  });
});
*/

app.use(express.static(__dirname + '/public'));//'app.use' is how you register middleware. It takes a function.

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});// When the hbs file is executed, it first look for the data in registerHelper function. If it doesnt find it then it go to somewhere else to look for data.

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('Hello Express!');
  //res.send('<h1>Hello Express!</h1>');
  /*
  res.send({
    name: 'Dhruv',
    likes: [
      'biking',
      'music',
      'coding'
    ]
  });
  */
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    //currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });//This function is from hbs(handlebars) package. It take object as a second parameter.
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});