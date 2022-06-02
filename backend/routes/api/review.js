const express = require('express')
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Review, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({ include: [{ model: User }] });

    res.json(reviews);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    // const { id } = req.body;
    console.log('hdsfasdfk', id)
    const review = await Review.findAll({
        where: {
            groupId: id
        },
        include: { model: User }
    });

    res.json(review);
}));

router.post('/new', requireAuth, handleValidationErrors, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const {
        id,
        rating,
        review,
        image1,
        image2,
        image3,
    } = req.body;

    const groupId = id;

    const oneReview = await Review.create({
        userId,
        groupId,
        rating,
        review,
        image1,
        image2,
        image3,
    });

    res.json(oneReview);
}));

module.exports = router;
