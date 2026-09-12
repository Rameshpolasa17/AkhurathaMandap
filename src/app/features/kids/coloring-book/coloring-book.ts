import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ColoringPicture {
  id: number;
  title: string;
  image: string;
  difficulty: string;
  category: string;
  icon: string;
}

interface ColorItem {
  name: string;
  value: string;
}

interface BrushSize {
  name: string;
  size: number;
}

interface DrawingSnapshot {
  data: ImageData;
}

@Component({
  selector: 'app-coloring-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coloring-book.html',
  styleUrl: './coloring-book.scss',
})
export class ColoringBook implements AfterViewInit, OnDestroy {
  /*=========================================================
                          CANVAS
  =========================================================*/

  @ViewChild('colorCanvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('canvasWrapper')
  canvasWrapperRef!: ElementRef<HTMLDivElement>;

  private canvas!: HTMLCanvasElement;

  private context!: CanvasRenderingContext2D;

  private resizeObserver?: ResizeObserver;

  private sourceImage = new Image();

  private isCanvasReady = false;

  /*=========================================================
                          HERO
  =========================================================*/

  heroTitle = 'Ganesh Coloring Book';

  heroSubtitle =
    'Choose a beautiful Ganesha picture, pick your favourite colors and create your own festival masterpiece.';

  /*=========================================================
                    COLORING PICTURES
  =========================================================*/

  pictures: ColoringPicture[] = [
    {
      id: 1,
      title: 'Little Ganesha',
      image: 'images/coloring/coloring-1.png',
      difficulty: 'Easy',
      category: 'Kids Favourite',
      icon: '🐘',
    },
    {
      id: 2,
      title: 'Ganesha With Modak',
      image: 'images/coloring/coloring-2.png',
      difficulty: 'Easy',
      category: 'Sweet Story',
      icon: '🍬',
    },
    {
      id: 3,
      title: 'Festival Ganesha',
      image: 'images/coloring/coloring-3.png',
      difficulty: 'Medium',
      category: 'Festival',
      icon: '🎉',
    },
    {
      id: 4,
      title: 'Ganesha On Lotus',
      image: 'images/coloring/coloring-4.png',
      difficulty: 'Medium',
      category: 'Divine',
      icon: '🌸',
    },
    {
      id: 5,
      title: 'Eco Friendly Ganesha',
      image: 'images/coloring/coloring-5.png',
      difficulty: 'Medium',
      category: 'Nature',
      icon: '🌿',
    },
    {
      id: 6,
      title: 'Royal Ganesha',
      image: 'images/coloring/coloring-6.png',
      difficulty: 'Hard',
      category: 'Challenge',
      icon: '👑',
    },
  ];

  selectedPictureIndex = 0;

  /*=========================================================
                       COLOR PALETTE
  =========================================================*/

  colors: ColorItem[] = [
    {
      name: 'Red',
      value: '#ef5350',
    },
    {
      name: 'Orange',
      value: '#ff9800',
    },
    {
      name: 'Golden',
      value: '#ffc107',
    },
    {
      name: 'Yellow',
      value: '#ffeb3b',
    },
    {
      name: 'Green',
      value: '#66bb6a',
    },
    {
      name: 'Mint',
      value: '#26a69a',
    },
    {
      name: 'Sky Blue',
      value: '#42a5f5',
    },
    {
      name: 'Blue',
      value: '#3f51b5',
    },
    {
      name: 'Purple',
      value: '#ab47bc',
    },
    {
      name: 'Pink',
      value: '#ec407a',
    },
    {
      name: 'Brown',
      value: '#8d6e63',
    },
    {
      name: 'Black',
      value: '#424242',
    },
  ];

  selectedColor = '#ff9800';

  customColor = '#ff9800';

  /*=========================================================
                       BRUSH SIZES
  =========================================================*/

  brushSizes: BrushSize[] = [
    {
      name: 'Small',
      size: 4,
    },
    {
      name: 'Medium',
      size: 10,
    },
    {
      name: 'Large',
      size: 18,
    },
    {
      name: 'Extra Large',
      size: 28,
    },
  ];

  selectedBrushSize = 10;

  /*=========================================================
                           TOOLS
  =========================================================*/

  activeTool: 'brush' | 'eraser' | 'magic' = 'brush';

  isDrawing = false;

  lastX = 0;

  lastY = 0;

  /*=========================================================
                        UNDO / REDO
  =========================================================*/

  undoStack: DrawingSnapshot[] = [];

  redoStack: DrawingSnapshot[] = [];

  maxHistory = 30;

  /*=========================================================
                         PROGRESS
  =========================================================*/

  completedArtworks = 0;

  totalStars = 0;

  drawingsStarted = 0;

  achievements = 0;

  /*=========================================================
                       MAGIC COLORS
  =========================================================*/

  magicColors = ['#ff6b6b', '#ff9800', '#ffc107', '#66bb6a', '#42a5f5', '#ab47bc', '#ec407a'];

  magicColorIndex = 0;

  /*=========================================================
                       CELEBRATION
  =========================================================*/

  showCelebration = false;

  celebrationTitle = '';

  celebrationMessage = '';

  celebrationStars = 0;

  private celebrationTimer: ReturnType<typeof setTimeout> | null = null;

  /*=========================================================
                         CONSTRUCTOR
  =========================================================*/

  constructor(private router: Router) {}

  /*=========================================================
                        AFTER VIEW INIT
  =========================================================*/

  ngAfterViewInit(): void {
    this.setupCanvas();

    this.setupResizeObserver();

    this.loadProgress();

    this.loadPicture(this.pictures[this.selectedPictureIndex]);
  }

  /*=========================================================
                         DESTROY
  =========================================================*/

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();

    if (this.celebrationTimer) {
      clearTimeout(this.celebrationTimer);
    }
  }

