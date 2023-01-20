import '../common/header'
import '../vendor/lodash.min'

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