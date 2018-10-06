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
function dragstart_handler(ev) {
   debugger

 console.log("dragStart");
 // Add the target element's id to the data transfer object
 ev.dataTransfer.setData("text/plain", ev.target.id);
ev.dataTransfer.dropEffect = "move";

}
function dragover_handler(ev) {
 ev.preventDefault();
 // Set the dropEffect to move
 ev.dataTransfer.dropEffect = "move"
}
function drop_handler(ev) {
 ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
 var data = ev.dataTransfer.getData("text/plain");
 ev.target.appendChild(document.getElementById(data));
}
