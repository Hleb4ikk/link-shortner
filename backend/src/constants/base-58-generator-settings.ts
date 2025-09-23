import { base58_to_binary } from 'base58-js';
import { convertBytesToNumber } from 'utils/bytes-convert-options';
//
const attempts = 10;
const startBase58 = '111111';
const endBase58 = 'zzzzzzzzzz';

const startBase58Boundary = convertBytesToNumber(base58_to_binary(startBase58));
const endBase58Boundary = convertBytesToNumber(base58_to_binary(endBase58));

export { startBase58Boundary, endBase58Boundary, attempts };
