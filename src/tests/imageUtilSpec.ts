import { fileCheck, confirmFile, imageFileResizer } from '../util/imageUtil';
import path from 'path';

describe('Test image utilities', () => {
  it('checks that the file exists', async () => {
    const input = `${path.join(__dirname, '../../assets/full/image1.jpeg')}`;
    const doesExist = await fileCheck(input);
    expect(doesExist).toBe(true);
  });

  it('checks if image got resized', async () => {
    const input = `${path.join(__dirname, '../../assets/full/image1.jpeg')}`;
    const output = `${path.join(
      __dirname,
      '../../assets/thumbs/image1-250w-250h.jpeg'
    )}`;
    const thumbs = await imageFileResizer(input, 250, 250, output);
    expect(thumbs).toEqual(output);
  });

  it('makes sure the directory exists', async () => {
    const output = `${path.join(__dirname, '../../assets/thumbs')}`;
    await expectAsync(confirmFile(output)).toBeResolved();
  });
});
