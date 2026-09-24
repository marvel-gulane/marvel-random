;nasm -f elf64 hello.asm -o hello.o && ld -o hello hello.o && ./hello

; 1. SAVE — write the code to a file with .asm extension
;nano hello.asm         # or vim, VS Code, any editor
; paste the code above, save (Ctrl+O), quit (Ctrl+X)
;
; 2. ASSEMBLE — convert human-readable asm → machine code (.o file)
;nasm -f elf64 hello.asm -o hello.o
;    -f elf64  → output format: 64-bit ELF (Linux standard)
;    -o hello.o → name of the object file
;
; 3. LINK — produce a standalone executable
;ld -o hello hello.o
;    ld = GNU linker; stitches object file(s) into a runnable binary
;
; 4. RUN
;./hello
; Output: Hello, World!   

; ─── hello.asm ───────────────────────────────────────────
; Save as: hello.asm
; Assemble: nasm -f elf64 hello.asm -o hello.o
; Link:     ld -o hello hello.o
; Run:      ./hello

section .data          ; ── DATA SECTION ──
    msg db "Hello, World!", 10   ; db = define byte; 10 = newline
    len equ $ - msg              ; equ = constant; $ = current addr → length = 14

section .text          ; ── CODE SECTION ──
    global _start      ; entry point (tells linker where to begin)

_start:
    ; ── WRITE to stdout ──
    mov rax, 1         ; syscall number 1 = write
    mov rdi, 1         ; fd 1 = stdout (0=stdin, 2=stderr)
    mov rsi, msg       ; pointer to the string
    mov rdx, len       ; number of bytes to write
    syscall            ; ── hand control to the OS ──

    ; ── EXIT cleanly ──
    mov rax, 60        ; syscall number 60 = exit
    xor rdi, rdi       ; exit code 0 (success)
    syscall            ; ── program ends ──   