var ALC={}

ALC.tag  = function (tag){
  return '<'+tag+'></'+tag+'>'
}

html=function() {
  return ALC.tag('html');
}