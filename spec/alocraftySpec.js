describe("aloCrafty.js", function() {

  var a = {};
  aloCrafty.populate(a);

  it("generates html tag", function() {
    expect(a.html()).toEqual('<html></html>');
  });

  it("generates html tag with arbitrary content", function() {
    expect(a.html('arbitrary content')).toEqual('<html>arbitrary content</html>');
  });

  it("generates html tag with a nested tag", function() {
    var testHtml = '<html><title>arbitrary title</title></html>';
    var output =  a.html(
                    a.title('arbitrary title')
                  );
    expect(output).toEqual(testHtml);
  });

  it("allows adding tag attributes as a map", function() {
    var testHtml = '<body class="test_class" id="main"></body>';
    var output =  a.body({class:'test_class', id:'main'});
    expect(output).toEqual(testHtml);
  });

  it("allows adding a nested tag with attributes", function () {
    var testHtml='<div class="banner"><span class="title">Jasmine</span></div>';
    var output =  a.div({class:'banner'},
                    a.span({class:'title'},'Jasmine')
                  );
    expect(output).toEqual(testHtml);
  });


  it("can manage sofisticated html", function() {
    var url='http://www.becodemyfriend.com';
    var testHTML='<ul id="dl"><li id="dl_osx"><a href="http://www.becodemyfriend.com">OS X</a>(OS X 10.6 or 10.7 is required)</li><li id="dl_win_32"><a href="http://www.becodemyfriend.com">Windows</a> - also available as a <a href="http://www.becodemyfriend.com">portable version</a></li></ul>';

    var output =  a.ul({id:"dl"},

                a.li({id:"dl_osx"},
                  a.a({href: url},'OS X'),
                  '(OS X 10.6 or 10.7 is required)'
                ),

                a.li({id:"dl_win_32"},
                  a.a({href: url},'Windows'),
                  ' - also available as a ',
                  a.a({href: url},'portable version')
                )

              );

    expect(output).toEqual(testHTML);
  });

  it("can manage unpaired tags including forms, inputs and selects", function() {
    var testHTML='<form method="post" id="authentication" action="https://launchpad.37signals.com/authenticate"><div style="margin:0;padding:0;display:inline"><input type="hidden" value="MRUI2cdi2HaGtG88FOQ2z7ZmMJahFVuojHB/o0Mki4M=" name="authenticity_token"></div><input type="hidden" value="highrise" name="product" id="product"><input type="hidden" value="becode" name="subdomain" id="subdomain"><div class="login_form"><p class="password_entry"><label for="username">Username or email</label><input type="text" name="username" id="username" class="user_name" autocorrect="off" autocapitalize="off"></p></div></form>';

    var output = a.form({method:'post', id:'authentication', action:'https://launchpad.37signals.com/authenticate'},
                a.div({style:'margin:0;padding:0;display:inline'},
                  a.input({type:'hidden', value:'MRUI2cdi2HaGtG88FOQ2z7ZmMJahFVuojHB/o0Mki4M=', name:'authenticity_token'})
                ),
                a.input({type:'hidden', value:'highrise', name:'product', id:'product'}),
                a.input({type:'hidden', value:'becode', name:'subdomain', id:'subdomain'}),
                a.div({'class':'login_form'},
                  a.p({'class': 'password_entry'},
                    a.label({'for':'username'},'Username or email'),
                    a.input({type:'text', name:'username', id:'username', 'class':'user_name', autocorrect:'off', autocapitalize:'off'})
                  )
                )
              );
    expect(output).toEqual(testHTML);
  });

  it("can manage empty tags like <br>", function() {
    var testHTML='<p>Lorem ipsum<br>and an extra line</p>';

    var output= a.p('Lorem ipsum',a.br(),'and an extra line');
    expect(output).toEqual(testHTML);
    
  });

  it("can manage comments", function() {
    var testHTML='<p>Lorem ipsum<!--this is a comment-->dolor sit amet</p>';

    var output= a.p('Lorem ipsum',a.comment('this is a comment'),'dolor sit amet');
    expect(output).toEqual(testHTML);
    
  });
});
