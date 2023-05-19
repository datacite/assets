$(document).ready(function(){
  var sp = new StatusPage.page({ page: 'nmtzsv0smzk5'});

  sp.summary({
    success: function(data) {
      // adds the text description
      $('.color-description').text(data.status.description);
      // appends the status indicator as a class name so we can use the right color for the status light thing
      $('.color-dot').addClass(data.status.indicator);
    }
  });
});
