var aloCrafty = (function (){
  var _renderer= (function (){

    var _openMarkUp = '<';
    var _closeMarkUp = '>';
    var _unpariedTags = ['input'];

    function _tag(tag, args){
      return _openMarkUp+
            tag+
            _serializeAttributes(args)+
            _closeMarkUp+
            _serializeContent(args)+
            _closeTag(tag);
    }

    function _serializeAttributes(atts){
      var attributes = _extractAttributes(atts);
      return _writeAttributes(attributes);
    }

    function _extractAttributes(atts){
      var attributes='';
      if (typeof atts[0]==='object'){
        attributes=Array.prototype.shift.call(atts);
      }
      return attributes;
    }

    function _writeAttributes(atts){
      var output='';
      for (var att in atts){
        output += ' '+att+'="'+atts[att]+'"' ;
      }
      return output;
    }

    function _serializeContent(content){
      var output = '';
      for (var i = 0, len = content.length; i < len; i++) {
        output += content[i];
      }
      return output;
    }

    function _closeTag(tag) {
      var output = '';
      if (_isPaired(tag)) {output = '</'+tag+'>';}
      return output;
    }

    function _isPaired(tag) {
      return (_unpariedTags.indexOf(tag)<0);
    }

    return{
      tag: _tag
    };

  })();

  var _populate = (function(){

    function _generateRegularTag(tag, namespace) {
      namespace[tag]  = function(){
        return _renderer.tag(tag, arguments);
      };
    }

    function _populateRegularTags(namespace) {
      var tags=['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','button','canvas','caption','center','cite','code','col','colgroup','command','datalist','dd','del','details','dfn','dialog','dir','div','dl','dt','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','head','header','hgroup','h1','h2','h3','h4','h5','h6','hr','html','i','iframe','img','input','ins','kbd','keygen','label','legend','li','link','main','map','mark','menu','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span','strike','strong','tyle','sub','summary','sup','table','tbody','td','textarea','tfoot','th','thead','time','title','tr','track','tt','u','ul','var','video','wbr'];
      for(var i in tags){
        _generateRegularTag(tags[i], namespace);
      }
    }

    function _populateBrTag(namespace) {
      namespace.br = function(){
        return '<br>';
      };
    }

    function _populateCommentTag(namespace){
      namespace.comment = function (text) {
        return '<!--' + text + '-->';
      };
    }

    function _populateHTMLTags(namespace) {
      _populateRegularTags(namespace);
      _populateBrTag(namespace);
      _populateCommentTag(namespace);
    }

    return{
      populateHTMLTags: _populateHTMLTags
    };

  })();

  return {
    populate: _populate.populateHTMLTags
  };

})();
