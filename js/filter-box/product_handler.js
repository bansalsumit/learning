function ProductHandler(url, divProductContainer, filterCheckbox) {
  this.$json_url = url;
  this.$divProductContainer = $(divProductContainer);
  this.$filterCheckbox = $(filterCheckbox);
};

ProductHandler.prototype.init = function() {
  var product_array = [];
  csv_reader = new CsvReader();
  csv_reader.getJsonFormatData(this.$json_url);
  debugger;
  $.each(csv_reader.$json_data, function (index, product) {
    product_array.push(new Product(product.name, product.url, product.brand, product.color, product.sold_out));
  });
  product_viewer = new ProductViewer(this.$divProductContainer, this.$filterCheckbox);
  product_viewer.displayProducts(product_array);
  product_viewer.bindEvents();
};

$( document ).ready(function() {
  var product_handler = new ProductHandler('product.json', '#products-container', '.filter-checkbox');
  product_handler.init();
});

// ProductHandler.prototype.getJsonFromFile = function() {
//   this.$csv_reader = new CsvReader();
//   this.$csv_reader.getJsonFormatData(this.$json_url);
//   debugger;
// };

// ProductHandler.prototype.madeProductFromJson = function() {
//   $.each(csv_reader.$json_data, function (index, product) {
//     product_array.push(new Product(product.name, product.url, product.brand, product.color, product.sold_out));
//   });
// };

// ProductHandler.prototype.displayProducts = function() {
//   product_viewer = new ProductViewer(this.$divProductContainer, this.$filterCheckbox);
//   product_viewer.displayProducts(product_array);
// };
