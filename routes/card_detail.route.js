const express = require('express');
const router = express.Router();
const CardDetailController = require('../controllers/card_detail.controller');
const AuthenticationMiddleware = require('../middlewares/auth.middleware');
const authMiddleware = new AuthenticationMiddleware();
const cardDetailController = new CardDetailController();

/**@댓글생성_API */
router.post('/cards/:cardId/comments', authMiddleware.authenticateAccessToken, cardDetailController.createComment); // --> 추후에 Middleware 넣어야함

/**@댓글조회_API */
router.get('/cards/:cardId/comments', authMiddleware.authenticateAccessToken, cardDetailController.findComment);

/**@댓글수정_API */
router.put('/cards/:cardId/comments/:id', authMiddleware.authenticateAccessToken, cardDetailController.updateComment);

/**@댓글삭제_API */
router.delete(
  '/cards/:cardId/comments/:id',
  authMiddleware.authenticateAccessToken,
  cardDetailController.deleteComment,
);

module.exports = router;
