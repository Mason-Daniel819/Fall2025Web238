//Daniel Mason 09/14/2025//

//Text Shadow Effect for Header//
const header = document.querySelector('.header');
const text = header.querySelector('h1');
const walk = 25; 

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = header;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  const xWalk = ((x / width * walk) - (walk / 2));
  const yWalk = ((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${xWalk * -1}px ${yWalk *-1}px 0 rgba(131, 121, 121, 0.7)
  `;

}

header.addEventListener('mousemove', shadow);

//Toggle panel class change on click//

$('.panel').on('click',function()
{$(this).toggleClass('open');
});

$('.panel').on('transitionend', function (e) {
  if (e.originalEvent.propertyName.includes('flex')) {
      $(this).toggleClass('open-active');
  }
});


//Sticky Navigation when scrolling//
const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

function fixNav(){

if(window.scrollY >= topOfNav){
  document.body.style.paddingTop = nav.offsetHeight + 'px';
  document.body.classList.add('fixed-nav');
}
else{
  document.body.style.paddingTop = 0;
  document.body.classList.remove('fixed-nav');
}

}
 
window.addEventListener('scroll', fixNav);

$(document).ready(function () {
  const $picturesSection = $('.pictures');

  const $figures = $picturesSection.find('figure').filter(function () {
    const captionText = $(this).find('figcaption').text();
    const datePart = captionText.split('-').pop(); // Get the MM/DD/YYYY part
    return !isNaN(Date.parse(datePart)); // Only include if valid date
  });

  const sortedFigures = $figures.sort(function (a, b) {
    const dateA = new Date($(a).find('figcaption').text().split('-').pop());
    const dateB = new Date($(b).find('figcaption').text().split('-').pop());
    return dateB - dateA; // Descending (newest to oldest)
  });

  $picturesSection.empty().append(sortedFigures);
});

$(document).ready(function () {
  const $pictures = $(".pictures img");
  let currentIndex = -1;

  // Create lightbox structure
  const $lightbox = $('<div id="lightbox"></div>').hide();
  const $img = $('<img>');
  const $prev = $('<button id="prev">&#10094;</button>');
  const $next = $('<button id="next">&#10095;</button>');

  $lightbox.append($img, $prev, $next);
  $("body").append($lightbox);

  // Open lightbox on click
  $pictures.on("click", function () {
    currentIndex = $pictures.index(this);
    showImage(currentIndex);
    $lightbox.fadeIn(300);
  });

  // Display image
  function showImage(index) {
    const src = $pictures.eq(index).attr("src");
    const alt = $pictures.eq(index).attr("alt");
    $img.attr({ src, alt }).hide().fadeIn(200);
  }

  // Next/prev controls
  $next.on("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % $pictures.length;
    showImage(currentIndex);
  });

  $prev.on("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + $pictures.length) % $pictures.length;
    showImage(currentIndex);
  });

  // Keyboard support
  $(document).on("keydown", function (e) {
    if (!$lightbox.is(":visible")) return;
    if (e.key === "ArrowRight") $next.click();
    if (e.key === "ArrowLeft") $prev.click();
    if (e.key === "Escape") $lightbox.fadeOut(300);
  });

  // Scroll wheel navigation
  $(document).on("wheel", function (e) {
    if (!$lightbox.is(":visible")) return;
    e.originalEvent.deltaY < 0 ? $prev.click() : $next.click();
  });

  // Click outside image closes it
  $lightbox.on("click", function (e) {
    if (e.target.id === "lightbox") $lightbox.fadeOut(300);
  });
});

