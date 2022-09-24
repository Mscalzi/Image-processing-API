import express from 'express';
import routes from './routes/index';
import path from 'path';
import logger from './util/logger';

const app = express();
const port = 5001;

app.get(
  '/',
  logger,
  async (req: express.Request, res: express.Response): Promise<void> => {
    // console.log(req, 'req in src/index.ts')
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
);

app.use('/image', logger, routes);

app.listen(port, () => {
  console.log(`listening at localhost:${port}`);
});

export default app;
