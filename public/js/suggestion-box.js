// eslint-disable-next-line no-unused-vars
function bindFocusOutSearchBox() {
  $('.search-box').unbind('focusout').bind('focusout', function() {
    $(this).siblings('.suggestion-box').hide();
  });
}
