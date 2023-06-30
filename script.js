document.addEventListener("DOMContentLoaded", function() {
    var cursor = document.querySelector(".cursor");
  
    document.addEventListener("mousemove", function(e) {
      var x = e.clientX;
      var y = e.clientY;
  
      cursor.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
    });
  
    document.addEventListener("mouseenter", function() {
      cursor.style.opacity = "1";
      cursor.classList.add("cursor-glow");
    });
  
    document.addEventListener("mouseleave", function() {
      cursor.style.opacity = "0";
      cursor.classList.remove("cursor-glow");
    });
  });
  