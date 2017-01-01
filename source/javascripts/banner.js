var banner_jquery = $.noConflict(true);

(function($) {
  function init() {
    var banner = $("<div>").attr("id", "banner");
    $("body").prepend(banner);

    addTestinfo();
  }

  function addTestinfo() {
    var toolbar = $("<div>")
      .attr("id", "testinfo")
      .text("This service is for testing only.");
    $("#banner").append(toolbar);
    $("#banner").append($("<br>"));
  }

  $(document).ready(init);
})(banner_jquery);
