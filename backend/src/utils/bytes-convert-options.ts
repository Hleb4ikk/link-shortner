export function convertBytesToNumber(bytes: Uint8Array) {
  let num = 0;
  for (const b of bytes) {
    num = num * 256 + b;
  }
  return num;
}

export function convertNumberToBytes(num: number): Uint8Array {
  if (num < 0) throw new Error('Only non-negative numbers supported');

  const bytes: number[] = [];

  while (num > 0) {
    bytes.unshift(num % 256);
    num = Math.trunc(num / 256);
  }

  return Uint8Array.from(bytes.length ? bytes : [0]);
}
