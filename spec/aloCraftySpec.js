describe("a lo crafty", function() {
  it("generates html tag", function() {
    expect(html()).toEqual('<html></html>');
  });

  it("generates html tag with arbitrary content", function() {
    expect(html('arbitrary content')).toEqual('<html>arbitrary content</html>');
  });
});