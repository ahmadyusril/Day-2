function getTechnologies() {
  const nodeJS = document.getElementsByClassName("nodeJs");
  const reactJS = document.getElementsByClassName("reactjs");
  const nextJS = document.getElementsByClassName("nextjs");
  const typescript = document.getElementsByClassName("typescript");

  for (let i = 0; i < nodeJS.length; i++) {
      nodeJS[i].innerHTML = `<i class="fa-brands fa-node"></i>`;
    }
    for (let i = 0; i < reactJS.length; i++) {
      reactJS[i].innerHTML = `<i class="fa-brands fa-react"></i>`;
    }
    for (let i = 0; i < nextJS.length; i++) {
      nextJS[i].innerHTML = `<i class="fa-brands fa-square-js"></i>`;
    }
    for (let i = 0; i < typescript.length; i++) {
      typescript[i].innerHTML = `<i class="bx bxl-typescript"></i>`;
    }

  return;
}

getTechnologies();