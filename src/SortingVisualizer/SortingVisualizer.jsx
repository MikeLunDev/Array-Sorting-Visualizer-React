import React from 'react';
import {
  getMergeSortAnimations,
  getBubbleSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
} from '../sortingAlgorithms/sortingAlgorithms.js';

import {FaPause} from 'react-icons/fa';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;
const ANIMATION_SPEED_QUICK = 2.5;
const ANIMATION_SPEED_BUBBLE = 0.1;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'blue';
const SUCCESS_COLOR = 'gold';

const getPixelWidth = x => {
  if (x <= 22) {
    return '50px';
  } else if (x <= 35) {
    return '40px';
  } else if (x <= 50) {
    return '30px';
  } else if (x <= 75) {
    return '20px';
  } else if (x <= 100) {
    return '15px';
  } else if (x <= 150) {
    return '15px';
  } else if (x <= 190) {
    return '8px';
  } else if (x <= 210) {
    return '7px';
  } else if (x <= 250) {
    return '6px';
  } else if (x <= 300) {
    return '5px';
  } else if (x <= 430) {
    return '3.5px';
  } else if (x <= 500) {
    return '3px';
  } else if (x <= 760) {
    return '2px';
  } else if (x <= 1000) {
    return '1.5px';
  } else if (x <= 1500) {
    return '1px';
  } else return '0.75px';
};

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isFinished: false,
      stats: {
        name: '',
        complexity: '',
        swaps: 0,
      },
      quickSort: false,

      size: 500,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  componentDidUpdate = (prevprops, prevstate) => {
    if (
      prevstate.quickSort !== this.state.quickSort &&
      this.state.quickSort === true
    ) {
      this.quickSort();
    }
    if (prevstate.size !== this.state.size) {
      this.resetArray();
    }
  };

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.size; i++) {
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
    setTimeout(() => {
      console.log('HEYY');
      for (let j = 0; j < arrayBars.length; j++) {
        const barOneStyle = arrayBars[j].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SUCCESS_COLOR;
        }, j);
      }
    }, animations.length * ANIMATION_SPEED_QUICK + 400);

    setTimeout(() => {
      this.setState({
        isFinished: !this.state.isFinished,
        stats: {
          name: 'Quick Sort',
          complexity: 'O(nLogn)',
          swaps: animations.length / 2,
        },
        quickSort: false,
      });
    }, animations.length * ANIMATION_SPEED_QUICK + 600);
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
    setTimeout(() => {
      console.log('HEYY');
      for (let j = 0; j < arrayBars.length; j++) {
        const barOneStyle = arrayBars[j].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SUCCESS_COLOR;
        }, j);
      }
    }, animations.length * ANIMATION_SPEED_BUBBLE + 400);

    setTimeout(() => {
      this.setState({
        isFinished: !this.state.isFinished,
        stats: {
          name: 'Bubble Sort',
          complexity: 'O(N^2)',
          swaps: animations.length / 2,
        },
        //quickSort: false,
      });
    }, animations.length * ANIMATION_SPEED_BUBBLE + 600);
  }

  handleChange = event => {
    //to allow only numbers
    const arraySize = event.target.value.replace(/\D/, '');
    this.setState({
      size: arraySize <= 2000 ? arraySize : 2000, //to limit the size at 2000
    });
  };

  render() {
    const {array} = this.state;
    const {complexity, name, swaps} = this.state.stats;
    return (
      <>
        {this.state.isFinished && (
          <div class="card top-right">
            <h5 class="card-header">{`${name} ${complexity}`}</h5>
            <div class="card-body">
              <div class="card-text">
                <ul className="list-unstyled">
                  <li>Array size: {array.length}</li>
                  <li>Swaps: {swaps}</li>
                </ul>
              </div>
              <button onClick={() => {}} class="btn btn-primary">
                New Array
              </button>
            </div>
          </div>
        )}

        <div className="container-fluid">
          <div
            className="row no-gutters border pt-4 mt-2 mx-1"
            style={{minHeight: '90vh'}}>
            <div className="col-12">
              {array.map((value, idx) => (
                <div
                  className="array-bar"
                  key={idx}
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                    width: getPixelWidth(this.state.size),
                  }}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="container-fluid border">
          <div className="row no-gutters">
            <div className="col-md-3 d-flex">
              <label style={{fontSize: '19px'}} htmlFor="arraySize">
                <strong>Array Size</strong>
              </label>
              <input
                //need to put disabled on runtime
                id="array size"
                name="size"
                value={this.state.size}
                onChange={this.handleChange}
                type="text"
                className="form-control align-self-center"
                aria-describedby="array size"
                placeholder="1000"
              />
              <small id="passwordHelpBlock" class="form-text text-muted pt-2">
                Max 2000
              </small>
            </div>
            <div className="col-md-7 offset-md-2 d-flex align-items-center">
              <button
                className="btn btn-lg btn-primary py-1 px-1 mx-3 ml-3"
                onClick={() => this.resetArray()}>
                Generate New Array
              </button>
              <button
                className="btn btn-lg btn-primary py-1 px-1 mx-3"
                onClick={() => this.mergeSort()}>
                Merge Sort
              </button>
              {!this.state.quickSort && (
                <button
                  className="btn btn-lg btn-primary py-1 px-1 mx-3"
                  onClick={() => {
                    this.setState({quickSort: true});
                  }}>
                  Quick Sort
                </button>
              )}{' '}
              {this.state.quickSort && (
                <button
                  className="btn btn-lg btn-warning py-1 px-5 mx-3"
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    this.setState({isGoingOn: true});
                  }}>
                  <FaPause />
                </button>
              )}
              <button
                className="btn btn-lg btn-primary py-1 px-1 mx-3"
                onClick={() => this.heapSort()}>
                Heap Sort
              </button>
              <button
                className="btn btn-lg btn-primary py-1 px-1 mx-3"
                onClick={() => this.bubbleSort()}>
                Bubble Sort
              </button>
            </div>
          </div>
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
