import express from 'express';
import path from 'path';
import { fileCheck, confirmFile, imageFileResizer } from '../util/imageUtil';

const routes = express.Router();

routes.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const file = req.query.f as string;
    const ext = req.query.x as string;
    const width = req.query.w as string;
    const height = req.query.h as string;
    // console.log(file, ext, width, height);

    if (
      file === undefined ||
      ext === undefined ||
      width === undefined ||
      height === undefined
    ) {
      res.status(400).send('Missing data from request');
    } else {
      const w = parseInt(width) as number;
      const h = parseInt(height) as number;
      if (isNaN(w) || isNaN(h)) {
        res.status(400).send('width and height inputs need to be numbers');
      } else {
        const extLower = ext.toLowerCase();
        const resourceName = `${
          path.join(__dirname, '../../assets/full/') + file
        }.${extLower}`;
        const thumbDir = `${path.join(__dirname, '../../assets/thumbs')}`;
        const thumbResourceName = `${thumbDir}${file}-${width}w-${height}h.${extLower}`;
        const doesAssetExist = await fileCheck(resourceName);
        if (doesAssetExist) {
          confirmFile(thumbDir);
          imageFileResizer(
            resourceName,
            parseInt(width),
            parseInt(height),
            thumbResourceName
          ).then((outputFile) => {
            res.status(200).sendFile(outputFile);
          });
        } else {
          res.status(404).send('file not found');
        }
      }
    }
  }
);

export default routes;
