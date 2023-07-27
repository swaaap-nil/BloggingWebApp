import crypto from 'crypto';

function generateRandomName(bytes: number = 32): string {
  const randomName = crypto.randomBytes(bytes).toString('hex');
  return randomName;
}

export default generateRandomName;
