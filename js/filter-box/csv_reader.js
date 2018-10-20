function CsvReader() {
  this.$json_data = [];
};

CsvReader.prototype.getJsonFormatData = function(url) {
  var _this = this;
  $.ajax({
    dataType: "json",
    url: url,
    type: 'get',
    mimeType: "application/json",
    success: function(json) {
      _this.$json_data = json;
    }
  });
};
