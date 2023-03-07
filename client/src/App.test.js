import { filterName } from './containers/Create/Create-functions.js';

describe('filterName function', () => {
  it('Debe eliminar los caracteres especiales de un string', () => {
    const input = 'This is a test string!@#$';
    const expectedOutput = 'This is a test string';
    expect(filterName(input)).toEqual(expectedOutput);
  });

  it('Debe dejar caracteres alfanuméricos en un string', () => {
    const input = 'Testing 123';
    const expectedOutput = 'Testing 123';
    expect(filterName(input)).toEqual(expectedOutput);
  });

  it('Debe dejar espacios en un string', () => {
    const input = 'Testing 1 2 3   4     5';
    const expectedOutput = 'Testing 1 2 3   4     5';
    expect(filterName(input)).toEqual(expectedOutput);
  });
});
