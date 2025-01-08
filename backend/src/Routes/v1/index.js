import express from 'express';
import ChatController from "../../Controllers/index.js"

const router = express.Router();

const chatController = new ChatController();

router.get('/', (req, res) => {
    res.json({
        message: 'Server is up and running!'
    });
});

router.post('/chat', chatController.getChat)

export default router;