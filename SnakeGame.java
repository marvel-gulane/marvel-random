import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.LinkedList;
import java.util.Random;   

public class SnakeGame extends JPanel implements ActionListener, KeyListener {

    // Nokia LCD colors
    private static final Color LCD_BG = new Color(140, 170, 110);
    private static final Color LCD_FG = new Color(35, 55, 25);
    private static final Color LCD_BORDER = new Color(20, 35, 15);
    private static final Color BODY_BG = new Color(50, 50, 55);

    // Game constants
    private static final int COLS = 20, ROWS = 15;
    private static final int CELL = 24;
    private static final int INITIAL_SPEED = 200;
    private static final int MIN_SPEED = 60;

    // Game state
    private LinkedList<Point> snake;
    private Point food;
    private int direction; // 0=up, 1=right, 2=down, 3=left
    private int nextDirection;
    private int score;
    private int highScore;
    private boolean gameOver;
    private boolean paused;
    private boolean running;
    private Timer timer;
    private Random rand;

    private static final int[] DX = {0, 1, 0, -1};
    private static final int[] DY = {-1, 0, 1, 0};

    public SnakeGame() {
        setPreferredSize(new Dimension(COLS * CELL + 4, ROWS * CELL + 60));
        setBackground(BODY_BG);
        setFocusable(true);
        addKeyListener(this);
        rand = new Random();
        resetGame();
        timer = new Timer(INITIAL_SPEED, this);
    }

    private void resetGame() {
        snake = new LinkedList<>();
        int cx = COLS / 2, cy = ROWS / 2;
        snake.add(new Point(cx, cy));
        snake.add(new Point(cx - 1, cy));
        snake.add(new Point(cx - 2, cy));
        direction = 1;
        nextDirection = 1;
        score = 0;
        gameOver = false;
        paused = false;
        running = true;
        spawnFood();
        timer.setDelay(INITIAL_SPEED);
        timer.start();
    }

    private void spawnFood() {
        do {
            food = new Point(rand.nextInt(COLS), rand.nextInt(ROWS));
        } while (snake.contains(food));
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (gameOver || paused) return;
        moveSnake();
        repaint();
    }

    private void moveSnake() {
        direction = nextDirection;
        Point head = snake.getFirst();
        Point newHead = new Point(head.x + DX[direction], head.y + DY[direction]);

        // Wall collision
        if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
            endGame();
            return;
        }

        // Self collision
        if (snake.contains(newHead)) {
            endGame();
            return;
        }

        snake.addFirst(newHead);

        // Eat food
        if (newHead.equals(food)) {
            score++;
            if (score > highScore) highScore = score;
            spawnFood();
            // Speed up
            int newSpeed = Math.max(MIN_SPEED, INITIAL_SPEED - score * 5);
            timer.setDelay(newSpeed);
        } else {
            snake.removeLast();
        }
    }

    private void endGame() {
        gameOver = true;
        running = false;
        timer.stop();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_OFF);

        int offsetX = 2, offsetY = 40;

        // LCD screen border
        g2.setColor(LCD_BORDER);
        g2.fillRect(offsetX - 2, offsetY - 2, COLS * CELL + 4, ROWS * CELL + 4);

        // LCD background
        g2.setColor(LCD_BG);
        g2.fillRect(offsetX, offsetY, COLS * CELL, ROWS * CELL);

        // Grid (subtle)
        g2.setColor(new Color(130, 160, 100));
        for (int x = 0; x <= COLS; x++)
            g2.drawLine(offsetX + x * CELL, offsetY, offsetX + x * CELL, offsetY + ROWS * CELL);
        for (int y = 0; y <= ROWS; y++)
            g2.drawLine(offsetX, offsetY + y * CELL, offsetX + COLS * CELL, offsetY + y * CELL);

        // Food (blinking square)
        if (!gameOver) {
            g2.setColor(LCD_FG);
            int fx = offsetX + food.x * CELL + 3;
            int fy = offsetY + food.y * CELL + 3;
            g2.fillRect(fx, fy, CELL - 6, CELL - 6);
        }

        // Snake
        g2.setColor(LCD_FG);
        for (Point p : snake) {
            int sx = offsetX + p.x * CELL + 1;
            int sy = offsetY + p.y * CELL + 1;
            g2.fillRect(sx, sy, CELL - 2, CELL - 2);
        }

        // Score bar
        g2.setColor(LCD_FG);
        g2.setFont(new Font("Courier", Font.BOLD, 14));
        g2.drawString("SCORE: " + score, offsetX, 20);
        g2.drawString("HI: " + highScore, offsetX + COLS * CELL - 80, 20);

        // Game over overlay
        if (gameOver) {
            g2.setColor(new Color(140, 170, 110, 200));
            g2.fillRect(offsetX, offsetY, COLS * CELL, ROWS * CELL);
            g2.setColor(LCD_FG);
            g2.setFont(new Font("Courier", Font.BOLD, 20));
            String msg = "GAME OVER";
            int mw = g2.getFontMetrics().stringWidth(msg);
            g2.drawString(msg, offsetX + (COLS * CELL - mw) / 2, offsetY + ROWS * CELL / 2 - 10);
            g2.setFont(new Font("Courier", Font.PLAIN, 12));
            String sub = "Press ENTER to restart";
            int sw = g2.getFontMetrics().stringWidth(sub);
            g2.drawString(sub, offsetX + (COLS * CELL - sw) / 2, offsetY + ROWS * CELL / 2 + 15);
        }

        // Paused
        if (paused && !gameOver) {
            g2.setColor(LCD_FG);
            g2.setFont(new Font("Courier", Font.BOLD, 16));
            String msg = "PAUSED";
            int mw = g2.getFontMetrics().stringWidth(msg);
            g2.drawString(msg, offsetX + (COLS * CELL - mw) / 2, offsetY + ROWS * CELL / 2);
        }
    }

    // --- Key handling ---
    @Override
    public void keyPressed(KeyEvent e) {
        int key = e.getKeyCode();
        if (gameOver && key == KeyEvent.VK_ENTER) {
            resetGame();
            return;
        }
        if (key == KeyEvent.VK_P || key == KeyEvent.VK_ESCAPE) {
            if (!gameOver) { paused = !paused; repaint(); }
            return;
        }
        if (paused) return;

        switch (key) {
            case KeyEvent.VK_UP:    if (direction != 2) nextDirection = 0; break;
            case KeyEvent.VK_RIGHT: if (direction != 3) nextDirection = 1; break;
            case KeyEvent.VK_DOWN:  if (direction != 0) nextDirection = 2; break;
            case KeyEvent.VK_LEFT:  if (direction != 1) nextDirection = 3; break;
            case KeyEvent.VK_W:     if (direction != 2) nextDirection = 0; break;
            case KeyEvent.VK_D:     if (direction != 3) nextDirection = 1; break;
            case KeyEvent.VK_S:     if (direction != 0) nextDirection = 2; break;
            case KeyEvent.VK_A:     if (direction != 1) nextDirection = 3; break;
        }
    }
    @Override public void keyReleased(KeyEvent e) {}
    @Override public void keyTyped(KeyEvent e) {}

    // --- Main ---
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("SNAKE - Nokia Style");
            SnakeGame game = new SnakeGame();
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setResizable(false);
            frame.add(game);
            frame.pack();
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
            game.requestFocusInWindow();
        });
    }
}   
