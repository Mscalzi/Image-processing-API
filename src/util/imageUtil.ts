import { promises as fsPromises } from 'fs';
import sharp from 'sharp';

const fileCheck = async (fileName: string): Promise<boolean> => {
  try {
    const file = await fsPromises.open(fileName, 'r');
    // console.log(file, 'fileCheck function')
    file.close();

    return true;
  } catch (err) {
    return false;
  }
};

const confirmFile = async (resourceName: string): Promise<void> => {
  try {
    await fsPromises.readdir(resourceName);
  } catch {
    await fsPromises.mkdir(resourceName);
  }
  return Promise.resolve();
};

const imageFileResizer = async (
  inputFile: string,
  width: number,
  height: number,
  outputFile: string
): Promise<string> => {
  const outputFileCheck = await fileCheck(outputFile);
  if (!outputFileCheck) {
    await sharp(inputFile).resize(width, height).toFile(outputFile);
    return outputFile;
  } else {
    return outputFile;
  }
};

export { fileCheck, confirmFile, imageFileResizer };
