import React from 'react';
import * as sortingAlgorithms from './../sortingAlgorithms/sortingAlgorithms'
import './sortingVisualizer.css';

export default class sortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() { //array resets every time the component (array) mounts (loads)
        this.resetArray();
    }

    resetArray() { //this method is used when the array mounts and it will also be reused when we click on the 'generate new array' button
        const array = [];

        for (let i = 0; i < 310; i++) {
            array.push(randomIntFromInterval(5,730)); //picked 5 as a minimum in order to be able to visualize the element despite being as small as it could be
        }
        this.setState({array})
    }

    mergeSort() { //first sorting method (leer documentacion par poner aqui)
        const javascriptSortedArray = this.state.array
            .slice()
            .sort((a,b) => a - b);
        const sortedArray = sortingAlgorithms.mergeSort(this.state.array);

        console.log(arraysAreEqual(javascriptSortedArray, sortedArray));
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testSortingAlgorithms() { //this method is used in testing in order to confirm that a sorting method actually works, comparing it to built-in javascript sorting method
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let j = 0; j < length; j++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javascriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());
            console.log(arraysAreEqual(javascriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="body">
                <div className="array-container">
                {array.map((value, index) => ( //iterating through the array and mapping each element to a div 
                //we need to add a key to each div because they are rendered in an iterable (otherwise, react would show an error in the console)
                    <div
                    className="array-bar"
                    key={index}
                    style={{height: `${value}px`}}></div>
                ))}
                </div>
                <div className="button-section">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
                </div>
            </div>
        );
    }
}

const randomIntFromInterval = (min,max) => { //randomize a number in an interval including max and min
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const arraysAreEqual = (arr1, arr2) => { //compares that the two arrays submitted are equal
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}