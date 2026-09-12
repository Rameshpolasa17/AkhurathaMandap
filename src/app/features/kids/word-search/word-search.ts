import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface WordItem {
  word: string;
  found: boolean;
}

interface GridCell {
  row: number;
  col: number;
  letter: string;
  selected: boolean;
  found: boolean;
}

interface Position {
  row: number;
  col: number;
}

@Component({
  selector: 'app-word-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-search.html',
  styleUrl: './word-search.scss',
})
export class WordSearch implements OnInit, OnDestroy {
  /*=========================================================
                      GAME SETTINGS
  =========================================================*/

  gridSize = 12;

  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  /*=========================================================
                      WORDS
  =========================================================*/

  words: WordItem[] = [
    {
      word: 'GANESHA',
      found: false,
    },
    {
      word: 'GANAPATI',
      found: false,
    },
    {
      word: 'VINAYAKA',
      found: false,
    },
    {
      word: 'MODAK',
      found: false,
    },
    {
      word: 'LADDU',
      found: false,
    },
    {
      word: 'MOUSE',
      found: false,
    },
    {
      word: 'TRUNK',
      found: false,
    },
    {
      word: 'TEMPLE',
      found: false,
    },
    {
      word: 'PUJA',
      found: false,
    },
    {
      word: 'LOTUS',
      found: false,
    },
  ];

  /*=========================================================
                      GRID
  =========================================================*/

  grid: GridCell[][] = [];

  /*=========================================================
                  WORD POSITIONS
  =========================================================*/

  private wordPositions = new Map<string, Position[]>();

  /*=========================================================
                  SELECTED CELLS
  =========================================================*/

  selectedCells: GridCell[] = [];

  selectedWord = '';

  /*=========================================================
                      GAME STATS
  =========================================================*/

  timer = 0;

  score = 0;

  foundCount = 0;

  attempts = 0;

  gameCompleted = false;

  message = '';

  messageType: 'success' | 'error' | '' = '';

  intervalId: ReturnType<typeof setInterval> | null = null;

  /*=========================================================
                      INIT
  =========================================================*/

  ngOnInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  /*=========================================================
                      START GAME
  =========================================================*/

  startGame(): void {
    this.stopTimer();

    this.timer = 0;
    this.score = 0;
    this.foundCount = 0;
    this.attempts = 0;

    this.gameCompleted = false;

    this.selectedCells = [];
    this.selectedWord = '';

    this.message = '';
    this.messageType = '';

    this.words = this.words.map((item) => ({
      ...item,
      found: false,
    }));

    this.wordPositions.clear();

    this.createEmptyGrid();

    this.placeWords();

    this.fillEmptyCells();

    this.startTimer();
  }

  /*=========================================================
                    CREATE EMPTY GRID
  =========================================================*/

  createEmptyGrid(): void {
    this.grid = [];

    for (let row = 0; row < this.gridSize; row++) {
      const currentRow: GridCell[] = [];

      for (let col = 0; col < this.gridSize; col++) {
        currentRow.push({
          row,
          col,
          letter: '',
          selected: false,
          found: false,
        });
      }

      this.grid.push(currentRow);
    }
  }

  /*=========================================================
                    PLACE ALL WORDS
  =========================================================*/

  placeWords(): void {
    this.words.forEach((item) => {
      this.placeWord(item.word);
    });
  }

  /*=========================================================
                    PLACE SINGLE WORD
  =========================================================*/

  placeWord(word: string): void {
    const directions = [
      { row: 0, col: 1 }, // Horizontal →
      { row: 1, col: 0 }, // Vertical ↓
      { row: 1, col: 1 }, // Diagonal ↘
      { row: 1, col: -1 }, // Diagonal ↙
      { row: 0, col: -1 }, // Horizontal ←
      { row: -1, col: 0 }, // Vertical ↑
      { row: -1, col: -1 }, // Diagonal ↖
      { row: -1, col: 1 }, // Diagonal ↗
    ];

    const maxAttempts = 500;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const direction = directions[Math.floor(Math.random() * directions.length)];

      const startRow = Math.floor(Math.random() * this.gridSize);

      const startCol = Math.floor(Math.random() * this.gridSize);

      if (this.canPlaceWord(word, startRow, startCol, direction.row, direction.col)) {
        this.insertWord(word, startRow, startCol, direction.row, direction.col);

        return;
      }
    }

