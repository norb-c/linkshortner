import crypto from 'crypto';

export const generateRandomString = (length: number = 4): string => {
  let string = '';
  const numbers = '0123456789';
  const charsLower = 'abcdefghijklmnopqrstuvwxyz';
  const charsUpper = charsLower.toUpperCase();

  let chars = numbers + charsLower + charsUpper;

  // Generate the string
  const charsLen = chars.length;
  const maxByte = 256 - (256 % charsLen);
  while (length > 0) {
    const buf = crypto.randomBytes(Math.ceil((length * 256) / maxByte));

    for (let i = 0; i < buf.length && length > 0; i += 1) {
      const randomByte = buf.readUInt8(i);
      if (randomByte < maxByte) {
        string += chars.charAt(randomByte % charsLen);
        length -= 1;
      }
    }
  }

  return string;
};
