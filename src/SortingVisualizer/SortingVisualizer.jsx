import React from 'react';
import {
  getMergeSortAnimations,
  getBubbleSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;
const ANIMATION_SPEED_QUICK = 6;
const ANIMATION_SPEED_BUBBLE = 0.3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'blue';

const SUCCESS_COLOR = 'gold';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 684));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];

          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(
      this.state.array,
      0,
      this.state.array.length - 1,
    );
    console.log(animations);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (i % 2 === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_QUICK);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.height = `${animations[i][2]}px`;
          barOneStyle.height = `${animations[i][3]}px`;
        }, i * ANIMATION_SPEED_QUICK);
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (i % 2 === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.height = `${animations[i][2]}px`;
          barOneStyle.height = `${animations[i][3]}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    console.log(this.state.array);
    console.log(animations);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (i % 2 === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_BUBBLE);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.height = `${animations[i][2]}px`;
          barOneStyle.height = `${animations[i][3]}px`;
        }, i * ANIMATION_SPEED_BUBBLE);
      }
    }
  }

  render() {
    const {array} = this.state;

    return (
      <>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}></div>
          ))}

          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
      </>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
