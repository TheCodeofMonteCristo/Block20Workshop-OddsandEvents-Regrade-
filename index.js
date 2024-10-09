/* Overall Pseudocode Explaining how this Code functions:

This JavaScript code manages a simple application that allows users to input numbers, 
categorize them as odd or even, and display them accordingly. Below is a detailed explanation of the code, 
including its structure, functions, and logic.



Overview
The code consists of three main sections:

State Management: Initializes arrays to hold numbers and defines functions to add and sort numbers.
Rendering: Functions to update the user interface by displaying the current state of the number banks (odd, even, and total).
Interactivity: Sets up event listeners to handle user input and actions.
*/








// #region STATE
// Initialize three arrays to manage numbers: numberBank for all numbers,
// oddBank for odd numbers, and evenBank for even numbers.
let numberBank = [];
let oddBank = [];
let evenBank = [];

// Function to add a number to the numberBank array.
function addNumberBank(num) {
    numberBank.push(num);
}

// Function to sort one number from numberBank into oddBank or evenBank.
// If numberBank is empty, it exits early.
function sortOne() {
    if (numberBank.length === 0) {
        return;
    }

    // Remove the first number from numberBank and determine its parity.
    const one = numberBank.shift();
    if (one % 2 === 1) {
        oddBank.push(one); // If odd, add to oddBank.
    } else {
        evenBank.push(one); // If even, add to evenBank.
    }
}

// #region RENDER
// Function to render the current numbers in numberBank to the output section in the HTML.
function renderNumberBank() {
    // Create a span element for each number and store them in an array.
    const $numberBankNumbers = numberBank.map((number) => {
        const $number = document.createElement('span');
        $number.textContent = number + ' ';
        return $number;
    });
    
    const $numberBank = document.querySelector('#numberBank');
    const $output = $numberBank.querySelector('output'); // Select the output element.
    $output.replaceChildren(...$numberBankNumbers); // Update the output with the new number spans.
}

// Function to render the current odd numbers in oddBank to the output section in the HTML.
function renderOddBank() {
    // Create a span element for each odd number and store them in an array.
    const $oddBankNumbers = oddBank.map((number) => {
        const $number = document.createElement('span');
        $number.textContent = number + ' ';
        return $number;
    });
    
    const $oddBank = document.querySelector('#odds');
    const $output = $oddBank.querySelector('output'); // Select the output element for odd numbers.
    $output.replaceChildren(...$oddBankNumbers); // Update the output with the new odd number spans.
}

// Function to render the current even numbers in evenBank to the output section in the HTML.
function renderEvenBank() {
    // Create a span element for each even number and store them in an array.
    const $evenBankNumbers = evenBank.map((number) => {
        const $number = document.createElement('span');
        $number.textContent = number + ' ';
        return $number;
    });
    
    const $evenBank = document.querySelector('#evens');
    const $output = $evenBank.querySelector('output'); // Select the output element for even numbers.
    $output.replaceChildren(...$evenBankNumbers); // Update the output with the new even number spans.
}

// #region SCRIPT

// Add interactivity to the form for adding numbers.
const $form = document.querySelector('form');
$form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    const $numInput = document.querySelector('#number');
    const newNum = parseInt($numInput.value); // Parse the input value as an integer.
    if (newNum === 0 || newNum) { // Check if the input is valid (non-zero).
        addNumberBank(newNum); // Add the new number to the number bank.
        renderNumberBank(); // Render the updated number bank.
    }
})

// Add interactivity for the "Sort 1" button to sort a single number.
const $sortOne = document.querySelector('#sortOne');
$sortOne.addEventListener('click', () => {
    sortOne(); // Sort one number from the bank.
    renderNumberBank(); // Render the updated number bank.
    renderOddBank(); // Render the updated odd bank.
    renderEvenBank(); // Render the updated even bank.
})

// Add interactivity for the "Sort All" button to sort all numbers in the bank.
const $sortAll = document.querySelector('#sortAll');
$sortAll.addEventListener('click', () => {
    // Continuously sort until the number bank is empty.
    while (numberBank.length > 0) {
        sortOne();
    }
    renderNumberBank(); // Render the final state of the number bank.
    renderOddBank(); // Render the final state of the odd bank.
    renderEvenBank(); // Render the final state of the even bank.
})