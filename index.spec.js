describe('Example test', () => {
  describe('Sum', () => {
    const suma = (a, b) => {
      return a + b;
    };

    test('Sum 2 numbers', () => {
      expect(suma(2, 1)).toEqual(3);
    });
  });
});
