import bs58 from 'bs58';
import { convertNumberToBytes } from './bytes-convert-options';
import {
  endBase58Boundary,
  startBase58Boundary,
} from 'constants/base-58-generator-settings';

export function generateShortId() {
  return bs58.encode(
    convertNumberToBytes(
      Math.trunc(Math.random() * (endBase58Boundary - startBase58Boundary)) +
        startBase58Boundary,
    ),
  );
}
