window.onload = function () {
  addTextField();
};

//newtask Button +New
function addTextField() {
  const buttons = document.querySelectorAll(".new-taskbutton");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.closest(".content");
      const contentContainer = document.createElement("div");
      contentContainer.setAttribute("class", "contentContainer");
      const newContent = `<textarea name="" id="" cols="30" rows="10" placeholder="Type a Name"></textarea> <button class="containerbtn arrowbtn">&#8594;</button>
            <button class="containerbtn deletebtn">&#10540;</button>`;
      contentContainer.innerHTML = newContent;
      content.insertBefore(contentContainer, button);

      //counter
      const parentComponent = button.closest(".taskComponent");
      const counterbtn = parentComponent.querySelector(".counter");
      const allContent = parentComponent.querySelectorAll(
        ".contentContainer textarea"
      );
      var counterValue = Number(allContent.length);
      counterbtn.innerHTML = counterValue;
    });
  });
}

//Delete Button x
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("deletebtn")) {
    const container = event.target.closest(".contentContainer");
    const NearestTaskcomponent = container.closest(".taskComponent");
    const counterbtn = NearestTaskcomponent.querySelector(".counter");
    const allContent = NearestTaskcomponent.querySelectorAll(
      ".contentContainer textarea"
    );
    var counterValue = Number(allContent.length);
    var newCount = counterValue - 1;
    counterbtn.innerHTML = newCount;
    container.remove();
  }
});

//taskComplete button ->
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("arrowbtn")) {
    function moveitem() {
      const btn = event.target;
      const content = btn.closest(".contentContainer");
      const currentlocation = btn.closest(".taskComponent");
      const currentcounter = currentlocation.querySelector(".counter");
      var currentvalue = Number(currentcounter.innerHTML);
      var newcurrentvalue = currentvalue - 1;
      currentcounter.innerHTML = newcurrentvalue;

      moveContainer = function () {
        const parentComponent = btn.closest(".taskComponent");
        if (parentComponent.classList.contains("todo")) {
          return document.querySelector(".progress");
        } else if (parentComponent.classList.contains("progress")) {
          return document.querySelector(".done");
        }
      };
      const movelocation = moveContainer();
      const movecounterbtn = movelocation.querySelector(".counter");
      const contentLocation = movelocation.querySelector(".content");
      const moveallContent = movelocation.querySelectorAll(
        ".contentContainer textarea"
      );
      var movecounterValue = Number(moveallContent.length);
      var movenewCount = movecounterValue + 1;
      const nearButton = movelocation.querySelector(".content .new-taskbutton");
      movecounterbtn.innerHTML = movenewCount;
      contentLocation.insertBefore(content, nearButton);
    }
    moveitem();
  }
});

//+button;
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("new")) {
    function addTextField() {
      const newB = event.target;
      const ansestor = newB.closest(".taskComponent");
      if (ansestor.classList.contains("todo")) {
        content = document.querySelector(".todo .content");
      } else if (ansestor.classList.contains("progress")) {
        content = document.querySelector(".progress .content");
      } else {
        content = document.querySelector(".done .content");
      }
      const nearBtn = content.querySelector(".new-taskbutton");
      const contentContainer = document.createElement("div");
      contentContainer.setAttribute("class", "contentContainer");
      const newContent = `<textarea name="" id="" cols="30" rows="10" placeholder="Type a Name"></textarea> <button class="containerbtn arrowbtn">-></button>
            <button class="containerbtn deletebtn">X</button>`;
      contentContainer.innerHTML = newContent;
      content.insertBefore(contentContainer, nearBtn);
      //counter
      const NearestTaskcomponent = contentContainer.closest(".taskComponent");
      const counterbtn = NearestTaskcomponent.querySelector(".counter");
      const allContent = NearestTaskcomponent.querySelectorAll(
        ".contentContainer textarea"
      );
      var counterValue = Number(allContent.length);
      counterbtn.innerHTML = counterValue;
    }
    addTextField();
  }
});
// window.addEventListener("load", (e) => {
//   counter();
// });
function counter() {
  const counterButton = document.querySelectorAll("counter");
  counterButton.forEach((e) => {
    const main = e.closest(".taskComponent");
    console.log(main);
    const allContent = main.querySelectorAll(".contentContainer");
    var count = allContent.length;
    e.innerHTML = count;
  });
}
