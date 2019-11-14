import Express from 'express';

const router = Express.Router();

router.get('/hello/', async (req: Express.Request, res: Express.Response) => {
  try {
    res.json('Hello World!');
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
