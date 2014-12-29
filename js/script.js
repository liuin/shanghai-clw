if (typeof jQuery === 'undefined') { throw new Error('JavaScript requires jQuery') }

/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { console.log("222"); called = true;  })
    var callback = function () {console.log("111"); if (!called) $($el).trigger($.support.transition.end);}
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })
}(jQuery);


/*-- 层显示 --*/
+function ($) {
  'use strict';
   $.blockShow = function blockShow(objIn, objOut, callBack) {
    if (!objOut) {
      objIn.show();
      objIn[0].offsetWidth;
      objIn.addClass("in").one('bsTransitionEnd',function  () {
        $(this).removeClass("in");
      }).emulateTransitionEnd(220);
    }else {
      objOut.addClass("out").one('bsTransitionEnd', function  () {
      $(this).hide().removeClass("out");
      objIn.addClass('v-h').show();
      objOut[0].offsetWidth;
      //fix andord
      setTimeout(
        function(){
          objIn.removeClass("v-h");
        }, 10);
      objIn.addClass("in").one('bsTransitionEnd',function  () {
        $(this).removeClass("in");
      }).emulateTransitionEnd(220);
      if (callBack) {
        callBack();
      }
      }).emulateTransitionEnd(220);
    }
  }

  $.blockHide = function blockHide(objOut, callBack) {
    objOut.addClass('out').one('bsTransitionEnd', function  () {
    $(this).hide().removeClass("out");

    if (callBack) {
      callBack();
    }
    }).emulateTransitionEnd(350);
  }
}(jQuery);

/*-- 层显示 --*/
+function ($) {
  'use strict';
   $.blockShow = function blockShow(objIn, objOut, callBack) {
    if (!objOut) {
      objIn.show();
      objIn[0].offsetWidth;
      objIn.addClass("in").one('bsTransitionEnd',function  () {
        $(this).removeClass("in");
      }).emulateTransitionEnd(220);
    }else {
      objOut.addClass("out").one('bsTransitionEnd', function  () {
      $(this).hide().removeClass("out");
      objIn.addClass('v-h').show();
      objOut[0].offsetWidth;
      //fix andord
      setTimeout(
        function(){
          objIn.removeClass("v-h");
        }, 10);
      objIn.addClass("in").one('bsTransitionEnd',function  () {
        $(this).removeClass("in");
      }).emulateTransitionEnd(220);
      if (callBack) {
        callBack();
      }
      }).emulateTransitionEnd(220);
    }
  }

  $.blockHide = function blockHide(objOut, callBack) {
    objOut.addClass('out').one('bsTransitionEnd', function  () {
    $(this).hide().removeClass("out");

    if (callBack) {
      callBack();
    }
    }).emulateTransitionEnd(350);
  }

  $(document).ready(function() {
    $("#lg-fpsd").on('click',function  () {
      $.blockShow($("#fpsd-box"),$("#login-box"));
    })

    $("#bk-lg").on('click',function  () {
      $.blockShow($("#login-box"),$("#fpsd-box"));      
    })

    $("#reg-box-per-link").on('click',function  (e) {
      e.preventDefault();
      if ($(this).hasClass("current")) {
        return false;
      }
      $(this).addClass("current").siblings().removeClass("current");
      $.blockShow($(".rb-person"),$(".rb-comp"));   
    })

    $("#reg-box-comp-link").on('click',function  (e) {
      e.preventDefault();
      if ($(this).hasClass("current")) {
        return false;
      }
      $(this).addClass("current").siblings().removeClass("current");
      $.blockShow($(".rb-comp"),$(".rb-person"));   
    })
  })

}(jQuery);


/** 
* extend 弹出框
* @author cuki13
  $(obj).popbk();
  $("#popbk2").data('ck.pokbk').open();
  $("#popbk2").data('ck.pokbk').close();
*/

+(function($){
  var dataString = '[data-box="popbk"]';
  
  var Popbk = function  (el, number ,options) {
    this.el = $(el)
    this.id = number
    this.options = $.extend({}, this.defualts, options); 
  }
  
  Popbk.defualts = {};

  Popbk.prototype.build = function  (el) {
    
    var $this = $(el);
    $this.wrap('<div class="popbk-wrap-'+ this.id +' popbk-wrap fade" ></div>');
    $this.wrap('<div class="popbk-'+ this.id +' popbk" ></div>');

    var sClose = "<a class='close'><span class='none'>close</span></a>";
    sClose = $(sClose);
    sClose.insertAfter($this);
    var ml = $this.width()/2;     
    $this.parent(".popbk").css("margin-left",-ml);
    
    var wh = $this.height();
    if ($(window).height < wh) {
      $this.parent(".popbk").css("top","30px");
    }else {
      $this.parent(".popbk").css({
        "margin-top":-wh/2,
        "top":'50%'
      });
    }
    $this.parent(".popbk").find(".close").on('click',function  () {
      $this.data('ck.pokbk').close();
    })    
    $this.parents(".popbk-wrap").hide();
  }

  Popbk.prototype.open = function  () {
    this.close;
    var $this = this.el;
    if ($this.length) {
      $this.parents(".popbk-wrap").show();
      $this.parents(".popbk-wrap")[0].offsetWidth;
      
      if ($.support.transition) {
        $this.parents(".popbk-wrap").addClass("in").one('bsTransitionEnd', function  () {
          $this.parents(".popbk-wrap").removeClass("in");
        }).emulateTransitionEnd(150);
      }else {
        $this.parents(".popbk-wrap").removeClass("in");
      }
    }
  }

  Popbk.prototype.close = function  () {
    var $this = this.el;
    var $parent = $this.parents(".popbk-wrap");
    if ($.support.transition) {
      $parent.addClass("out");
      $parent.one('bsTransitionEnd', function  () {
          $parent.hide().removeClass("out");
        }).emulateTransitionEnd(150);
    }else {
      $parent.hide();
    }
  }

  function Plugin(option) {
    return this.each(function (n) {
      var $this   = $(this)
      var data    = $this.data('ck.pokbk')
      var number = $this.attr('id') || n 
      var options = typeof option == 'object' && option
      if (!data) $this.data('ck.pokbk', (data = new Popbk(this,number)))
      if (option == 'build') data.build($(this))
      else if (option) data.setState(option)
    })
  }

  $(document).on('ready.popbk', function  () {
    var $this = $(dataString);
    Plugin.call($this,'build');

    $("#meeting-details-jion").on('click',function  () {
      $(".notebox").data('ck.pokbk').open();
      return false;
    })

    $("#notebox-link-close").on('click',function  () {
      $(".notebox").data('ck.pokbk').close();
      return false;
    })
  })
})(jQuery);

/** 
* extend 验证
* 
* @package jquery
* @author cuki13
  */
+(function($){
  'use strict';
  $(document).ready(function() {
    if ($(".ckform").length > 0) {
      $(".ckform").Validform({
        tiptype:5
      });
    }  
  })
})(jQuery);


