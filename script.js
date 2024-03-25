//newtask Button +New
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("new-taskbutton")) {
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
      contentContainer.setAttribute("draggable", "true");
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
      contentContainer.setAttribute("draggable", "true");
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

//Draggable container
document.addEventListener("DOMContentLoaded", function () {
  drag(); // Call the drag function after the DOM is loaded
});
function drag() {
  const draggables = document.querySelectorAll(".contentContainer");
  const dragContainers = document.querySelectorAll(".content");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });
  dragContainers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggable = document.querySelector(".dragging");
      container.appendChild(draggable);
    });
  });
}
