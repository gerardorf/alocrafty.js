var ALC={};

ALC.openMarkUp = '<';
ALC.closeMarkUp = '>';
ALC.unpariedTags = ['input'];

ALC.tag  = function (tag, args){
  return ALC.openMarkUp
        +tag
        +ALC.serializeAttributes(args)
        +ALC.closeMarkUp
        +ALC.serializeContent(args)
        +ALC.closeTag(tag);
};

ALC.serializeAttributes = function (atts){
  attributes = ALC.extractAttributes(atts);
  return ALC.writeAttributes(attributes);
};

ALC.extractAttributes = function (atts){
  var attributes='';
  if (typeof atts[0]==='object'){
    attributes=Array.prototype.shift.call(atts);
  }
  return attributes;
};

ALC.writeAttributes = function (atts){
  var output='';
  for (var att in atts){
    output += ' '+att+'="'+atts[att]+'"' ;
  }
  return output;
};

ALC.serializeContent = function (content){
  output = '';
  for (var att in content) {
    output += content[att];
  };
  return output;
}

ALC.closeTag = function (tag) {
  var output = ''; 
  if (ALC.isPaired(tag)) output = '</'+tag+'>';
  return output;
};

ALC.isPaired = function (tag) {
  return (ALC.unpariedTags.indexOf(tag)<0);
};

generateTag = function(tag) {
  window[tag]  = function(){
    return ALC.tag(tag, arguments);
  };
};

generateTags = function () {
  var tags=['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','button','anvas','caption','center','cite','code','col','colgroup','command','datalist','dd','del','details','dfn','dialog','dir','div','dl','dt','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','head','header','hgroup','h1','h2','h3','h4','h5','h6','hr','html','i','iframe','img','input','ins','kbd','keygen','label','legend','li','link','main','map','mark','menu','meta','meter','nav','noframes','noscript','object','ol','optgroup','ption','output','p','param','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span','strike','strong','tyle','sub','summary','sup','table','tbody','td','textarea','tfoot','th','thead','time','title','tr','track','tt','u','ul','var','video','wbr'];
  for(i in tags){
    generateTag(tags[i]);
  };
};

generateEmptyTag = function (tag) {
  window[tag] = function(){
    return '<' + tag + '>';
  };
};

generateEmptyTags = function () {
  var tags=['br'];
  for(i in tags){
    generateEmptyTag(tags[i]);
  };
};

generateCommentTag = function(){
  comment = function (text) {
    return '<!--'+text+'-->';
  };
};

generateTags();
generateEmptyTags();
generateCommentTag();
