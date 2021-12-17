let section = document.querySelector(".skill-box");
let spans = document.querySelectorAll(".skill-box .skill-inner");
let statsOffset = document.querySelector(".stats-awesome");
let spanNum = document.querySelectorAll(".number");
let started = false;


window.onscroll = function(){
// ================================================= progress animation counter ==============
    if(window.scrollY >= section.offsetTop - 300){
        spans.forEach((div) =>{
            div.style.width = div.dataset.width;
        })
    }
// ========================================counter=========================================
    if(window.scrollY >= statsOffset.offsetTop - 300){
        if(!started){
            spanNum.forEach((number) => startCount(number));
        }
        started = true;
    }

}
// ========================================= counter function ========================
function startCount(el){
    let goal = el.dataset.goal;
    let count = setInterval(() => {
        el.textContent++
        if(el.textContent == goal){
            clearInterval(count);
        }
    }, 100 / goal);
}



// The End Of The Year Date
// 1000 milliseconds = 1 Second

let countDownDate = new Date("Dec 31, 2022 23:59:59").getTime();
// console.log(countDownDate);

let counter = setInterval(() => {
  // Get Date Now
  let dateNow = new Date().getTime();

  // Find The Date Difference Between Now And Countdown Date
  let dateDiff = countDownDate - dateNow;

  // Get Time Units
  // let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML = seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);
