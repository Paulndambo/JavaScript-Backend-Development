const express = require('express');
const router = express.Router();
//const programmingLanguages = require('../services/programmingLanguages');
const programmingLanguages = require("../services/programming-languages")

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    const languages = await programmingLanguages.getMultiple(req.query.page)
    res.status(200).json({languages});
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;