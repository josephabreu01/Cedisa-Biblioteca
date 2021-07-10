const router = require('express').Router();
const Estudios = require('../models/estudios');

const algoliasearch = require('algoliasearch');
const client = algoliasearch('PIQ9925HKD', '689de093f04dc66fe2b6b0a70ac151d1');
const index = client.initIndex('biblioteca');

router.get('/', (req, res, next) => {

  if (req.query.query) {
    
    index.search({
      query: req.query.query,
      page: req.query.page,
    }, (err, content) => {

      res.json({
        success: true,
        message: "Here is your search",
        status: 200,
        content: content,
        search_result: req.query.query
      });


    });
  }
});




module.exports = router;