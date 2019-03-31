
const router = require('express').Router();

router.get('/:zipcode', (req, res, next) => {

	res.send(req.params.zipcode);
});

module.exports = router;



