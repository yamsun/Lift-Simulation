const floorInput = document.getElementById("floor_input");
const liftInput = document.getElementById("lift_input");
const startBtn = document.getElementById("start_button");
const building = document.getElementById("building");
const lifts = document.getElementById("lifts");
const floorsList = [];

startBtn.addEventListener("click", () => {
  const floor = parseInt(floorInput.value);
  const lift = parseInt(liftInput.value);
  building.innerHTML = makeFloors(floor);
  lifts.innerHTML = makeLifts(lift);
});

const makeFloors = (n) => {
  let floors = "<hr/>";
  console.log(n);
  for (let i = n; i > 0; i--) {
    floors += `
    <div class="floor" data-floor-num="${i}">
     <span class="floor-num">F ${i}</span>
     <div class="ctrl-btns">
        <button class="lift-btn up-btn" data-floor-num="${i}" data-direction="UP" >Up</button>
        <button class="lift-btn down-btn" data-floor-num="${i}" data-direction="DOWN" >Down</button>
     </div>
     <hr />
    </div>
    `;
  }
  return floors;
};

const makeLifts = (n) => {
  let lifts = "";
  for (let i = 1; i < n + 1; i++) {
    lifts += `
    <div class="lift" data-curr-floor=0>
      <div class="left-door">
      </div>
      <div class="right-door">
      </div>
    </div>
    `;
  }
  return lifts;
};

let currentFloor = 0;
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("lift-btn")) {
    if (e.target.dataset.floorNum == currentFloor) {
      return;
    }
    // checkForLift(e.target.dataset.floorNum, e.target.dataset.direction);
    const floorNum = e.target.dataset.floorNum;
    const direction = e.target.dataset.direction;
    console.log(floorNum, direction);
    console.log(typeof document.querySelectorAll(".lift"));

    [...document.querySelectorAll(".lift")].every((lift) => {
      if (lift.classList.contains("moving")) {
        return true; // continue
      }
      if (direction == "UP") {
        if (lift.dataset.direction != "DOWN") {
          if (lift.dataset.currFloor < floorNum) {
            moveLift(lift, floorNum, direction);
            return false; // break
          }
        }
      }
      if (direction == "DOWN") {
        if (lift.dataset.direction != "UP") {
          if (
            lift.dataset.currFloor > floorNum ||
            lift.dataset.currFloor == 0
          ) {
            moveLift(lift, floorNum, direction);
            return false; // break
          }
        }
      }
      return true; // continue
    });
  }
});
// console.log(e.target.dataset.floorNum);
// console.log(e.target.dataset.direction);
// document.querySelectorAll(".lift").forEach((lift) => {
//   console.log(lift.dataset.currFloor);
// });
// });

var moveLift = (lift, floorNum, direction) => {
  console.log("moveLift");
  console.log(lift, floorNum, direction);
  let currFloor = parseInt(lift.dataset.currFloor);
  let floorDiff = floorNum - currFloor;
  let moveTime = Math.abs(floorDiff);
  lift.classList.add("moving");
  lift.dataset.currFloor = floorNum;
  lift.dataset.direction = direction;
  lift.style.transition = `transform ${moveTime / 2}s linear`;
  lift.style.transform = `translateY(-${floorNum * 100 + 19}px)`;
  // lift.style.marginTop = `17.5vh`;
  lift.dataset.currFloor = floorNum;
  if (floorNum == parseInt(floorInput.value)) {
    lift.dataset.direction = "";
  }
  if (floorNum == 1) {
    lift.dataset.direction = "";
  }
  // lift.addEventListener("transitionend", () => {
  //   lift.classList.remove("moving");
  //   console.log("transitionend");
  // });
  setTimeout(() => {
    lift.children[0].classList.add("left-open");
    lift.children[1].classList.add("right-open");
  }, moveTime * 1000);
  setTimeout(() => {
    lift.children[0].classList.remove("left-open");
    lift.children[1].classList.toggle("right-open");
  }, moveTime * 1000 + 1000);
  setTimeout(() => {
    lift.classList.remove("moving");
    if (direction == "UP" && floorNum !== parseInt(floorInput.value)) {
      moveLift(lift, parseInt(floorInput.value), "UP");
    }
    if (direction == "DOWN" && floorNum !== 1) {
      moveLift(lift, 1, "DOWN");
    }
  }, moveTime * 2000 + 1000);
};

// let interval = setInterval(() => {
//   if (direction == "UP") {
//     currFloor++;
//   } else {
//     currFloor--;
//   }
//   lift.dataset.currFloor = currFloor;
//   if (currFloor == floorNum) {
//     clearInterval(interval);
//     lift.classList.remove("moving");
//   }
// });
