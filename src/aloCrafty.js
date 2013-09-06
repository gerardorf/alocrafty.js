var ALC={}

ALC.tag  = function (tag){
  return ALC.openTag(tag)
        +ALC.closeTag(tag);
}

ALC.openTag = function (tag) {
  return '<'+tag+'>'
}

ALC.closeTag = function (tag) {
  return '</'+tag+'>'
}

html=function() {
  return ALC.tag('html');
}