const loveBtn = document.getElementById('love');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('song_title');
const cover = document.getElementById('cover_img');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const holder = document.getElementById('card');
const songId = document.getElementsByClassName('items');
const fav_songs= document.querySelector("#fav_sec")
const sideBar = document.querySelector("#libraryId")
const songs = ['starlight', 'friends', 'beach'];
let songIndex = 0

//song update logic for each time
let updateSong = (song) => {
  title.innerText = song;
  audio.src = `/assets/${song}.mp3`;
  cover.src = `/assets/${song}.jpg`;
  if (loveBtn.querySelector('i.bx').classList.contains('bxs-heart')){
    loveBtn.querySelector('i.bx').classList.remove('bxs-heart');
    loveBtn.querySelector('i.bx').classList.add('bx-heart');
    title.classList.remove("fav_song")
  }
}
updateSong(songs[songIndex]);
//play logic
let playSong = () => {
  holder.classList.add('play');
  playBtn.querySelector('i.bx').classList.remove('bx-play');
  playBtn.querySelector('i.bx').classList.add('bx-pause');
  audio.play();
}
//pause logic
let pauseSong = () => {
  holder.classList.remove('play');
  playBtn.querySelector('i.bx').classList.remove('bx-pause');
  playBtn.querySelector('i.bx').classList.add('bx-play');
  audio.pause();
}
//previous song logic
let previousSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  updateSong(songs[songIndex]);
  playSong();
}
//next song logic
let nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  updateSong(songs[songIndex]);
  playSong();
}

//favourite song logic
let likeSong = () => {
  let alreadyPresent=true;
  if (loveBtn.querySelector('i.bx').classList.contains('bx-heart')) {
    loveBtn.querySelector('i.bx').classList.remove('bx-heart');
    loveBtn.querySelector('i.bx').classList.add('bxs-heart');
    title.classList.add('fav_song');
    
    const targetSpan2= document.querySelectorAll(".favs");
    if(targetSpan2.length==0){
      const fav_item = document.createElement("span");
    
    fav_item.classList.add("favs");
    fav_item.innerText=title.innerText;
    fav_songs.appendChild(fav_item);
    }else{
      
      for(let tar2 of targetSpan2){
        if(!(tar2.innerHTML==title.innerText)){
          alreadyPresent=false;
        }else{
          alreadyPresent=true;
        }
      }
    }
    if(alreadyPresent==false){
      const fav_item = document.createElement("span");
    fav_item.classList.add("favs");
    fav_item.innerText=title.innerText;
    fav_songs.appendChild(fav_item);
    }
    
  } else {
    loveBtn.querySelector('i.bx').classList.remove('bxs-heart');
    loveBtn.querySelector('i.bx').classList.add('bx-heart');
    
    title.classList.remove('fav_song');
    const targetSpan= document.querySelectorAll(".favs");
    
    for(let tar of targetSpan){
      
      if(tar.innerHTML==title.innerText){
        
        tar.remove()
        
      }
    }
  }
}

//library song changing logic
let libFunc = (songName) => {
  for (let item of songs){
    if(item==songName){
      updateSong(item);
      playSong();
    }
  }
}

//search logic
let searchSong=()=>{
  let flag=false;
  for(let newItem of songs){
    if(newItem===searchInput.value){
      updateSong(newItem);
      flag=true;
      break;
    }else{
      flag=false;
    }
  }
  if(flag===false){
    alert('not found');
  }
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song logic
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  var sec;
  var sec_d;

  // get minutes currentTime
  let min = (currentTime == null) ? 0 :
    Math.floor(currentTime / 60);
  min = min < 10 ? '0' + min : min;

  // get seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {

      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
          sec = Math.floor(x) - (60 * i);
          sec = sec < 10 ? '0' + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? '0' + sec : sec;
    }
  }
  get_sec(currentTime, sec);
  
  // get minutes duration
  let min_d = (isNaN(duration) === true) ? '0' :
    Math.floor(duration / 60);
  min_d = min_d < 10 ? '0' + min_d : min_d;


  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {

      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
          sec_d = Math.floor(x) - (60 * i);
          sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
      }
    } else {
      sec_d = (isNaN(duration) === true) ? '0' :
        Math.floor(x);
      sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
    }
  }

  // get seconds duration
  get_sec_d(duration);
};

//event listeners
playBtn.addEventListener('click', () => {
  let songPlaying = holder.classList.contains('play');
  if (songPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
prevBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
loveBtn.addEventListener('click', likeSong);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('timeupdate', DurTime);
progressContainer.addEventListener('click', setProgress);
searchButton.addEventListener('click', searchSong);
sideBar.addEventListener('click', e => {
  libFunc(e.target.innerText.toLowerCase())
})
fav_songs.addEventListener('click',e => {
  libFunc(e.target.innerText.toLowerCase())
})