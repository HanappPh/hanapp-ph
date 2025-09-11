import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const baseURL = process.env['API_BASE_URL'] || 'http://localhost:3001';
    const res = await axios.get(`${baseURL}/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});
