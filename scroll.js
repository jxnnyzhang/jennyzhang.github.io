$(window).on("scroll", function() {
    var scrollTop = $(window).scrollTop();
    $(".tab").css("font-size", 16 + scrollTop / 50 + "px");
    $(".sidebar-content").css("font-size", 16 + scrollTop / 100 + "px");
  });
  