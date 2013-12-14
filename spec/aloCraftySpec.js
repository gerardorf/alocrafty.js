describe("a lo crafty", function() {
  it("generates html tag", function() {
    expect(ALC.html()).to.equal('<html></html>');
  });

  it("generates html tag with arbitrary content", function() {
    expect(ALC.html('arbitrary content')).to.equal('<html>arbitrary content</html>');
  });

  it("generates html tag with a nested tag", function() {
    var testHtml = '<html><title>arbitrary title</title></html>';
    var output =  ALC.html(ALC.title('arbitrary title'));
    expect(output).to.equal(testHtml);
  });

  it("allows adding tag attributes as a map", function() {
    var testHtml = '<body class="test_class" id="main"></body>';
    var output =  ALC.body({class:'test_class', id:'main'});
    expect(output).to.equal(testHtml);
  });

});
