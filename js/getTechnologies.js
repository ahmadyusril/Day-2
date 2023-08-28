function getTechnologies() {
    const nodeJS = document.getElementsByClassName("node");
    const reactJS = document.getElementsByClassName("react");
    const nextJS = document.getElementsByClassName("next");
    const typescript = document.getElementsByClassName("typescript");

    for (let i = 0; i < nodeJS.length; i++) {
        nodeJS[i].innerHTML = `<img
        width="30",
        height="30",
        src="image/nodejs.png"
        alt="nextjs logo"
      />`;
      }
      for (let i = 0; i < reactJS.length; i++) {
        reactJS[i].innerHTML = `<img
        width="30",
        height="30",
        src="image/react-js.png"
        alt="nextjs logo"
      />`;
      }
      for (let i = 0; i < nextJS.length; i++) {
        nextJS[i].innerHTML = `<img
        width="30",
        height="30",
        src="image/nextjs.png"
        alt="nextjs logo"
      />`;
      }
      for (let i = 0; i < typescript.length; i++) {
        typescript[i].innerHTML = `<img
        width="30",
        height="30",
        src="image/typescript.png"
        alt="typescript logo"
        srcset=""
      />`;
      }

    return;
}

getTechnologies();