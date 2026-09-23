import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Tetris extends JPanel implements ActionListener, KeyListener {

    static final int COLS = 10, ROWS = 20, CELL = 30, SIDE = 150;

    // Each piece: 4 rotations, each rotation = 4 cells as {row, col}
    static final int[][][] SHAPES = {
        { // I
            {{0,0},{0,1},{0,2},{0,3}},
            {{0,0},{1,0},{2,0},{3,0}},
            {{0,0},{0,1},{0,2},{0,3}},
            {{0,0},{1,0},{2,0},{3,0}}
        },
        { // O
            {{0,0},{0,1},{1,0},{1,1}},
            {{0,0},{0,1},{1,0},{1,1}},
            {{0,0},{0,1},{1,0},{1,1}},
            {{0,0},{0,1},{1,0},{1,1}}
        },
        { // T
            {{0,1},{1,0},{1,1},{1,2}},
            {{0,0},{1,0},{1,1},{2,0}},
            {{0,0},{0,1},{0,2},{1,1}},
            {{0,1},{1,1},{2,1},{1,0}}
        },
        { // S
            {{0,1},{0,2},{1,0},{1,1}},
            {{0,0},{1,0},{1,1},{2,1}},
            {{0,1},{0,2},{1,0},{1,1}},
            {{0,0},{1,0},{1,1},{2,1}}
        },
        { // Z
            {{0,0},{0,1},{1,1},{1,2}},
            {{0,1},{1,0},{1,1},{2,0}},
            {{0,0},{0,1},{1,1},{1,2}},
            {{0,1},{1,0},{1,1},{2,0}}
        },
        { // J
            {{0,0},{1,0},{1,1},{1,2}},
            {{0,0},{0,1},{1,0},{2,0}},
            {{0,0},{0,1},{0,2},{1,0}},
            {{0,1},{1,1},{2,1},{2,0}}
        },
        { // L
            {{0,2},{1,0},{1,1},{1,2}},
            {{0,0},{1,0},{2,0},{2,1}},
            {{0,0},{0,1},{0,2},{1,2}},
            {{0,0},{1,0},{2,0},{2,1}}
        }
    };

    static final Color[] COLORS = {
        Color.CYAN, Color.YELLOW, Color.PURPLE,
        Color.GREEN, Color.RED, Color.BLUE, Color.ORANGE
    };

    int[][] board = new int[ROWS][COLS];
    int piece, rot, cx, cy, score, lines, level;
    boolean gameOver, paused;
    Timer timer;

    Tetris() {
        setPreferredSize(new Dimension(COLS * CELL + SIDE, ROWS * CELL));
        setBackground(Color.BLACK);
        setFocusable(true);
        addKeyListener(this);
        newGame();
    }

    void newGame() {
        board = new int[ROWS][COLS];
        score = 0; lines = 0; level = 0;
        gameOver = false; paused = false;
        spawn();
        if (timer != null) timer.stop();
        timer = new Timer(800, this);
        timer.start();
    }

    void spawn() {
        piece = (int)(Math.random() * 7);
        rot = 0;
        cx = COLS / 2 - 2;
        cy = 0;
        if (!valid(cx, cy, piece, rot)) {
            gameOver = true;
            timer.stop();
        }
    }

    boolean valid(int x, int y, int p, int r) {
        for (int[] c : SHAPES[p][r]) {
            int nx = x + c[1], ny = y + c[0];
            if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
            if (ny >= 0 && board[ny][nx] != 0) return false;
        }
        return true;
    }

    void lock() {
        for (int[] c : SHAPES[piece][rot]) {
            int x = cx + c[1], y = cy + c[0];
            if (y >= 0 && y < ROWS && x >= 0 && x < COLS)
                board[y][x] = piece + 1;
        }
        clearLines();
        spawn();
    }

    void clearLines() {
        int cleared = 0;
        for (int y = ROWS - 1; y >= 0; y--) {
            boolean full = true;
            for (int x = 0; x < COLS; x++)
                if (board[y][x] == 0) { full = false; break; }
            if (full) {
                for (int yy = y; yy > 0; yy--)
                    for (int x = 0; x < COLS; x++)
                        board[yy][x] = board[yy-1][x];
                for (int x = 0; x < COLS; x++) board[0][x] = 0;
                cleared++;
                y++;
            }
        }
        if (cleared > 0) {
            lines += cleared;
            score += new int[]{0, 100, 300, 500, 800}[cleared] * (level + 1);
            level = lines / 10;
            timer.setDelay(Math.max(100, 800 - level * 70));
        }
    }

    void drop() {
        if (valid(cx, cy + 1, piece, rot)) cy++;
        else lock();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (!gameOver && !paused) { drop(); repaint(); }
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        for (int y = 0; y < ROWS; y++)
            for (int x = 0; x < COLS; x++)
                if (board[y][x] != 0) cell(g, x, y, COLORS[board[y][x] - 1]);
        if (!gameOver)
            for (int[] c : SHAPES[piece][rot]) {
                int x = cx + c[1], y = cy + c[0];
                if (y >= 0) cell(g, x, y, COLORS[piece]);
            }
        g.setColor(Color.WHITE);
        g.setFont(new Font("Monospaced", Font.BOLD, 16));
        g.drawString("Score: " + score, COLS * CELL + 20, 50);
        g.drawString("Lines: " + lines, COLS * CELL + 20, 80);
        g.drawString("Level: " + level, COLS * CELL + 20, 110);
        if (gameOver) {
            g.setColor(Color.RED);
            g.setFont(new Font("Monospaced", Font.BOLD, 22));
            g.drawString("GAME OVER", COLS * CELL + 20, 180);
            g.setFont(new Font("Monospaced", Font.PLAIN, 14));
            g.setColor(Color.WHITE);
            g.drawString("Press R to restart", COLS * CELL + 20, 210);
        }
        if (paused) {
            g.setColor(Color.YELLOW);
            g.setFont(new Font("Monospaced", Font.BOLD, 20));
            g.drawString("PAUSED", COLS * CELL + 40, 260);
        }
    }

    void cell(Graphics g, int x, int y, Color c) {
        int px = x * CELL, py = y * CELL;
        g.setColor(c);
        g.fillRect(px + 1, py + 1, CELL - 2, CELL - 2);
        g.setColor(c.brighter());
        g.fillRect(px + 1, py + 1, CELL - 2, 4);
        g.fillRect(px + 1, py + 1, 4, CELL - 2);
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (gameOver) {
            if (e.getKeyCode() == KeyEvent.VK_R) newGame();
            return;
        }
        if (e.getKeyCode() == KeyEvent.VK_P) { paused = !paused; repaint(); return; }
        if (paused) return;
        switch (e.getKeyCode()) {
            case KeyEvent.VK_LEFT:  if (valid(cx-1, cy, piece, rot)) cx--; break;
            case KeyEvent.VK_RIGHT: if (valid(cx+1, cy, piece, rot)) cx++; break;
            case KeyEvent.VK_DOWN:  drop(); break;
            case KeyEvent.VK_UP:
                int nr = (rot + 1) % 4;
                if (valid(cx, cy, piece, nr)) rot = nr;
                break;
            case KeyEvent.VK_SPACE:
                while (valid(cx, cy+1, piece, rot)) cy++;
                lock();
                break;
        }
        repaint();
    }
    @Override public void keyReleased(KeyEvent e) {}
    @Override public void keyTyped(KeyEvent e) {}

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame f = new JFrame("Tetris");
            f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            Tetris t = new Tetris();
            f.add(t);
            f.pack();
            f.setLocationRelativeTo(null);
            f.setVisible(true);
            t.requestFocusInWindow();
        });
    }
}   