    console.warn(`Could not place word: ${word}`);
  }

  /*=========================================================
                    CAN PLACE WORD
  =========================================================*/

  canPlaceWord(
    word: string,
    startRow: number,
    startCol: number,
    rowDirection: number,
    colDirection: number,
  ): boolean {
    const endRow = startRow + rowDirection * (word.length - 1);

    const endCol = startCol + colDirection * (word.length - 1);

    if (endRow < 0 || endRow >= this.gridSize || endCol < 0 || endCol >= this.gridSize) {
      return false;
    }

    for (let index = 0; index < word.length; index++) {
      const row = startRow + rowDirection * index;

      const col = startCol + colDirection * index;

      const existingLetter = this.grid[row][col].letter;

      if (existingLetter !== '' && existingLetter !== word[index]) {
        return false;
      }
    }

    return true;
  }

  /*=========================================================
                    INSERT WORD
  =========================================================*/

  insertWord(
    word: string,
    startRow: number,
    startCol: number,
    rowDirection: number,
    colDirection: number,
  ): void {
    const positions: Position[] = [];

    for (let index = 0; index < word.length; index++) {
      const row = startRow + rowDirection * index;

      const col = startCol + colDirection * index;

      this.grid[row][col].letter = word[index];

      positions.push({
        row,
        col,
      });
    }

    this.wordPositions.set(word, positions);
  }

  /*=========================================================
                  FILL RANDOM LETTERS
  =========================================================*/

  fillEmptyCells(): void {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (!this.grid[row][col].letter) {
          this.grid[row][col].letter = this.getRandomLetter();
        }
      }
    }
  }

  getRandomLetter(): string {
    const index = Math.floor(Math.random() * this.alphabet.length);

    return this.alphabet[index];
  }

  /*=========================================================
                    SELECT LETTER
  =========================================================*/

  selectCell(cell: GridCell): void {
    if (this.gameCompleted || cell.found) {
      return;
    }

    /*
      Clicking an already selected cell removes the
      current selection from that cell onward.
    */

    const existingIndex = this.selectedCells.findIndex(
      (selected) => selected.row === cell.row && selected.col === cell.col,
    );

    if (existingIndex !== -1) {
      const cellsToRemove = this.selectedCells.splice(existingIndex);

      cellsToRemove.forEach((item) => {
        item.selected = false;
      });

      this.updateSelectedWord();

      return;
    }

    /*
      First letter can always be selected.
    */

    if (this.selectedCells.length === 0) {
      cell.selected = true;

      this.selectedCells.push(cell);

      this.updateSelectedWord();

      return;
    }

    /*
      Additional letters must form a straight line.
    */

    if (!this.isValidNextCell(cell)) {
      this.clearSelection();

      cell.selected = true;

      this.selectedCells.push(cell);

      this.updateSelectedWord();

      return;
    }

    cell.selected = true;

    this.selectedCells.push(cell);

    this.updateSelectedWord();
  }

  /*=========================================================
                  VALIDATE NEXT CELL
  =========================================================*/

  isValidNextCell(cell: GridCell): boolean {
    const lastCell = this.selectedCells[this.selectedCells.length - 1];

    const rowDifference = cell.row - lastCell.row;

    const colDifference = cell.col - lastCell.col;

    /*
      Cell must be directly adjacent.
    */

    if (Math.abs(rowDifference) > 1 || Math.abs(colDifference) > 1) {
      return false;
    }

    if (rowDifference === 0 && colDifference === 0) {
      return false;
    }

    /*
      Second cell determines selection direction.
    */

    if (this.selectedCells.length === 1) {
      return true;
    }

    const firstCell = this.selectedCells[0];

    const secondCell = this.selectedCells[1];

    const expectedRowDirection = secondCell.row - firstCell.row;

    const expectedColDirection = secondCell.col - firstCell.col;

    return rowDifference === expectedRowDirection && colDifference === expectedColDirection;
  }

  /*=========================================================
                  UPDATE SELECTED WORD
  =========================================================*/

  updateSelectedWord(): void {
    this.selectedWord = this.selectedCells.map((cell) => cell.letter).join('');
  }

  /*=========================================================
                    CHECK WORD
  =========================================================*/

  checkSelectedWord(): void {
    if (!this.selectedWord) {
      this.showMessage('Select some letters first.', 'error');

      return;
    }

    this.attempts++;

    const forwardWord = this.selectedWord.toUpperCase();

    const reverseWord = forwardWord.split('').reverse().join('');

    const foundWord = this.words.find(
      (item) => !item.found && (item.word === forwardWord || item.word === reverseWord),
    );

    if (!foundWord) {
      this.showMessage('Not a hidden word. Try again!', 'error');

      this.clearSelection();

      return;
    }

    /*
      Verify the selected cells belong to the actual
      hidden word position.
    */

    if (!this.matchesStoredPosition(foundWord.word)) {
      this.showMessage('Good try! Find the actual hidden word.', 'error');

      this.clearSelection();

      return;
    }

    this.markWordFound(foundWord);
  }

  /*=========================================================
                  VERIFY POSITION
  =========================================================*/

  matchesStoredPosition(word: string): boolean {
    const positions = this.wordPositions.get(word);

    if (!positions) {
      return false;
    }

    if (positions.length !== this.selectedCells.length) {
      return false;
    }

    const selectedPositions = this.selectedCells.map((cell) => `${cell.row}-${cell.col}`);

    const normalPositions = positions.map((position) => `${position.row}-${position.col}`);

    const reversedPositions = [...normalPositions].reverse();

    const normalMatch = selectedPositions.every(
      (position, index) => position === normalPositions[index],
    );

    const reverseMatch = selectedPositions.every(
      (position, index) => position === reversedPositions[index],
    );

    return normalMatch || reverseMatch;
  }

  /*=========================================================
                    MARK FOUND
  =========================================================*/

  markWordFound(wordItem: WordItem): void {
    wordItem.found = true;

    this.selectedCells.forEach((cell) => {
      cell.selected = false;
      cell.found = true;
    });

    this.foundCount++;

    this.score += 100;

    this.showMessage(`🎉 Great! You found ${wordItem.word}!`, 'success');

    this.selectedCells = [];

    this.selectedWord = '';

    this.checkGameCompleted();
  }

  /*=========================================================
                  CLEAR SELECTION
  =========================================================*/

  clearSelection(): void {
    this.selectedCells.forEach((cell) => {
      if (!cell.found) {
        cell.selected = false;
      }
    });

    this.selectedCells = [];

    this.selectedWord = '';
  }

  /*=========================================================
                      MESSAGE
  =========================================================*/

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;

    this.messageType = type;

    setTimeout(() => {
      if (this.message === message) {
        this.message = '';
        this.messageType = '';
      }
    }, 2200);
  }

  /*=========================================================
                  CHECK COMPLETED
  =========================================================*/

  checkGameCompleted(): void {
    if (this.foundCount === this.words.length) {
      this.gameCompleted = true;

      this.stopTimer();

      /*
        Completion bonus
      */

      this.score += 500;
    }
  }

  /*=========================================================
                        TIMER
  =========================================================*/

  startTimer(): void {
    this.stopTimer();

    this.intervalId = setInterval(() => {
      if (!this.gameCompleted) {
        this.timer++;
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);

      this.intervalId = null;
    }
  }

  /*=========================================================
                      NEW GAME
  =========================================================*/

  newGame(): void {
    this.startGame();
  }

  /*=========================================================
                      PROGRESS
  =========================================================*/

  get progress(): number {
    if (this.words.length === 0) {
      return 0;
    }

    return Math.round((this.foundCount / this.words.length) * 100);
  }

  /*=========================================================
                    FORMAT TIME
  =========================================================*/

  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60)
      .toString()
      .padStart(2, '0');

    const seconds = (this.timer % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
