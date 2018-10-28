function ProductHandler(url, divProductContainer, filterCheckbox) {
  this.$json_url = url;
  this.$divProductContainer = $(divProductContainer);
  this.$filterCheckbox = $(filterCheckbox);
  this.$product_array = [];
};

ProductHandler.prototype.madeProductFromJson = function(json) {
  var _this = this;
  $.each(json, function (index, product) {
    _this.$product_array.push(new Product(product.name, product.url, product.brand, product.color, product.sold_out));
  });
};

ProductHandler.prototype.productView = function(products) {
  this.$product_viewer = new ProductViewer();
  this.$product_viewer.displayProducts(this.$divProductContainer, products);
};

ProductHandler.prototype.madeProductFromJsonAndDisplayThem = function(json) {
  this.madeProductFromJson(json);
  this.productView(this.$product_array);
};

ProductHandler.prototype.init = function() {
  var _this = this;
  var product_array = [];
  csv_reader = new CsvReader();
  csv_reader.getJsonFormatData(this.$json_url, this);
};

ProductHandler.prototype.bindEvent = function() {
  this.$filterCheckbox.on('click', this.applyFilter());
};

ProductHandler.prototype.elementArrayDataLength = function(object, attribute) {
  return object.data(attribute).length;
};

ProductHandler.prototype.checkValueNotPresentInArray = function(value, array) {
  return jQuery.inArray(value, array) < 0;
};

ProductHandler.prototype.checkProductMatchOtherFilters = function(product, filter, filter_type, filter_attribute) {
  if (this.elementArrayDataLength(filter, filter_attribute) && this.checkValueNotPresentInArray(product[filter.data(filter_type)], filter.data(filter_attribute))) {
    return false;
  }
  else {
    return true;
  }
};

ProductHandler.prototype.applyFilter = function() {
  var _this = this;
  return function(event) {
    parentElement = $("#"+event.target.parentElement.id);
    parentElement.removeData('type-selected');
    selectedCheckboxes = parentElement.children('input');
    selectedCheckboxesData = [];
    product_array = [];
    $.each(selectedCheckboxes, function(index, filter) {
      if ($('#'+filter.id).prop("checked") == true ) {
        selectedCheckboxesData.push(filter.value);
      }
    });
    parentElement.data('type-selected', selectedCheckboxesData);
    $.each(_this.$product_array, function(index, product) {
      firstSibling = parentElement.siblings().first();
      secondSibling = parentElement.siblings().last();
      if ((!(_this.checkValueNotPresentInArray( product[parentElement.data('type')], selectedCheckboxesData )) || (selectedCheckboxesData.length == 0)) && (_this.checkProductMatchOtherFilters(product, firstSibling, 'type', 'type-selected')) && (_this.checkProductMatchOtherFilters(product, secondSibling, 'type', 'type-selected'))) {
        product_array.push(product);
      }
    });
    _this.productView(product_array);
  };
};

$( document ).ready(function() {
  var product_handler = new ProductHandler('product.json', '#products-container', '.filter-checkbox');
  product_handler.init();
  product_handler.bindEvent();
});
