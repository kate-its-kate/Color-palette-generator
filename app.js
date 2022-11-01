const cols = document.querySelectorAll(".col");

// new colors set

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

// color lock/unlock

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;

  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];

    node.classList.toggle("fa-unlock");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickBoard(e.target.textContent);
  }
});

// copy color

const copyToClickBoard = (text) => {
  return navigator.clipboard.writeText(text);
};

// set random colors

const setRandomColors = (isInitial) => {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const colTitle = col.querySelector(".col__text");
    const colBtn = col.querySelector(".col__btn");
    const isLocked = col.querySelector("i").classList.contains("fa-lock");

    if (isLocked) {
      colors.push(colTitle.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    col.style.background = color;
    colTitle.innerHTML = color;

    if (!isInitial) colors.push(color);

    setTitleColor(colTitle, color);
    setTitleColor(colBtn, color);
  });

  updateColorsHash(colors);
};

// set color name

const setTitleColor = (text, color) => {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "#000" : "#fff";
};

const updateColorsHash = (colors = []) => {
  document.location.hash = colors
    .map((item) => item.toString().substring(1))
    .join("-");
};

// save color to hash

const getColorsFromHash = () => {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
};

setRandomColors(true);

// Color generator (manually)

// const generateRandomColor = () => {
//     const hexCodes = '0123456789ABCDEF';
//     let color = '';

//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
//     }
//     return '#' + color;
// }
