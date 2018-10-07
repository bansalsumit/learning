// function DragDrop(selectBox) {
//   this.$selectBox = $(selectBox);
// };

// DragDrop.prototype.bindEvents = function() {
//   this.$selectBox.on('change', this.swapOption);
// };

// DragDrop.prototype.swapOption = function() {
//   detachedOption = $(this).find(':selected').detach();
//   detachedOption.appendTo($(this).siblings());
// };

// $( document ).ready(function() {
//   var dragDrop = new DragDrop('select');
//   dragDrop.bindEvents();
// });
// function DragDrop(selectBox) {
//   this.$selectBox = $(selectBox);
// };

// DragDrop.prototype.bindEvents = function() {
//   this.$selectBox.on('change', this.swapOption);
// };

// DragDrop.prototype.swapOption = function() {
//   detachedOption = $(this).find(':selected').detach();
//   detachedOption.appendTo($(this).siblings());
// };

// $( document ).ready(function() {
// //   var dragDrop = new DragDrop('select');
// //   dragDrop.bindEvents();
//             $( "#13" ).draggable();

// });
// function dragstart_handler(ev) {
//    debugger

//  console.log("dragStart");
//  // Add the target element's id to the data transfer object
//  ev.dataTransfer.setData("text/plain", ev.target.id);
// ev.dataTransfer.dropEffect = "move";

// }
// function dragover_handler(ev) {
//  ev.preventDefault();
//  // Set the dropEffect to move
//  ev.dataTransfer.dropEffect = "move"
// }
// function drop_handler(ev) {
//  ev.preventDefault();
//  // Get the id of the target and add the moved element to the target's DOM
//  var data = ev.dataTransfer.getData("text/plain");
//  ev.target.appendChild(document.getElementById(data));
// }

function DragDrop(liList, ulList) {
  this.$liList = $(liList);
  this.$ulList = $(ulList);
};

DragDrop.prototype.bindEvents = function() {
//   debugger
// this.$liList.on('click', this.clickData());
};

DragDrop.prototype.clickData = function() {
  var _this = this;
  return function () {
    console.log($(this).data());
  };

};

DragDrop.prototype.init = function() {
  // debugger{ cursor: 'move' ,containment: "body", appendTo: "body"}
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
  var dragDrop = new DragDrop('.li-draggable', '.ul-droppable');
  dragDrop.init();
});
