//newtask Button +New
document.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("new-taskbutton") ||
    event.target.classList.contains("new")
  ) {
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
    drag();
    //delete btn
  } else if (event.target && event.target.classList.contains("deletebtn")) {
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
    //task complete button
  } else if (event.target.classList.contains("arrowbtn")) {
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
//deleteall
let content;
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa")) {
    const model = document.querySelector(".model");
    model.classList.remove("hide");
    model.classList.add("show");
    const contentContainer = e.target.closest(".taskComponent");
    const counterbtn = contentContainer.querySelector(".counter");
    const contentholder = contentContainer.querySelector(".content");
    content = contentholder.querySelectorAll(".contentContainer");
    const buttonholder = document.querySelector(".deleteallConfirmation");
    const confirmbtn = document.querySelector(".confirmationDelete");
    const cancelbtn = document.querySelector(".confirmationCancel");
    document.addEventListener("click", function (event) {
      if (
        !confirmbtn.contains(event.target) &&
        cancelbtn.contains(event.target) &&
        model.contains(event.target)
      ) {
        model.classList.remove("show");
        model.classList.add("hide");
        content = null;
      } else if (confirmbtn.contains(event.target)) {
        content.forEach((container) => {
          container.remove();
        });
        counterbtn.innerHTML = 0;
        model.classList.remove("show");
        model.classList.add("hide");
      }
    });
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
      const afterCounter = container
        .closest(".taskComponent")
        .querySelector(".counter");
      var numberOfDragablesAfterContainer =
        container.querySelectorAll(".contentContainer").length;
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector(".dragging");
      const nearbtn = container.querySelector(".new-taskbutton");
      if (afterElement == null) {
        nearbtn.classList.add("bordertop");
        container.insertBefore(draggable, nearbtn);
        nearbtn.classList.remove("bordertop");
      } else {
        afterElement.classList.add("bordertop");
        container.insertBefore(draggable, afterElement);
        afterElement.classList.remove("bordertop");
      }
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".contentContainer:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("sort")) {
    const sort = event.target;
    sort.classList.toggle("clicked");
    const menu = document.querySelector(".sortmenu");
    menu.classList.toggle("show");

    const sortByName = menu.querySelector(".sortname");
    const sortByDate = menu.querySelector(".sortdate");
    const contents = document.querySelectorAll(".contentContainer");
    const allContent = [];
    console.log(contents);
    contents.forEach((content) => {});
    menu.addEventListener("click", (e) => {
      if (e.target === sortByName) {
      } else if (e.target === sortByDate) {
      }
    });
  }
});
