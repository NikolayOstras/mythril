import '../common/header'
import '../vendor/lodash.min'
import { gsap } from "gsap";

const $ITEMS = document.querySelectorAll('.item')
const $GRID = document.querySelector('.grid')

const DESKTOP = window.matchMedia('(max-width: 1140px)');
const TABLET = window.matchMedia('(max-width: 992px)');
const PHONE = window.matchMedia('(max-width: 640px)');

const CELL_WIDTH = '160px'

let MATRIX = []

let col = PHONE.matches == true ? 2 : TABLET.matches == true ? 4 : DESKTOP.matches == true ? 5 : 7;
let row = 4;
if (window.innerHeight < 1024 && window.innerWidth > 768) {
  row = 2;
}
const generateMatrix = () => {
  for (let i = 0; i < row; i++) {
    const uniqRandomNumbers = _.sampleSize(_.range(1, col + 1), col);
    MATRIX.push(_.sampleSize(_.range(1, col + 1), col))
  }
}

let index = 0;
let currentRow = 1;


const checkIndexAndAddRow = () => {
  const elementsInRow = Math.ceil($ITEMS.length / row);
  index++;
  if (index == elementsInRow && currentRow < row) {
    index = 0;
    currentRow++;
  }

}

const fillRandomGrid = () => {
  for (let i = 0; i < $ITEMS.length; i++) {
    checkIndexAndAddRow();
    generateMatrix();
    $ITEMS[i].style.gridArea = `${currentRow} / ${MATRIX[currentRow][index]} / ${currentRow} / ${MATRIX[currentRow][index]}`;
  }
  index = 0;
  currentRow = 1;
  MATRIX = [];
}


const gridInit = () => {
  $GRID.style.gridTemplateColumns = `repeat(${col}, ${CELL_WIDTH})`;
  $GRID.style.gridTemplateRows = `repeat(${row}, 1fr)`;
}

if ($GRID) {
  gridInit();
  fillRandomGrid();
}

// animations
const MENU_ITEMS = document.querySelectorAll('.nav__item ')
const MENU_ITEMS_REVERSED = [...MENU_ITEMS].reverse()
const TL = gsap.timeline()
TL.fromTo('.square--xl', { duration: 0.5, scale: 0 }, { scale: 1 })
  .fromTo('.square--sm', { duration: 0.5, scale: 0 }, { scale: 1 })
  .from('.item', { duration: 0.5, scale: 1.2, y: -100, opacity: 0, stagger: 0.25 })
  .from('.side-nav__item', { duration: 1, y: -200, opacity: 0, stagger: 0.1 })
  .from('.side-nav__button', { duration: 1, y: -200, opacity: 0 })
  .from(MENU_ITEMS_REVERSED, { duration: 1.5, x: -200, opacity: 0, stagger: 0.1 }, '-=3')