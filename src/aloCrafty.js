var ALC={}

ALC.openMarkUp = '<';
ALC.closeMarkUp = '>';

ALC.tag  = function (tag, args){
  return ALC.openMarkUp
        +tag
        +ALC.serializeAttributes(args)
        +ALC.closeMarkUp
        +ALC.serializeContent(args)
        +ALC.closeTag(tag);
}

ALC.serializeAttributes = function (atts){
  attributes = ALC.extractAttributes(atts);
  return ALC.writeAttributes(attributes);
}

ALC.extractAttributes = function (atts){
  var attributes;
  if (typeof atts[0]==='object'){
    attributes=Array.prototype.shift.call(atts);
  }
  return attributes;
}

ALC.writeAttributes = function (atts){
  var output='';
  for (var att in atts){
    output += ' '+att+'="'+atts[att]+'"' ;
  }
  return output;
}

ALC.closeTag = function (tag) {
  return '</'+tag+'>'
}

ALC.serializeContent = function (content){
  output = '';
  for (var att in content) {
    output += content[att];
  };
  return output
}

html=function() {
  return ALC.tag('html', arguments);
}

title=function() {
  return ALC.tag('title', arguments);
}

body=function() {
  return ALC.tag('body', arguments);
}

div=function() {
  return ALC.tag('div', arguments);
}

span=function() {
  return ALC.tag('span', arguments);
}

a=function() {
  return ALC.tag('a', arguments);
}

ul=function() {
  return ALC.tag('ul', arguments);
}

li=function() {
  return ALC.tag('li', arguments);
}