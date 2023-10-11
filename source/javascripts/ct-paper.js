function debounce(a,t,e){var i;return function(){var n=this,s=arguments;clearTimeout(i),i=setTimeout(function(){i=null,e||a.apply(n,s)},t),e&&!i&&a.apply(n,s)}}var searchVisible=0,transparent=!0,transparentDemo=!0,fixedTop=!1,navbar_initialized=!1;$(document).ready(function(){window_width=$(window).width(),window_width<768&&gsdk.initRightMenu(),$('[data-toggle="morphing"]').each(function(){$(this).morphingButton()}),$('[rel="tooltip"]').tooltip(),0!=$(".switch").length&&$(".switch").bootstrapSwitch(),0!=$("[data-toggle='switch']").length&&$("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch(),0!=$(".selectpicker").length&&$(".selectpicker").selectpicker(),0!=$(".tagsinput").length&&$(".tagsinput").tagsInput(),0!=$(".datepicker").length&&$(".datepicker").datepicker({weekStart:1,color:"{color}"}),$(".btn-tooltip").tooltip(),$(".label-tooltip").tooltip(),$(".carousel").carousel({interval:4e3}),$(".form-control").on("focus",function(){$(this).parent(".input-group").addClass("input-group-focus")}).on("blur",function(){$(this).parent(".input-group").removeClass("input-group-focus")}),demo.initPickColor(),gsdk.fitBackgroundForCards(),gsdk.initNavbarSearch(),gsdk.initPopovers(),gsdk.initCollapseArea(),gsdk.initSliders(),gsdk.initVideoCards()}),$(window).resize(function(){$(window).width()<768&&gsdk.initRightMenu()}),gsdk={misc:{navbar_menu_visible:0},initRightMenu:function(){navbar_initialized||($navbar=$("nav").find(".navbar-collapse").first().clone(!0),$navbar.css("min-height",window.screen.height),ul_content="",$navbar.children("ul").each(function(){content_buff=$(this).html(),ul_content+=content_buff}),ul_content='<ul class="nav navbar-nav">'+ul_content+"</ul>",$navbar.html(ul_content),$("body").append($navbar),background_image=$navbar.data("nav-image"),background_image!=undefined&&$navbar.css("background","url('"+background_image+"')").removeAttr("data-nav-image").css("background-size","cover").addClass("has-image"),$toggle=$(".navbar-toggle"),$navbar.find("a").removeClass("btn btn-round btn-default"),$navbar.find("button").removeClass("btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral"),$navbar.find("button").addClass("btn-simple btn-block"),$toggle.click(function(){1==gsdk.misc.navbar_menu_visible?($("html").removeClass("nav-open"),gsdk.misc.navbar_menu_visible=0,$("#bodyClick").remove(),setTimeout(function(){$toggle.removeClass("toggled")},400)):(setTimeout(function(){$toggle.addClass("toggled")},430),div='<div id="bodyClick"></div>',$(div).appendTo("body").click(function(){$("html").removeClass("nav-open"),gsdk.misc.navbar_menu_visible=0,$("#bodyClick").remove(),setTimeout(function(){$toggle.removeClass("toggled")},400)}),$("html").addClass("nav-open"),gsdk.misc.navbar_menu_visible=1)}),navbar_initialized=!0)},checkScrollForTransparentNavbar:debounce(function(){$(document).scrollTop()>260?transparent&&(transparent=!1,$('nav[role="navigation"]').removeClass("navbar-transparent")):transparent||(transparent=!0,$('nav[role="navigation"]').addClass("navbar-transparent"))},17),fitBackgroundForCards:function(){$(".card").each(function(){$(this).hasClass("card-product")||$(this).hasClass("card-user")||(image=$(this).find(".image img"),image.hide(),image_src=image.attr("src"),$(this).find(".image").css({"background-image":"url('"+image_src+"')","background-position":"center center","background-size":"cover"}))})},initPopovers:function(){0!=$('[data-toggle="popover"]').length&&($("body").append('<div class="popover-filter"></div>'),$('[data-toggle="popover"]').popover().on("show.bs.popover",function(){$(".popover-filter").click(function(){$(this).removeClass("in"),$('[data-toggle="popover"]').popover("hide")}),$(".popover-filter").addClass("in")}).on("hide.bs.popover",function(){$(".popover-filter").removeClass("in")}))},initCollapseArea:function(){$('[data-toggle="gsdk-collapse"]').each(function(){var a=$(this).attr("data-target");$(a).addClass("gsdk-collapse")}),$('[data-toggle="gsdk-collapse"]').hover(function(){var a=$(this).attr("data-target");$(this).hasClass("state-open")||($(this).addClass("state-hover"),$(a).css({height:"30px"}))},function(){var a=$(this).attr("data-target");$(this).removeClass("state-hover"),$(this).hasClass("state-open")||$(a).css({height:"0px"})}).click(function(a){a.preventDefault();var t=$(this).attr("data-target"),e=$(t).children(".panel-body").height();$(this).hasClass("state-open")?($(t).css({height:"0px"}),$(this).removeClass("state-open")):($(t).css({height:e+30}),$(this).addClass("state-open"))})},initSliders:function(){0!=$("#slider-range").length&&$("#slider-range").slider({range:!0,min:0,max:500,values:[75,300]}),0!=$("#refine-price-range").length&&$("#refine-price-range").slider({range:!0,min:0,max:999,values:[100,850],slide:function(a,t){min_price=t.values[0],max_price=t.values[1],$(this).siblings(".price-left").html("&euro; "+min_price),$(this).siblings(".price-right").html("&euro; "+max_price)}}),0==$("#slider-default").length&&0==$("#slider-default2").length||$("#slider-default, #slider-default2").slider({value:70,orientation:"horizontal",range:"min",animate:!0})},initVideoCards:function(){$('[data-toggle="video"]').click(function(){id_video=$(this).data("video"),video=$("#"+id_video).get(0),card_parent=$(this).closest(".card"),video.paused?(video.play(),$(this).html('<i class="fa fa-pause"></i> Pause'),card_parent.addClass("state-play")):(video.pause(),$(this).html('<i class="fa fa-play"></i> Play'),card_parent.removeClass("state-play"))})},initNavbarSearch:function(){$('[data-toggle="search"]').click(function(){0==searchVisible?(searchVisible=1,$(this).parent().addClass("active"),$(".navbar-search-form").fadeIn(function(){$(".navbar-search-form input").focus()})):(searchVisible=0,$(this).parent().removeClass("active"),$(this).blur(),$(".navbar-search-form").fadeOut(function(){$(".navbar-search-form input").blur()}))})}},demo={initPickColor:function(){$(".pick-class-label").click(function(){var a=$(this).attr("new-class"),t=$("#display-buttons").attr("data-class"),e=$("#display-buttons");if(e.length){var i=e.find(".btn");i.removeClass(t),i.addClass(a),e.attr("data-class",a)}})}},examples={initContactUsMap:function(){var a=new google.maps.LatLng(44.43353,26.093928),t={zoom:14,center:a,scrollwheel:!1},e=new google.maps.Map(document.getElementById("contactUsMap"),t);new google.maps.Marker({position:a,title:"Hello World!"}).setMap(e)}};