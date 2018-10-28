function ProductViewer() {
};

ProductViewer.prototype.displayProducts = function(divProductContainer, products) {
  var _this = this;
  this.emptyContainer(divProductContainer);
  $.each(products, function(index, product) {
    var img = $('<img>', { src: product.url });
    _this.pushElementInContainer(img, divProductContainer);
  });
}

ProductViewer.prototype.emptyContainer = function(container) {
  container.empty();
};

ProductViewer.prototype.pushElementInContainer = function(element, container) {
  element.appendTo(container);
};
