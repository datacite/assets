var banner_jquery = $.noConflict(true);

(function($) {
  function init() {
    addTestinfo();
  }

  function createToolBar(id) {
    var div = $("<div>").attr("id", id);
    div.append($("<br>"));
    $("body").prepend(div);
    return div;
  }

  function addTestinfo() {
    var toolbar = createToolBar("testinfo");
    toolbar.text("This service is for testing only.");
  }

  $(document).ready(init);
})(banner_jquery);
