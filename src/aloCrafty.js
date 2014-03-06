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
  var attributes;
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

ALC.closeTag = function (tag) {
  var output = ''; 
  if (ALC.isPaired(tag)) output = '</'+tag+'>';
  return output;
};

ALC.isPaired = function (tag) {
  return (ALC.unpariedTags.indexOf(tag)<0);
};

ALC.serializeContent = function (content){
  output = '';
  for (var att in content) {
    output += content[att];
  };
  return output;
}

generateFunction = function(name) {
  window[name]  = function(){
    return ALC.tag(name, arguments);
  };
};

generateFunctions = function () {
  var tags=['label','html','title','body','div','span','a','ul','li','form','input','p'];
  for(i in tags){
    generateFunction(tags[i]);
  };
};

generateFunctions();
