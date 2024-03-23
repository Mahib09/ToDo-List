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
    });
  });
}

//Delete Button x
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("deletebtn")) {
    const container = event.target.closest(".contentContainer");
    container.remove();
  }
});

//taskComplete button ->
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("arrowbtn")) {
    function moveitem() {
      const btn = event.target;
      const content = btn.closest(".contentContainer");
      moveContainer = function () {
        const parentComponent = btn.closest(".taskComponent");
        if (parentComponent.classList.contains("todo")) {
          return document.querySelector(".progress");
        } else if (parentComponent.classList.contains("progress")) {
          return document.querySelector(".done");
        }
      };
      const movelocation = moveContainer();
      const contentLocation = movelocation.querySelector(".content");
      const nearButton = movelocation.querySelector(".content .new-taskbutton");
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
      content.insertBefore(contentContainer, nearBtn); // Corrected variable name
    }
    addTextField();
  }
});
