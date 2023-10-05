const express= require('express');
const router = express.Router();

const { body, param, validationResult } = require('express-validator');
const postController = require('../controllers/post.controller');

const textAndTitleValidator = () => {
    return [
        body('title').not().isEmpty().withMessage('Field title is requires'),
        body('title').isString().withMessage('Enter only characters'),
        body('text').not().isEmpty().withMessage('Field text is required'),
        body('text').isString().withMessage('Enter only characters')
    ];
}

router.get('/', postController.findAll);
router.get('/:id', postController.findOne);

router.post('/', textAndTitleValidator(), (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            data: errors.array()
        });
    }
    
    next();
}, postController.create);

router.patch('/:id', postController.updatePost);
router.patch('/:id/categories', postController.updateCategory);
router.delete('/:id', postController.deletePost);
router.delete('/:id/categories', postController.deleteCategories);

module.exports = router;