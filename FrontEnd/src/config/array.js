Array.prototype.getIndexof = function (key, val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i][key] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function (key, val) {
  var index = this.getIndexof(key, val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
