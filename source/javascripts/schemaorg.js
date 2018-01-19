$(document).ready(function() {
  var identifier = $("meta[name='DC.identifier']").attr("content");
  if (identifier === undefined) {
    return;
  }
  var doi = new URL(identifier);
  var url = 'https://data.datacite.org/application/vnd.schemaorg.ld+json/' + doi.pathname;

  $.ajax({
    url: url,
    dataType: 'text', // don't convert JSON to Javascript object
    success: function(data) {
      $('<script>')
         .attr('type', 'application/ld+json')
         .text(data)
         .appendTo('head');
    },
    error: function (error) {
      console.log(error.responseJSON);
    }
  });
});
