// function addTextField() {
//   const content = document.querySelectorAll(".content");
//   content.forEach((e) => {
//     const button = e.querySelector("button");
//     button.addEventListener("click", createTextArea);
//     function createTextArea() {
//       const newText = document.createElement("textarea");
//       e.appendChild(newText);
//     }
//   });
// }
function addTextField() {
  const buttons = document.querySelectorAll(".new-taskbutton");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.closest(".content");
      const newText = document.createElement("textarea");
      content.insertBefore(newText, button);
    });
  });
}
