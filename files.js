function Item() {
  this.path = path;
  this.name = name;
  this.score = score;
  this.status = status;
  this.more = more;

  this.addPath = function (path) {
    this.path = path;
  }
  this.addName = function (name) {
    this.name = name;
  }
  this.addScoer = function (scoer) {
    this.scoer = scoer;
  }
  this.addStatus = function (status) {
    this.status = status;
  }
  this.addMore = function (more) {
    this.more = more;
  }
}
