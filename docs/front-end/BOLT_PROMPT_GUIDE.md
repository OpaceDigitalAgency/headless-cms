# PROMPT FOR BOLT.NEW: The "Dynamic Skin" System & Modern UI

**Use this prompt when asking Bolt.new to generate new skins or components for this project.**

---

## 📋 The Prompt

> "I need you to design a **[Page/Component Name]** with a **[Style Name, e.g., Cyberpunk/Minimalist/Agency]** aesthetic.
>
> **CRITICAL TECH STACK:**
> *   **Tailwind CSS v4 (LATEST):** You MUST use Tailwind v4 syntax. Do not use `@config`. Use CSS variables for theme values.
> *   **Modern CSS:** Use features like `backdrop-filter`, `mix-blend-mode`, `mask-image`, and complex CSS gradients.
>
> **DESIGN GOALS (WOW FACTOR):**
> 1.  **Premium Aesthetics:** This must look like an Awwwards-winning site. Use 3D transforms, glassmorphism, and subtle glows.
> 2.  **Rich Animations:** EVERYTHING should feel alive. Use `group-hover` for complex interactions. Add entrance animations (`animate-in`, `fade-in`, `slide-in`).
> 3.  **Micro-Interactions:** Buttons should glow or scale on hover. Cards should lift. Use `transition-all duration-500 ease-out` for smooth feels.
>
> **ARCHITECTURE RULES (DO NOT IGNORE):**
> 1.  **NO HARDCODED COLORS:** Do NOT use `bg-black`, `text-white`, `bg-slate-900`, or `bg-zinc-950`.
> 2.  **Use Semantic System Variables:**
>     *   Backgrounds: `bg-base` (Main), `bg-card` (Cards), `bg-muted` (Secondary).
>     *   Text: `text-foreground` (Main), `text-muted` (Secondary), `text-accent` (Highlights).
>     *   Borders: `border-border`, `border-input`.
> 3.  **For Unique Theme Colors:** Do not find a color like `emerald-500`. Use `text-accent` and `bg-accent`. I will define what "accent" means globally.
> 4.  **For Gradients:** Do not rely on valid tailwind utility chains like `from-green-400` because the colors might not exist in my theme. Instead, use a custom class like `.gradient-text-hero` or `.gradient-bg-section` and tell me what the CSS should be.
> 5.  **For Light/Dark Mode:** Assume the system handles the switch via `bg-base`. Do not write `dark:` modifiers manually.
>
> **Output:** React Component (TSX)."

---

## 💡 Why this works

1.  **Tailwind v4 Mandate:** Ensures Bolt uses the latest engine features and syntax.
2.  **WOW Factor:** Pushes the model to generate high-end, animated interfaces instead of flat layouts.
3.  **System Variables:** Ensures the component adapts to Light/Dark mode and different Skins automatically without breaking your theme.
