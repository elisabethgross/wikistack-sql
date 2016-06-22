var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  Page.findAll({}).then(function (allPages) {
    res.render('index', { pages: allPages })
  })
});

router.post('/', function(req, res, next) {

  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {
    var user = values[0];
    var tagsThing = req.body.tags.split(' ');
    console.log(Array.isArray(tagsThing))
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      tags: tagsThing
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/search', function(req, res, next) {
  Page.findAll({}).then(function(pages) {

    var tags = pages.reduce(function (allTags, page) {
      page.tags.forEach(function (tag) {
        if (allTags.indexOf(tag) === -1) {
          allTags.push(tag);
        }
      });
      return allTags;
    }, []);
    // tags is an array of all the tags

    res.render('tagsearch', { tags: tags });
    }).catch(next);
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
        {
          model: User,
          as: 'author'
        }
    ]
  })
  .then(function (foundUserPage) {
    if (foundUserPage === null) {
      res.status(404).send();
    } else {
      res.render('wikipage', { page: foundUserPage });
    }
  })
  .catch(next);
// Render the wikipage template, passing the retrieved page as the page property of the locals object of the render function.
});

module.exports = router;
