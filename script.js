const gameBoard = document.getElementById('gameBoard');
const attemptCountElement = document.getElementById('attemptCount');
const categorySelector = document.getElementById('category');
const levelSelector = document.getElementById('level');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let attempts = 0;
let currentCategory = 'fruits';
let currentLevel = 1;

// Card sets for each category and levels
const cardSets = {
    fruits: [
    ['🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍓', '🍓'], // Level 3
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍'], // Level 4
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝'], // Level 5
    ['🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍌', '🍌', '🍇', '🍇'], // Level 6
    ['🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍓', '🍓', '🍉', '🍉', '🍋', '🍋'], // Level 7
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋'], // Level 8
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋', '🍉', '🍉'], // Level 9
    ['🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍓', '🍓', '🍉', '🍉', '🍋', '🍋', '🍑', '🍑', '🍈', '🍈'], // Level 10
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋', '🍉', '🍉', '🍑', '🍑'], // Level 11
    ['🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍓', '🍓', '🍉', '🍉', '🍋', '🍋', '🍑', '🍑', '🍈', '🍈', '🍏', '🍏'], // Level 12
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋', '🍉', '🍉', '🍑', '🍑', '🍈', '🍈'], // Level 13
    ['🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍓', '🍓', '🍉', '🍉', '🍋', '🍋', '🍑', '🍑', '🍈', '🍈', '🍏', '🍏', '🍊', '🍊'], // Level 14
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋', '🍉', '🍉', '🍑', '🍑', '🍈', '🍈', '🍏', '🍏'], // Level 15
    ['🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍓', '🍓', '🍉', '🍉', '🍋', '🍋', '🍑', '🍑', '🍈', '🍈', '🍏', '🍏', '🍊', '🍊', '🍇', '🍇'], // Level 16
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋', '🍉', '🍉', '🍑', '🍑', '🍈', '🍈', '🍏', '🍏', '🍊', '🍊'], // Level 17
    ['🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍓', '🍓', '🍉', '🍉', '🍋', '🍋', '🍑', '🍑', '🍈', '🍈', '🍏', '🍏', '🍊', '🍊', '🍌', '🍌'], // Level 18
    ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋', '🍉', '🍉', '🍑', '🍑', '🍈', '🍈', '🍏', '🍏', '🍊', '🍊', '🍍', '🍍'], // Level 19
    ['🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝', '🍎', '🍎', '🍓', '🍓', '🍉', '🍉', '🍋', '🍋', '🍑', '🍑', '🍈', '🍈', '🍏', '🍏', '🍊', '🍊', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓'],
    ],
    emojis: [
        ['🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃'], // Level 2
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎'], // Level 3
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭'], // Level 4
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔'], // Level 5
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃'], // Level 6
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅'], // Level 7
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡'], // Level 8
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯'], // Level 9
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱'], // Level 10
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇'], // Level 11
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇', '🤓', '🤓'], // Level 12
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇', '🤓', '🤓', '😜', '😜'], // Level 13
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇', '🤓', '🤓', '😜', '😜', '😴', '😴'], // Level 14
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇', '🤓', '🤓', '😜', '😜', '😴', '😴', '🤐', '🤐'], // Level 15
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇', '🤓', '🤓', '😜', '😜', '😴', '😴', '🤐', '🤐', '🤪', '🤪'], // Level 16
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇', '🤓', '🤓', '😜', '😜', '😴', '😴', '🤐', '🤐', '🤪', '🤪', '😵', '😵'], // Level 17
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇', '🤓', '🤓', '😜', '😜', '😴', '😴', '🤐', '🤐', '🤪', '🤪', '😵', '😵', '🤠', '🤠'], // Level 18
        ['😀', '😀', '😂', '😂', '😍', '😍', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '😭', '😭', '🤔', '🤔', '🙃', '🙃', '😅', '😅', '😡', '😡', '🤯', '🤯', '😱', '😱', '😇', '😇', '🤓', '🤓', '😜', '😜', '😴', '😴', '🤐', '🤐', '🤪', '🤪', '😵', '😵', '🤠', '🤠', '🤑', '🤑'],
    ],
    alphabets: [
        ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'], // Level 3
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G'], // Level 4
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'], // Level 5
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I'], // Level 6
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J'], // Level 7
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K'], // Level 8
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'], // Level 9
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M'], // Level 10
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N'], // Level 11
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O'], // Level 12
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P'], // Level 13
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q'], // Level 14
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R'], // Level 15
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S'], // Level 16
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T'], // Level 17
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'U', 'U'], // Level 18
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'U', 'U', 'V', 'V'], // Level 19
    ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'U', 'U', 'V', 'V', 'W', 'W'],
    ],
    numbers: [
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6'], // Level 3
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7'], // Level 4
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'], // Level 5
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9'], // Level 6
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10'], // Level 7
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11'], // Level 8
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12'], // Level 9
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13'], // Level 10
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14'], // Level 11
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15'], // Level 12
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16'], // Level 13
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16', '17', '17'], // Level 14
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16', '17', '17', '18', '18'], // Level 15
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16', '17', '17', '18', '18', '19', '19'], // Level 16
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16', '17', '17', '18', '18', '19', '19', '20', '20'], // Level 17
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16', '17', '17', '18', '18', '19', '19', '20', '20', '21', '21'], // Level 18
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16', '17', '17', '18', '18', '19', '19', '20', '20', '21', '21', '22', '22'], // Level 19
        ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10', '11', '11', '12', '12', '13', '13', '14', '14', '15', '15', '16', '16', '17', '17', '18', '18', '19', '19', '20', '20', '21', '21', '22', '22', '23', '23'],
    ]
};

// Shuffle the cards
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Populate levels based on category
function loadLevels() {
    currentCategory = categorySelector.value;
    levelSelector.innerHTML = '';

    // Populate level options dynamically
    for (let i = 1; i <= cardSets[currentCategory].length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Level ${i}`;
        levelSelector.appendChild(option);
    }

    // Start the game with the first level of the selected category
    startGame();
}

// Start a new game
function startGame() {
    currentLevel = parseInt(levelSelector.value);
    matches = 0;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    attempts = 0;
    attemptCountElement.textContent = attempts;
    gameBoard.innerHTML = '';

    const cardsArray = [...cardSets[currentCategory][currentLevel - 1]];
    shuffle(cardsArray);
    createBoard(cardsArray);
}

// Create the game board
function createBoard(cardsArray) {
    cardsArray.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="front">${symbol}</div>
            <div class="back">?</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        attempts++;
        attemptCountElement.textContent = attempts;
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    const isMatch = firstCard.querySelector('.front').textContent === secondCard.querySelector('.front').textContent;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === cardSets[currentCategory][currentLevel - 1].length / 2) {
            setTimeout(() => alert(`Level ${currentLevel} Complete!`), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Initialize the game
loadLevels();
