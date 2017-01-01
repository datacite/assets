var banner_jquery = $.noConflict(true);

(function($) {
  function init() {
    var banner = $("<div>").attr("id", "banner");
    $("body").prepend(banner);

    addTestinfo();
  }

  function createToolBar(id) {
    var div = $("<div>").attr("id", id);
    $("#banner").append(div);
    return div;
  }

  function addTestinfo() {
    var toolbar = createToolBar("testinfo");
    toolbar.text("This service is for testing only.");
    toolbar.append($("<br>"));
  }

  $(document).ready(init);
})(banner_jquery);
