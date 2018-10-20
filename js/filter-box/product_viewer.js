function ProductViewer(divProductContainer, filterCheckbox) {
  this.$divProductContainer = divProductContainer;
  this.$filterCheckbox = filterCheckbox;
};

ProductViewer.prototype.bindEvents= function() {
  this.$filterCheckbox.on('click', this.applyfilter());
};

ProductViewer.prototype.applyfilter = function() {
  var _this = this;
  return function(event) {
    if ($("#"+event.target.id).prop("checked")) {
      parentElement = $("#"+event.target.parentElement.id);
      parentElementTypeSelected  = parentElement.data('type-selected');
      parentElementTypeSelected.push(event.target.value);
      parentElement.removeData('type-selected');
      parentElement.data('type-selected', parentElementTypeSelected);
    }
    else {
      // debugger;
      parentElement = $("#"+event.target.parentElement.id);
      parentElement.removeData('type-selected');
      selectedCheckbox = $("#"+event.target.id);
      selectedCheckboxSiblings = selectedCheckbox.siblings('input');
      selectedCheckboxData = [];
      $.each(selectedCheckboxSiblings, function(index, filter) {
        if ($('#'+filter.id).prop("checked") == true ) {
          selectedCheckboxData.push(filter.value);
        }
      });
      // debugger;
      parentElementTypeSelected = [];
      parentElementTypeSelected = selectedCheckboxData;
      parentElement.data('type-selected', selectedCheckboxData);
    }
    product_handler = new ProductHandler('product.json', '#products-container', '.filter-checkbox');
      var product_array = [];
      csv_reader = new CsvReader();
      csv_reader.getJsonFormatData(product_handler.$json_url);
      debugger;
      $.each(csv_reader.$json_data, function(index, product) {
        // debugger;
        firstSibling = parentElement.siblings().first();
        secondSibling = parentElement.siblings().last();
        siblingType = []
        // product[product_type]
        // $.each(parentElement.data('sibling-type'), function(index, product){
        //   siblingType.push(product)
        // });
        firstSiblingTrue = true;
        secondSiblingTrue = true;
        product_type = event.target.name
        // product[product_type] == event.target.value
        if (jQuery.isEmptyObject(firstSibling.data('type-selected')) == false) {
          if (jQuery.inArray( product[firstSibling.data('type')], firstSibling.data('type-selected') ) == -1) {
            firstSiblingTrue = false;
          }
        }
        if (jQuery.isEmptyObject(secondSibling.data('type-selected')) == false) {
          if (jQuery.inArray( product[secondSibling.data('type')], secondSibling.data('type-selected') ) == -1) {
            secondSiblingTrue = false;
          }
        }
        // if ((jQuery.isEmptyObject(firstSibling.data('type-selected')) != false) && (jQuery.isEmptyObject(firstSibling.data('type-selected')) != false))
        if ((jQuery.inArray( product[product_type], parentElementTypeSelected ) != -1) && firstSiblingTrue && secondSiblingTrue ) {
          product_array.push(new Product(product.name, product.url, product.brand, product.color, product.sold_out));
        }
        if ((parentElementTypeSelected.length == 0) && firstSiblingTrue && secondSiblingTrue ) {
          product_array.push(new Product(product.name, product.url, product.brand, product.color, product.sold_out));
        }
      });
      product_viewer = new ProductViewer($('#products-container'), this.$filterCheckbox);
      product_viewer.displayProducts(product_array);
  };
}

ProductViewer.prototype.displayProducts = function(products) {
  var _this = this;
  this.$divProductContainer.empty();
  $.each(products, function(index, product) {
    var img = $('<img>', { src: product.$url });
    img.appendTo(_this.$divProductContainer);
  });
}