  /*=========================================================
                       SETUP CANVAS
  =========================================================*/

  private setupCanvas(): void {
    this.canvas = this.canvasRef.nativeElement;

    const context = this.canvas.getContext('2d', {
      willReadFrequently: true,
    });

    if (!context) {
      return;
    }

    this.context = context;

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.resizeCanvas();

    this.isCanvasReady = true;
  }

  /*=========================================================
                     RESIZE OBSERVER
  =========================================================*/

  private setupResizeObserver(): void {
    if (!this.canvasWrapperRef) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas(true);
    });

    this.resizeObserver.observe(this.canvasWrapperRef.nativeElement);
  }

  /*=========================================================
                       RESIZE CANVAS
  =========================================================*/

  private resizeCanvas(preserveDrawing = false): void {
    if (!this.canvasRef || !this.canvasWrapperRef) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;

    const wrapper = this.canvasWrapperRef.nativeElement;

    let previousImage: ImageData | null = null;

    if (preserveDrawing && canvas.width > 0 && canvas.height > 0 && this.context) {
      previousImage = this.context.getImageData(0, 0, canvas.width, canvas.height);
    }

    const width = Math.max(Math.floor(wrapper.clientWidth), 300);

    const height = Math.max(Math.floor(width * 0.72), 360);

    canvas.width = width;
    canvas.height = height;

    if (!this.context) {
      const context = canvas.getContext('2d', {
        willReadFrequently: true,
      });

      if (!context) {
        return;
      }

      this.context = context;
    }

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.fillCanvasWhite();

    if (previousImage) {
      const temporaryCanvas = document.createElement('canvas');

      temporaryCanvas.width = previousImage.width;

      temporaryCanvas.height = previousImage.height;

      const temporaryContext = temporaryCanvas.getContext('2d');

      temporaryContext?.putImageData(previousImage, 0, 0);

      this.context.drawImage(temporaryCanvas, 0, 0, canvas.width, canvas.height);
    } else if (this.sourceImage.complete && this.sourceImage.naturalWidth > 0) {
      this.drawSourceImage();
    }
  }

  /*=========================================================
                       SELECT PICTURE
  =========================================================*/

  selectPicture(index: number): void {
    if (index < 0 || index >= this.pictures.length) {
      return;
    }

    this.selectedPictureIndex = index;

    this.undoStack = [];
    this.redoStack = [];

    this.loadPicture(this.pictures[index]);

    setTimeout(() => {
      document.getElementById('coloringStudio')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }

  /*=========================================================
                        LOAD PICTURE
  =========================================================*/

  private loadPicture(picture: ColoringPicture): void {
    if (!this.isCanvasReady) {
      return;
    }

    this.sourceImage = new Image();

    this.sourceImage.onload = () => {
      this.fillCanvasWhite();

      this.drawSourceImage();

      this.undoStack = [];
      this.redoStack = [];

      this.saveHistory();
    };

    this.sourceImage.onerror = () => {
      this.fillCanvasWhite();

      this.drawPlaceholder();

      this.undoStack = [];
      this.redoStack = [];

      this.saveHistory();
    };

    this.sourceImage.src = picture.image;
  }

  /*=========================================================
                      DRAW SOURCE IMAGE
  =========================================================*/

  private drawSourceImage(): void {
    if (!this.sourceImage || !this.sourceImage.naturalWidth) {
      return;
    }

    this.fillCanvasWhite();

    const padding = 25;

    const availableWidth = this.canvas.width - padding * 2;

    const availableHeight = this.canvas.height - padding * 2;

    const scale = Math.min(
      availableWidth / this.sourceImage.naturalWidth,
      availableHeight / this.sourceImage.naturalHeight,
    );

    const width = this.sourceImage.naturalWidth * scale;

    const height = this.sourceImage.naturalHeight * scale;

    const x = (this.canvas.width - width) / 2;

    const y = (this.canvas.height - height) / 2;

    this.context.drawImage(this.sourceImage, x, y, width, height);
  }

  /*=========================================================
                       PLACEHOLDER
  =========================================================*/

  private drawPlaceholder(): void {
    this.context.save();

    this.context.fillStyle = '#fff8ec';

    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = '#ef6c00';

    this.context.textAlign = 'center';

    this.context.font = '700 24px Arial';

    this.context.fillText(
      '🐘 Ganesh Coloring Book',
      this.canvas.width / 2,
      this.canvas.height / 2 - 20,
    );

    this.context.fillStyle = '#8d7d70';

    this.context.font = '14px Arial';

    this.context.fillText(
      'Add your coloring image to start drawing',
      this.canvas.width / 2,
      this.canvas.height / 2 + 18,
    );

    this.context.restore();
  }

  /*=========================================================
                     WHITE BACKGROUND
  =========================================================*/

  private fillCanvasWhite(): void {
    this.context.save();

    this.context.globalCompositeOperation = 'source-over';

    this.context.fillStyle = '#ffffff';

    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.restore();
  }

  /*=========================================================
                        SELECT COLOR
  =========================================================*/

  selectColor(color: string): void {
    this.selectedColor = color;

    this.customColor = color;

    this.activeTool = 'brush';
  }

  /*=========================================================
                        CUSTOM COLOR
  =========================================================*/

  changeCustomColor(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.customColor = input.value;

    this.selectedColor = input.value;

    this.activeTool = 'brush';
  }

  /*=========================================================
                       SELECT BRUSH
  =========================================================*/

  selectBrushSize(size: number): void {
    this.selectedBrushSize = size;
  }

  /*=========================================================
                         SET TOOL
  =========================================================*/

  setTool(tool: 'brush' | 'eraser' | 'magic'): void {
    this.activeTool = tool;
  }

  /*=========================================================
                       POINTER DOWN
  =========================================================*/

  startDrawing(event: PointerEvent): void {
    if (!this.context) {
      return;
    }

    event.preventDefault();

    this.canvas.setPointerCapture(event.pointerId);

    const position = this.getPointerPosition(event);

    this.isDrawing = true;

    this.lastX = position.x;
    this.lastY = position.y;

    this.redoStack = [];

    this.context.beginPath();

    this.context.moveTo(this.lastX, this.lastY);

    this.drawPoint(this.lastX, this.lastY);
  }

  /*=========================================================
                       POINTER MOVE
  =========================================================*/

  draw(event: PointerEvent): void {
    if (!this.isDrawing) {
      return;
    }

    event.preventDefault();

    const position = this.getPointerPosition(event);

    this.context.beginPath();

    this.context.moveTo(this.lastX, this.lastY);

    this.applyDrawingStyle();

    this.context.lineTo(position.x, position.y);

    this.context.stroke();

    this.lastX = position.x;
    this.lastY = position.y;
  }

  /*=========================================================
                        POINTER UP
  =========================================================*/

  stopDrawing(event?: PointerEvent): void {
    if (!this.isDrawing) {
      return;
    }

    this.isDrawing = false;

    if (event && this.canvas.hasPointerCapture(event.pointerId)) {
      this.canvas.releasePointerCapture(event.pointerId);
    }

    this.context.closePath();

    this.saveHistory();

    this.drawingsStarted++;

    this.saveProgress();
  }

  /*=========================================================
                        DRAW POINT
  =========================================================*/

  private drawPoint(x: number, y: number): void {
    this.applyDrawingStyle();

    this.context.beginPath();

    this.context.arc(x, y, this.selectedBrushSize / 2, 0, Math.PI * 2);

    if (this.activeTool === 'eraser') {
      this.context.fillStyle = '#ffffff';
    } else {
      this.context.fillStyle = this.getCurrentDrawingColor();
    }

    this.context.fill();

    this.context.closePath();
  }

  /*=========================================================
                    APPLY DRAWING STYLE
  =========================================================*/

  private applyDrawingStyle(): void {
    this.context.globalCompositeOperation = 'source-over';

    this.context.lineWidth = this.selectedBrushSize;

    if (this.activeTool === 'eraser') {
      this.context.strokeStyle = '#ffffff';

      return;
    }

    this.context.strokeStyle = this.getCurrentDrawingColor();
  }

  /*=========================================================
                     CURRENT DRAW COLOR
  =========================================================*/

  private getCurrentDrawingColor(): string {
    if (this.activeTool === 'magic') {
      const color = this.magicColors[this.magicColorIndex % this.magicColors.length];

      this.magicColorIndex++;

      return color;
    }

    return this.selectedColor;
  }

  /*=========================================================
                    POINTER POSITION
  =========================================================*/

  private getPointerPosition(event: PointerEvent): {
    x: number;
    y: number;
  } {
    const rect = this.canvas.getBoundingClientRect();

    const scaleX = this.canvas.width / rect.width;

    const scaleY = this.canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,

      y: (event.clientY - rect.top) * scaleY,
    };
  }

  /*=========================================================
                         HISTORY
  =========================================================*/

  private saveHistory(): void {
    if (!this.context) {
      return;
    }

    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    this.undoStack.push({
      data: imageData,
    });

    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
  }

  /*=========================================================
                           UNDO
  =========================================================*/

  undo(): void {
    if (this.undoStack.length <= 1) {
      return;
    }

    const current = this.undoStack.pop();

    if (current) {
      this.redoStack.push(current);
    }

    const previous = this.undoStack[this.undoStack.length - 1];

    if (previous) {
      this.restoreSnapshot(previous);
    }
  }

  /*=========================================================
                           REDO
  =========================================================*/

  redo(): void {
    const snapshot = this.redoStack.pop();

    if (!snapshot) {
      return;
    }

    this.undoStack.push(snapshot);

    this.restoreSnapshot(snapshot);
  }

  /*=========================================================
                     RESTORE SNAPSHOT
  =========================================================*/

  private restoreSnapshot(snapshot: DrawingSnapshot): void {
    if (snapshot.data.width === this.canvas.width && snapshot.data.height === this.canvas.height) {
      this.context.putImageData(snapshot.data, 0, 0);

      return;
    }

    const tempCanvas = document.createElement('canvas');

    tempCanvas.width = snapshot.data.width;

    tempCanvas.height = snapshot.data.height;

    const tempContext = tempCanvas.getContext('2d');

    if (!tempContext) {
      return;
    }

    tempContext.putImageData(snapshot.data, 0, 0);

    this.fillCanvasWhite();

    this.context.drawImage(tempCanvas, 0, 0, this.canvas.width, this.canvas.height);
  }

  /*=========================================================
                          CLEAR
  =========================================================*/

  clearDrawing(): void {
    this.loadPicture(this.pictures[this.selectedPictureIndex]);
  }

  /*=========================================================
                    DOWNLOAD ARTWORK
  =========================================================*/

  downloadArtwork(): void {
    if (!this.canvas) {
      return;
    }

    const link = document.createElement('a');

    const picture = this.pictures[this.selectedPictureIndex];

    const fileName = picture.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    link.download = `${fileName}-coloring.png`;

    link.href = this.canvas.toDataURL('image/png', 1);

    link.click();
  }

  /*=========================================================
                    COMPLETE ARTWORK
  =========================================================*/

  completeArtwork(): void {
    const reward = 50;

    this.completedArtworks++;

    this.totalStars += reward;

    this.calculateAchievements();

    this.saveProgress();

    this.showReward('Beautiful Artwork!', 'Your Ganesh coloring masterpiece is complete.', reward);
  }

  /*=========================================================
                       ACHIEVEMENTS
  =========================================================*/

  private calculateAchievements(): void {
    let count = 0;

    if (this.completedArtworks >= 1) {
      count++;
    }

    if (this.completedArtworks >= 3) {
      count++;
    }

    if (this.completedArtworks >= 6) {
      count++;
    }

    if (this.totalStars >= 300) {
      count++;
    }

    this.achievements = count;
  }

  /*=========================================================
                       CELEBRATION
  =========================================================*/

  private showReward(title: string, message: string, stars: number): void {
    this.celebrationTitle = title;

    this.celebrationMessage = message;

    this.celebrationStars = stars;

    this.showCelebration = true;

    if (this.celebrationTimer) {
      clearTimeout(this.celebrationTimer);
    }

    this.celebrationTimer = setTimeout(() => {
      this.showCelebration = false;
    }, 3500);
  }

  closeCelebration(): void {
    this.showCelebration = false;

    if (this.celebrationTimer) {
      clearTimeout(this.celebrationTimer);

      this.celebrationTimer = null;
    }
  }

  /*=========================================================
                       LOCAL STORAGE
  =========================================================*/

  private saveProgress(): void {
    const progress = {
      completedArtworks: this.completedArtworks,

      totalStars: this.totalStars,

      drawingsStarted: this.drawingsStarted,

      achievements: this.achievements,
    };

    localStorage.setItem('akhurathaColoringBookProgress', JSON.stringify(progress));
  }

  private loadProgress(): void {
    const stored = localStorage.getItem('akhurathaColoringBookProgress');

    if (!stored) {
      return;
    }

    try {
      const progress = JSON.parse(stored);

      this.completedArtworks = progress.completedArtworks ?? 0;

      this.totalStars = progress.totalStars ?? 0;

      this.drawingsStarted = progress.drawingsStarted ?? 0;

      this.achievements = progress.achievements ?? 0;

      this.calculateAchievements();
    } catch {
      localStorage.removeItem('akhurathaColoringBookProgress');
    }
  }

  /*=========================================================
                       NAVIGATION
  =========================================================*/

  goToKidsZone(): void {
    this.router.navigate(['/kids']);
  }
}
