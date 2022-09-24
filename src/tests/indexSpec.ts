import app from '../index';
import supertest from 'supertest';

const req = supertest(app);

describe('test for image processing', () => {
  it('checks that the initial route is working', async () => {
    const res = await req.get('/');
    expect(res.status).toBe(200);
  });

  it('checks for missing query parameters', async () => {
    const res = await req.get('/image');
    expect(res.status).toBe(400);
  });

  it('checks for invalid image dimension parameters', async () => {
    const res = await req.get('/image?f=image1&x=jpeg&w=w&h=h');
    expect(res.status).toBe(400);
  });

  it('gets resized image with specified image format', async () => {
    const res = await req.get('/image?f=image5&x=JPEG&w=1000&h=1000');
    expect(res.status).toBe(200);
  });

  it('checks for unknown image asset', async () => {
    const res = await req.get('/image?f=unknown&x=PNG&w=100&h=100');
    expect(res.status).toBe(404);
  });
});
