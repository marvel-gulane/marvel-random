import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

//java --enable-preview --source 21 ShellRunner.java

public class ShellRunner {

    public static void main(String[] args) {
        try {
            // --- Example 1: Simple command ---
            System.out.println("=== ls -la ===");
            String output = run("ls", "-la", ".");
            System.out.println(output);

            // --- Example 2: Command with arguments ---
            System.out.println("=== git status ===");
            output = run("git", "status", "--short");
            System.out.println(output);

            // --- Example 3: Pipe via bash -c ---
            System.out.println("=== grep in files ===");
            output = run("bash", "-c", "grep -r \"TODO\" . --include=\"*.java\"");
            System.out.println(output);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String run(String... cmd) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.redirectErrorStream(true);

        Process p = pb.start();
        StringBuilder sb = new StringBuilder();
        try (BufferedReader r = new BufferedReader(
                new InputStreamReader(p.getInputStream()))) {
            String line;
            while ((line = r.readLine()) != null) {
                sb.append(line).append("\n");
            }
        }

        int exit = p.waitFor();
        if (exit != 0) {
            throw new RuntimeException("Command failed (exit " + exit + "):\n" + sb);
        }
        return sb.toString();
    }
}   
