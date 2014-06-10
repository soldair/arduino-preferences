var ini = require('ini');
var path = require('path');
var fs = require('fs');

/*
http://arduino.cc/en/Hacking/Preferences
- /Users/<USERNAME>/Library/Arduino/preferences.txt (Mac)
- c:\Documents and Settings\<USERNAME>\Application Data\Arduino\preferences.txt (Windows XP)
- c:\Users\<USERNAME>\AppData\Roaming\Arduino\preferences.txt (Windows Vista)
- ~/.arduino/preferences.txt (Linux)
*/

module.exports = function(){

  var home = process.env.HOME;
  // TODO windows
  if(!home) return false;

  var files = [];
  if(home.indexOf('/Users') == 0) {
    files.push(path.join(home+"/Library/Arduino/preferences.txt"));
  } else {
    files.push(path.join(home+"/.arduino15/preferences.txt"));
    files.push(path.join(home+"/.arduino/preferences.txt"));
  }

  var configs = {};

  for(var i=0;i<files.length;++i){
    
    if(fs.existsSync(files[i])){
      try{
        configs[i] = configs[files[i]] = ini.parse(fs.readFileSync(files[i])+'');
      } catch(e){
        console.error(e);
      }
    }

  }
  
  return configs[0]?configs:false;

}
