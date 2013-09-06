var ALC={}

ALC.tag  = function (tag, args){
  return ALC.openTag(tag)
        +ALC.serializeContent(args)
        +ALC.closeTag(tag);
}

ALC.openTag = function (tag) {
  return '<'+tag+'>'
}

ALC.closeTag = function (tag) {
  return '</'+tag+'>'
}

ALC.serializeContent = function (content){
  output = '';
  for (var att in content) {
    output = content[att];
  };
  return output
}

html=function() {
  return ALC.tag('html', arguments);
}