import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Server is up and running!'
    });
});

router.get('/chat', )

export default router;