document.addEventListener('mousemove', function(e) {
    var cursor = document.querySelector('.cursor');
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });
  
  document.addEventListener('mouseenter', function() {
    var cursor = document.querySelector('.cursor');
    cursor.classList.add('active');
  });
  
  document.addEventListener('mouseleave', function() {
    var cursor = document.querySelector('.cursor');
    cursor.classList.remove('active');
  });
  