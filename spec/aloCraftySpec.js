describe("a lo crafty", function() {
  it("generates html tag", function() {
    expect(html()).toEqual('<html></html>');
  });

  it("generates html tag with arbitrary content", function() {
    expect(html('arbitrary content')).toEqual('<html>arbitrary content</html>');
  });

  it("generates html tag with a nested tag", function() {
    var testHtml = '<html><title>arbitrary title</title></html>';
    var output =  html(
                    title('arbitrary title')
                  );
    expect(output).toEqual(testHtml);
  });

  it("allows adding tag attributes as a map", function() {
    var testHtml = '<body class="test_class" id="main"></body>';
    var output =  body({class:'test_class', id:'main'});
    expect(output).toEqual(testHtml);
  });

  it("allows adding a nested tag with attributes", function () {
    var testHtml='<div class="banner"><span class="title">Jasmine</span></div>';
    var output = div({class:'banner'},
                    span({class:'title'},'Jasmine')
                  );
    expect(output).toEqual(testHtml);
  });

});