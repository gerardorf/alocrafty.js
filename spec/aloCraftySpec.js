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
    var output =  div({class:'banner'},
                    span({class:'title'},'Jasmine')
                  );
    expect(output).toEqual(testHtml);
  });


  it("Can manage sofisticated html", function() {
    var url='http://www.becodemyfriend.com';
    var testHTML='<ul id="dl"><li id="dl_osx"><a href="http://www.becodemyfriend.com">OS X</a>(OS X 10.6 or 10.7 is required)</li><li id="dl_win_32"><a href="http://www.becodemyfriend.com">Windows</a> - also available as a <a href="http://www.becodemyfriend.com">portable version</a></li></ul>';

    output =  ul({id:"dl"},

                li({id:"dl_osx"},
                  a({href: url},'OS X'),
                  '(OS X 10.6 or 10.7 is required)'
                ),

                li({id:"dl_win_32"},
                  a({href: url},'Windows'),
                  ' - also available as a ',
                  a({href: url},'portable version')
                )

              );

    expect(output).toEqual(testHTML);
  });

});