function CsvReader() {
};

CsvReader.prototype.getJsonFormatData = function(url, scope) {
  $.ajax({
    dataType: "json",
    url: url,
    type: 'get',
    mimeType: "application/json",
    success: function(json) {
      scope.madeProductFromJsonAndDisplayThem(json);
    }
  });
};
