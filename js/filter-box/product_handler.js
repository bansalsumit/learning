function ProductHandler(url, divProductContainer, filterCheckbox, sortingCheckbox) {
  this.$json_url = url;
  this.$divProductContainer = $(divProductContainer);
  this.$filterCheckbox = $(filterCheckbox);
  this.$sortingCheckbox = $(sortingCheckbox);
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
  this.$sortingCheckbox.on('click', this.sortingProduct());
};

ProductHandler.prototype.sortingProduct = function() {
  var _this = this;
  return function(event) {
    _this.$filterCheckbox.first().triggerHandler("click");
  };
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

ProductHandler.prototype.getProductsWhichMatchWithFiltersCriteria = function(parentElement, selectedCheckboxesData) {
  var _this = this;
  $.each(this.$product_array, function(index, product) {
    firstSibling = parentElement.siblings().first();
    secondSibling = parentElement.siblings().last();
    if ((!(_this.checkValueNotPresentInArray( product[parentElement.data('type')], selectedCheckboxesData )) || (selectedCheckboxesData.length == 0)) && (_this.checkProductMatchOtherFilters(product, firstSibling, 'type', 'type-selected')) && (_this.checkProductMatchOtherFilters(product, secondSibling, 'type', 'type-selected'))) {
      product_array.push(product);
    }
  });
};

ProductHandler.prototype.sortingNameVice = function(product_array, attribute) {
  product_array.sort(function(firstElement, secondElement) {
    if (firstElement[attribute] > secondElement[attribute]) {
      return 1;
    }
    else if (firstElement[attribute] < secondElement[attribute]) {
      return -1;
    }
    else {
      return 0;
    }
  });
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
    _this.getProductsWhichMatchWithFiltersCriteria(parentElement, selectedCheckboxesData);
    $.each(_this.$sortingCheckbox, function(i, element) {
      if ($('#' + element.id).prop("checked") == true ) {
        _this.sortingNameVice(product_array, element.value);

      }
      debugger
    })
    _this.productView(product_array);
  };
};

$( document ).ready(function() {
  var product_handler = new ProductHandler('product.json', '#products-container', '.filter-checkbox', '.sorting');
  product_handler.init();
  product_handler.bindEvent();
});
