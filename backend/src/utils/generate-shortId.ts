import { binary_to_base58 } from 'base58-js';
import { convertNumberToBytes } from './bytes-convert-options';
import {
  endBase58Boundary,
  startBase58Boundary,
} from 'constants/base-58-generator-settings';

export function generateShortId() {
  return binary_to_base58(
    convertNumberToBytes(
      Math.trunc(Math.random() * (endBase58Boundary - startBase58Boundary)) +
        startBase58Boundary,
    ),
  );
}
