// -----------------------------
// TAB NAVIGATION
// -----------------------------

const tabButtons = document.querySelectorAll('.nav-btn');
const tabs = document.querySelectorAll('.tab');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {

    const target = button.getAttribute('data-tab');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(target).classList.add('active');
    button.classList.add('active');

  });
});


// -----------------------------
// GALLERY SYSTEM
// -----------------------------

const currentIndex = {};


// highlight active thumbnail
function highlightThumb(galleryNumber, index){

  const thumbs = document.querySelectorAll(`#thumbs-${galleryNumber} img`);

  thumbs.forEach(t => t.classList.remove("active-thumb"));

  if(thumbs[index]){
    thumbs[index].classList.add("active-thumb");
  }

}


// thumbnail click
function switchImage(galleryNumber, src){

  const mainImg = document.getElementById(`main-img-${galleryNumber}`);
  const thumbs = document.querySelectorAll(`#thumbs-${galleryNumber} img`);

  mainImg.src = src;

  thumbs.forEach((img,i)=>{
    if(img.getAttribute("src") === src){
      currentIndex[galleryNumber] = i;
      highlightThumb(galleryNumber,i);
    }
  });

}


// arrow navigation
function scrollThumbnails(galleryNumber, direction){

  const container = document.getElementById(`thumbs-${galleryNumber}`);
  const thumbs = container.querySelectorAll("img");

  if(!(galleryNumber in currentIndex)){
    currentIndex[galleryNumber] = 0;
  }

  let index = currentIndex[galleryNumber] + direction;

  // LOOP
  if(index >= thumbs.length){

    index = 0;
    container.scrollTo({left:0, behavior:"smooth"});

  }
  else if(index < 0){

    index = thumbs.length - 1;
    container.scrollTo({left:container.scrollWidth, behavior:"smooth"});

  }
  else{

    container.scrollBy({
      left: direction * 160,
      behavior: "smooth"
    });

  }

  currentIndex[galleryNumber] = index;

  const newSrc = thumbs[index].getAttribute("src");
  document.getElementById(`main-img-${galleryNumber}`).src = newSrc;

  highlightThumb(galleryNumber,index);

}


// set first thumbnail active on load
window.addEventListener("load",()=>{

  document.querySelectorAll(".thumbnails").forEach((thumbContainer,i)=>{

    const galleryNumber = i+1;
    const thumbs = thumbContainer.querySelectorAll("img");

    if(thumbs.length){
      currentIndex[galleryNumber] = 0;
      highlightThumb(galleryNumber,0);
    }

  });

});
// VIDEO POPUP SYSTEM (skip gif-video)

document.querySelectorAll("video:not(.gif-video)").forEach(video => {

  video.addEventListener("play", function(){

    // pause the original
    video.pause();

    // create overlay
    const overlay = document.createElement("div");
    overlay.classList.add("video-overlay");

    // clone video
    const popupVideo = video.cloneNode(true);
    popupVideo.controls = true;

    overlay.appendChild(popupVideo);
    document.body.appendChild(overlay);

    popupVideo.play();

    // close when clicking outside
    overlay.addEventListener("click", function(e){

      if(e.target === overlay){
        popupVideo.pause();
        overlay.remove();
      }

    });

  });

});