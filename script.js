window.onload = function () {
  addTextField();
};
function addTextField() {
  const buttons = document.querySelectorAll(".new-taskbutton");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.closest(".content");
      const contentContainer = document.createElement("div");
      contentContainer.setAttribute("class", "contentContainer");
      const newContent = `<textarea name="" id="" cols="30" rows="10"></textarea> <button class="containerbtn arrowbtn">-></button>
            <button class="containerbtn deletebtn">X</button>`;
      contentContainer.innerHTML = newContent;
      content.insertBefore(contentContainer, button);
    });
  });
}
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("deletebtn")) {
    const container = event.target.closest(".contentContainer");
    container.remove();
  }
});
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("arrowbtn")) {
    function moveitem() {
      console.log("button clicked");
      const btn = event.target;
      const content = btn.closest(".contentContainer");
      console.log("content", content);
      moveContainer = function () {
        const parentComponent = btn.closest(".taskComponent");
        if (parentComponent.classList.contains("todo")) {
          return document.querySelector(".progress");
        } else if (parentComponent.classList.contains("progress")) {
          return document.querySelector(".done");
        }
      };
      const movelocation = moveContainer();
      console.log("movelocation", movelocation);
      const contentLocation = movelocation.querySelector(".content");
      console.log("contentlocation", contentLocation);
      const nearButton = movelocation.querySelector(".content .new-taskbutton");
      console.log("newbtn", nearButton);
      contentLocation.insertBefore(content, nearButton);
    }
    moveitem();
  }
});
