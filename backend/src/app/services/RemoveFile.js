import { existsSync, unlinkSync } from 'fs';
import { resolve } from 'path';

export default async function(path) {
  const dir = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', path);

  const fileExists = await existsSync(dir);

  if (fileExists) {
    await unlinkSync(dir);
  }
}
