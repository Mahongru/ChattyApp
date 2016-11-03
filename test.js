var App = {
  value: 2,
  add: function() {
    console.log(this.value);
  }
}

App.add();

var Socket = {
  value: 10,
  add: App.add //--> this points to Socket
  // add: App.add.bind(App) //--> this points to App because of .bind(App)
}

Socket.add();

// var that = this;
// $('button').on('submit', function() {
//   that.
//   this.
// })