// Generated by CoffeeScript 1.10.0
(function() {
  this.ba = function() {
    var bt_close, bt_confirm, center, close_btn_bind, close_modal, disableScroll, enableScroll, gen_message, gen_modal, gen_title, generate_random_id, h, keys, modal, open_modal, preventDefault, preventDefaultForScrollKeys, process_hash, resize_btns, shadow, show_shadow;
    keys = {
      37: 1,
      38: 1,
      39: 1,
      40: 1
    };
    preventDefault = function(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.returnValue = false;
    };
    preventDefaultForScrollKeys = function(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    };
    disableScroll = function() {
      if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', preventDefault, false);
      }
      window.onwheel = preventDefault;
      window.onmousewheel = document.onmousewheel = preventDefault;
      window.ontouchmove = preventDefault;
      document.onkeydown = preventDefaultForScrollKeys;
    };
    enableScroll = function() {
      if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
      }
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    };
    generate_random_id = function() {
      var rr;
      rr = (Math.random() + '').substring(2);
      while ($('#shadow_' + rr).size() > 0) {
        rr = (Math.random() + '').substring(2);
      }
      return rr;
    };
    process_hash = function(params) {
      var hash, r;
      if (params[0].constructor === Object) {
        hash = params[0];
      } else {
        hash = {};
        switch (params.length) {
          case 1:
            hash['message'] = params[0];
            break;
          case 2:
            hash['title'] = params[0];
            hash['message'] = params[1];
        }
      }
      r = {};
      r['title'] = hash['title'] !== void 0 ? hash['title'] : false;
      r['message'] = hash['message'] !== void 0 ? hash['message'] : false;
      r['showConfirmBtn'] = hash['showConfirmBtn'] !== void 0 ? true : (hash['onConfirm'] !== void 0) || (hash['confirmClass'] !== void 0 || hash['confirmText'] !== void 0) ? true : false;
      r['showCloseBtn'] = hash['showCloseBtn'] !== void 0 ? true : false;
      r['confirmText'] = hash['confirmText'] !== void 0 ? hash['confirmText'] : 'Confirm';
      r['confirmClass'] = hash['confirmClass'] !== void 0 ? hash['confirmClass'] : 'btn btn-success';
      r['closeText'] = hash['closeText'] !== void 0 ? hash['closeText'] : 'Close';
      r['closeClass'] = hash['closeClass'] !== void 0 ? hash['closeClass'] : '';
      r['onConfirm'] = hash['onConfirm'] !== void 0 ? hash['onConfirm'] : false;
      r['onClose'] = hash['onClose'] !== void 0 ? hash['onClose'] : false;
      r['message'] = hash['message'] !== void 0 ? hash['message'] : '';
      r['openTime'] = hash['time'] !== void 0 ? hash['time'] : hash['openTime'] !== void 0 ? hash['openTime'] : 250;
      r['closeTime'] = hash['time'] !== void 0 ? hash['time'] : hash['closeTime'] !== void 0 ? hash['closeTime'] : 250;
      r['effectShow'] = hash['effectShow'] !== void 0 ? hash['effectShow'] : hash['effect'] ? hash['effect'] : 'easeInOutBack';
      r['effectHide'] = hash['effectHide'] !== void 0 ? hash['effectHide'] : hash['effect'] ? hash['effect'] : 'easeInBack';
      r['closeOnClickShadow'] = hash['closeOnClickShadow'] !== void 0 ? hash['closeOnClickShadow'] : false;
      r['autoClose'] = hash['autoClose'] !== void 0 ? hash['autoClose'] : false;
      r['id'] = hash['id'] ? hash['id'] : generate_random_id();
      r['modal'] = '#modal_' + r['id'];
      r['shadow'] = '#shadow_' + r['id'];
      r['bt_close'] = '#bt_close_' + r['id'];
      r['div_bt_close'] = '#div_bt_close_' + r['id'];
      r['bt_confirm'] = '#bt_confirm_' + r['id'];
      r['div_bt_confirm'] = '#div_bt_confirm_' + r['id'];
      return r;
    };
    h = process_hash(arguments);
    center = function() {
      $(h['modal']).css('marginLeft', $(h['modal']).width() / 2 * -1 + 'px');
      $(h['modal']).css('marginTop', $(h['modal']).height() / 2 * -1 + 'px');
      $(h['modal']).css('top', '50%');
      return $(h['modal']).css('left', '50%');
    };
    show_shadow = function() {
      $(h['shadow']).animate({
        opacity: '0.4'
      }, h['openTime'], function() {
        return disableScroll();
      });
      if (h['autoClose']) {
        return setTimeout((function() {
          if (h['autoClose']) {
            return close_modal();
          }
        }), h['autoClose'] * 1000);
      }
    };
    open_modal = function() {
      $(h['modal']).transition({
        scale: 0
      }, 0);
      return $(h['modal']).transition({
        scale: 1
      }, h['openTime'], h['effectShow']);
    };
    close_btn_bind = function() {
      $(h['bt_close']).click(function() {
        return close_modal();
      });
      if (h['closeOnClickShadow']) {
        return $(h['shadow']).click(function() {
          return close_modal();
        });
      }
    };
    resize_btns = function() {
      var close, confirm, err, error;
      try {
        close = $(h['bt_close']).outerWidth();
        confirm = $(h['bt_confirm']).outerWidth();
        if (close > confirm) {
          return $(h['bt_confirm']).css('width', close);
        } else {
          return $(h['bt_close']).css('width', confirm);
        }
      } catch (error) {
        err = error;
      }
    };
    gen_modal = function() {
      return "<div id=\"" + (h['modal'].substring(1)) + "\" class=\"ba_modal\" ><div class=\"ba_modal_content\" >";
    };
    gen_message = function() {
      if (h['message']) {
        return "<div class=\"ba_modal_message\" >" + h['message'] + "</div>";
      } else {
        return '';
      }
    };
    gen_title = function() {
      if (h['title']) {
        return "<div class=\"ba_modal_title\">" + h['title'] + "</div>";
      } else {
        return '';
      }
    };
    shadow = function() {
      return "<div id=\"" + (h['shadow'].substring(1)) + "\" class=\"ba_shadow\"></div>";
    };
    close_modal = function(confirm) {
      if (confirm == null) {
        confirm = false;
      }
      h['autoClose'] = false;
      if (h['onClose'] && !confirm) {
        h['onClose']();
      }
      $(h['modal']).transition({
        scale: 0,
        opacity: 0
      }, h['closeTime'], h['effectHide'], function() {
        return $(this).remove();
      });
      return $(h['shadow']).transition({
        opacity: 0
      }, h['closeTime'], function() {
        $(this).remove();
        if (!(h['onClose'] + '').include('ba') || !(h['onConfirm'] + '').include('ba')) {
          return enableScroll();
        }
      });
    };
    bt_confirm = function() {
      if (h['showConfirmBtn']) {
        return "<div id=\"" + (h['div_bt_confirm'].substring(1)) + "\" class=\"ba_modal_bt\">\n	<input type=\"button\" id=\"" + (h['bt_confirm'].substring(1)) + "\" class=\"" + h['confirmClass'] + "\" value=\"" + h['confirmText'] + "\"></input>\n</div>";
      } else {
        return '';
      }
    };
    bt_close = function() {
      return "<div id=\"" + (h['div_bt_close'].substring(1)) + "\" class=\"ba_modal_bt\">\n	<input type=\"button\" id=\"" + (h['bt_close'].substring(1)) + "\" class=\"" + h['closeClass'] + "\" value=\"" + h['closeText'] + "\"></input>\n</div>";
    };
    modal = gen_modal();
    modal += gen_title();
    modal += gen_message();
    modal += '<div class="ba_list_bt" >';
    modal += bt_close();
    modal += bt_confirm();
    modal += '</div>';
    modal += '</div></div>';
    $('body').append(shadow());
    $('body').append(modal);
    disableScroll();
    resize_btns();
    show_shadow();
    open_modal();
    close_btn_bind();
    if (h['showConfirmBtn']) {
      $(h['bt_close']).addClass('btfr');
      $(h['bt_confirm']).addClass('btfl');
      $(h['bt_confirm']).click(function() {
        close_modal(true);
        if (h['onConfirm']) {
          return h['onConfirm']();
        }
      });
    } else {
      $(h['div_bt_close']).css('width', '100%');
    }
    center();
    return $(window).resize(function() {
      return center();
    });
  };

}).call(this);
