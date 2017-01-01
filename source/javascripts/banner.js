var banner_jquery = $.noConflict(true);

(function($) {
  function init() {
    var banner = $("<div>")
      .attr("id", "banner");
      .text("This service is for testing only.");
    $("body").prepend(banner);
  }

  $(document).ready(init);
})(banner_jquery);
