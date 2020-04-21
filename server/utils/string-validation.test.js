var {isValidString} = require('./string-validation');
var expect = require('expect');

describe('isValidString', function(){
  it('should test the string having length 0', function() {
    var invalidStr = '';
    var status = isValidString(invalidStr);
    expect(status).toBeFalsy();
  });

  it('should test the string having only spaces', function() {
    var invalidStr = '    ';
    var status = isValidString(invalidStr);
    expect(status).toBeFalsy();
  });

  it('should test the string having space on either side', function() {
    var invalidStr = '   aalok    ';
    var status = isValidString(invalidStr);
    expect(status).toBeTruthy();
  });

  it('should test the string having space on either side and space b/w string', function() {
    var invalidStr = '   aalok gupta  ';
    var status = isValidString(invalidStr);
    expect(status).toBeTruthy();
  });

  it('should test the string having space on either side and space b/w string and containg special char', function() {
    var invalidStr = '   @@lok gupt@ !!  ';
    var status = isValidString(invalidStr);
    expect(status).toBeTruthy();
  });
});
