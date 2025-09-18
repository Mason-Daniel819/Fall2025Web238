//Daniel Mason 09/14/2025//


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

$('.panel').on('click',function()
{$(this).toggleClass('open');
});

$('.panel').on('transitionend', function (e) {
  if (e.originalEvent.propertyName.includes('flex')) {
      $(this).toggleClass('open-active');
  }
});



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