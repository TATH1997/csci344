let index=0;

function left() {
  document.querySelector(".carousel-item"+index)
    .setAttribute("aria-hidden", "true");
  index--; 
  valid();
  document.querySelector('.carousel-inner').style
   .left=-55*index+"vw";
   document.querySelector(".carousel-item"+index)
    .setAttribute("aria-hidden", "false");
};

function right() {
  document.querySelector(".carousel-item"+index)
    .setAttribute("aria-hidden", "true");
  index++;
  valid();
  document.querySelector('.carousel-inner').style
    .left=-55*index+"vw";
 document.querySelector(".carousel-item"+index)
    .setAttribute("aria-hidden", "false");
}

function loadSlides(photoList) {
    var carouselInner = document.querySelector('.carousel-inner');
    for (var i = 0; i < photoList.length; i++) {
      let photo = photoList[i];
      let slide = document.createElement('section');
      slide.classList.add('carousel-item'+i);
      let img = document.createElement('img');
      img.src = photo.image_url;
      img.alt = photo.caption;
      let p = document.createElement('p');
      img.onclick = right;
      p.innerText = photo.caption;
      if(i!=index) {
        slide.ariaHidden="true";
      }
      else{
        slide.ariaHidden="false";
      }
      slide.appendChild(img);
      slide.appendChild(p);
      slide.ariaLabel="slide "+ (i+1)+" of "+photoList.length;
      carouselInner.appendChild(slide);
    }
  }

loadSlides(data);

const valid =() => {
  if(index<0) {
    index=data.length-1;
  }
  if(index==data.length) {
    index=0;
  }
}