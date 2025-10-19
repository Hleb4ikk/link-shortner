import bs58 from 'bs58';
import { convertBytesToNumber } from 'utils/bytes-convert-options';
//
const attempts = 10;
const startBase58 = '111111';
const endBase58 = 'zzzzzzzzzz';

const startBase58Boundary = convertBytesToNumber(bs58.decode(startBase58));
const endBase58Boundary = convertBytesToNumber(bs58.decode(endBase58));

export { startBase58Boundary, endBase58Boundary, attempts };
