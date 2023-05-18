!function(e){var t=function(i,n,s){s&&(s.stopPropagation(),s.preventDefault()),this.$element=e(i),this.$newElement=null,this.button=null,this.options=e.extend({},e.fn.selectpicker.defaults,this.$element.data(),"object"==typeof n&&n),null==this.options.title&&(this.options.title=this.$element.attr("title")),this.val=t.prototype.val,this.render=t.prototype.render,this.init()};t.prototype={constructor:t,init:function(){var t=this;this.$element.hide(),this.multiple=this.$element.prop("multiple");var i=this.$element.attr("class")!==undefined?this.$element.attr("class").split(/\s+/):"",n=this.$element.attr("id");this.$element.after(this.createView()),this.$newElement=this.$element.next(".select");var s=this.$newElement,l=this.$newElement.find(".dropdown-menu"),o=this.$newElement.find(".dropdown-arrow"),d=(l.find("li > a"),s.addClass("open").find(".dropdown-menu li > a").outerHeight());s.removeClass("open");var r=l.find("li .divider").outerHeight(!0),a=this.$newElement.offset().top,h=0,p=this.$newElement.outerHeight();this.button=this.$newElement.find("> button"),n!==undefined&&(this.button.attr("id",n),e('label[for="'+n+'"]').click(function(){s.find("button#"+n).focus()}));for(var c=0;c<i.length;c++)"selectpicker"!=i[c]&&this.$newElement.addClass(i[c]);this.multiple&&this.$newElement.addClass("select-multiple"),this.button.addClass(this.options.style),l.addClass(this.options.menuStyle),o.addClass(function(){if(t.options.menuStyle)return t.options.menuStyle.replace("dropdown-","dropdown-arrow-")}),this.checkDisabled(),this.checkTabIndex(),this.clickListener();var u=parseInt(l.css("padding-top"))+parseInt(l.css("padding-bottom"))+parseInt(l.css("border-top-width"))+parseInt(l.css("border-bottom-width"));if("auto"==this.options.size){var f=debounce(function(){var t=a-e(window).scrollTop(),i=e(window).innerHeight(),n=u+parseInt(l.css("margin-top"))+parseInt(l.css("margin-bottom"))+2;h=i-t-p-n,s.hasClass("dropup")&&(h=t-n),h>=300&&(h=300),l.css({"max-height":h+"px","overflow-y":"auto","min-height":3*d+"px"})},50);e(window).on("scroll",f),e(window).on("resize",f),window.MutationObserver?new MutationObserver(f).observe(this.$element.get(0),{childList:!0}):this.$element.bind("DOMNodeInserted",f)}else if(this.options.size&&"auto"!=this.options.size&&l.find("li").length>this.options.size){var m=l.find("li > *").filter(":not(.divider)").slice(0,this.options.size).last().parent().index(),v=l.find("li").slice(0,m+1).find(".divider").length;h=d*this.options.size+v*r+u,l.css({"max-height":h+"px","overflow-y":"scroll"})}window.MutationObserver?new MutationObserver(e.proxy(this.reloadLi,this)).observe(this.$element.get(0),{childList:!0}):this.$element.bind("DOMNodeInserted",e.proxy(this.reloadLi,this)),this.render()},createDropdown:function(){return e("<div class='btn-group select'><button class='btn dropdown-toggle clearfix' data-toggle='dropdown'><span class='filter-option'></span>&nbsp;<span class='caret'></span></button><span class='dropdown-arrow'></span><ul class='dropdown-menu' role='menu'></ul></div>")},createView:function(){var e=this.createDropdown(),t=this.createLi();return e.find("ul").append(t),e},reloadLi:function(){this.destroyLi(),$li=this.createLi(),this.$newElement.find("ul").append($li),this.render()},destroyLi:function(){this.$newElement.find("li").remove()},createLi:function(){var t=this,i=[],n=[],s="";if(this.$element.find("option").each(function(){i.push(e(this).text())}),this.$element.find("option").each(function(){var i=e(this).attr("class")!==undefined?e(this).attr("class"):"",s=e(this).text();if(s+=e(this).data("subtext")!==undefined?'<small class="muted">'+e(this).data("subtext")+"</small>":"",e(this).parent().is("optgroup")&&1!=e(this).data("divider"))if(0==e(this).index()){var l=e(this).parent().attr("label"),o=e(this).parent().data("subtext")!==undefined?'<small class="muted">'+e(this).parent().data("subtext")+"</small>":"";l+=o,0!=e(this)[0].index?n.push('<div class="divider"></div><dt>'+l+"</dt>"+t.createA(s,"opt "+i)):n.push("<dt>"+l+"</dt>"+t.createA(s,"opt "+i))}else n.push(t.createA(s,"opt "+i));else 1==e(this).data("divider")?n.push('<div class="divider"></div>'):1==e(this).data("hidden")?n.push(""):n.push(t.createA(s,i))}),i.length>0)for(var l=0;l<i.length;l++){this.$element.find("option").eq(l);s+="<li rel="+l+">"+n[l]+"</li>"}return 0!=this.$element.find("option:selected").length||t.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),e(s)},createA:function(e,t){return'<a tabindex="-1" href="#" class="'+t+'"><span class="">'+e+"</span></a>"},render:function(){var t=this;if("auto"==this.options.width){var i=this.$newElement.find(".dropdown-menu").css("width");this.$newElement.css("width",i)}else this.options.width&&"auto"!=this.options.width&&this.$newElement.css("width",this.options.width);this.$element.find("option").each(function(i){t.setDisabled(i,e(this).is(":disabled")||e(this).parent().is(":disabled")),t.setSelected(i,e(this).is(":selected"))});var n=this.$element.find("option:selected").map(function(){return e(this).attr("title")!=undefined?e(this).attr("title"):e(this).text()}).toArray(),s=n.join(", ");if(t.multiple&&t.options.selectedTextFormat.indexOf("count")>-1){var l=t.options.selectedTextFormat.split(">");(l.length>1&&n.length>l[1]||1==l.length&&n.length>=2)&&(s=n.length+" of "+this.$element.find("option").length+" selected")}s||(s=t.options.title!=undefined?t.options.title:t.options.noneSelectedText),this.$element.next(".select").find(".filter-option").html(s)},setSelected:function(e,t){t?this.$newElement.find("li").eq(e).addClass("selected"):this.$newElement.find("li").eq(e).removeClass("selected")},setDisabled:function(e,t){t?this.$newElement.find("li").eq(e).addClass("disabled"):this.$newElement.find("li").eq(e).removeClass("disabled")},checkDisabled:function(){this.$element.is(":disabled")&&(this.button.addClass("disabled"),this.button.click(function(e){e.preventDefault()}))},checkTabIndex:function(){if(this.$element.is("[tabindex]")){var e=this.$element.attr("tabindex");this.button.attr("tabindex",e)}},clickListener:function(){var t=this;e("body").on("touchstart.dropdown",".dropdown-menu",function(e){e.stopPropagation()}),this.$newElement.on("click","li a",function(i){var n=e(this).parent().index(),s=e(this).parent(),l=s.parents(".select");if(t.multiple&&i.stopPropagation(),i.preventDefault(),l.prev("select").not(":disabled")&&!e(this).parent().hasClass("disabled")){if(t.multiple){l.prev("select").find("option").eq(n).prop("selected")?l.prev("select").find("option").eq(n).removeAttr("selected"):l.prev("select").find("option").eq(n).prop("selected",!0).attr("selected","selected")}else l.prev("select").find("option").removeAttr("selected"),l.prev("select").find("option").eq(n).prop("selected",!0).attr("selected","selected");l.find(".filter-option").html(s.text()),l.find("button").focus(),l.prev("select").trigger("change")}}),this.$newElement.on("click","li.disabled a, li dt, li .divider",function(t){t.preventDefault(),t.stopPropagation(),$select=e(this).parent().parents(".select"),$select.find("button").focus()}),this.$element.on("change",function(){t.render()})},val:function(e){return e!=undefined?(this.$element.val(e),this.$element.trigger("change"),this.$element):this.$element.val()}},e.fn.selectpicker=function(i,n){var s,l=arguments,o=this.each(function(){var o=e(this),d=o.data("selectpicker"),r="object"==typeof i&&i;if(d)for(var a in i)d[a]=i[a];else o.data("selectpicker",d=new t(this,r,n));"string"==typeof i&&(property=i,d[property]instanceof Function?([].shift.apply(l),s=d[property].apply(d,l)):s=d[property])});return s!=undefined?s:o},e.fn.selectpicker.defaults={style:null,size:"auto",title:null,selectedTextFormat:"values",noneSelectedText:"Nothing selected",width:null,menuStyle:null,toggleSize:null}}(window.jQuery);