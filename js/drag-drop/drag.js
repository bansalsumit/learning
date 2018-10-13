function List(liList, ulList) {
  this.$liList = $(liList);
  this.$ulList = $(ulList);
};

List.prototype.init = function() {
  this.$liList.draggable({
    start: function( event, ui ) {
      event.target.classList.add('styleAdd');
    },
    stop: function( event, ui ) {
      event.target.classList.remove('styleAdd');
    }
  });
  this.$ulList.droppable({
    drop: function( event, ui ) {
      event.target.append(ui.draggable.context);
    }
  });
};

$( document ).ready(function() {
  var country_list = new List('.li-draggable', '.ul-droppable');
  country_list.init();
});
