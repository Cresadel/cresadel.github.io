# React Defense Questionnaire

**Purpose**: A quick reviewer for a thesis or project defense about the React part of the Cresadel portfolio. Contains likely questions, concise answers, and code‑file references so you can trace each answer back to the actual source.

---

## Project at a glance
- **React**: `^18.3.1` (functional components + hooks)
- **Vite**: `^6.0.7`
- **Router**: `react-router-dom@^7.18.5` using **HashRouter** (`src/main.jsx`)
- **Build**: `npm run build` → `dist/` (static, GitHub Pages‑ready)
- **Key folders**: `src/components`, `src/pages`, `src/hooks`, `src/data`, `src/utils`
- **Known a‑11y gaps** (focus‑pause, `aria‑current` on dots) – note in the “Tricky” section.

---

## Part 1 – React fundamentals
### Q1. Why did you use React instead of plain HTML?
**Answer:** React lets us build reusable components, manage local state, and update the UI without full page reloads. It also works naturally with routing (`react-router-dom`) and Vite’s hot‑module replacement.

**Bisaya tip:** Component‑based ang React, kaya dali i‑reuse ug i‑maintain ang UI.

**Code reference:** `src/main.jsx` → `ReactDOM.createRoot`

### Q2. What is JSX?
**Answer:** JSX is a syntax extension that looks like HTML but gets compiled by Vite/esbuild into `React.createElement` calls. It lets us describe UI structure inside JavaScript.

**Bisaya tip:** JSX nakitaon tulog HTML, pero kini gin‑compile sa JavaScript.

**Code reference:** `src/App.jsx` → `<div className="navbar">…</div>`

### Q3. Props vs state?
**Answer:** **Props** are read‑only data passed from a parent to a child. **State** is internal data that changes over time and triggers a re‑render when updated.

**Bisaya tip:** Props madala lang from parent; state gigawas ang re‑render.

**Code reference:** `src/hooks/useSlideshow.js` → `const [index, setIndex] = useState(0)`

### Q4. Why functional components + hooks?
**Answer:** Functional components are simpler and, with hooks, we can reuse logic (state, side effects, context) without class syntax. All custom hooks in this project (`useSlideshow`, `useReveal`) are built this way.

**Bisaya tip:** Functional components plus hooks mas easy ug mas reusable kaysa class components.

**Code reference:** `src/hooks/useReveal.js` → `export default function useReveal(ready)`

### Q5. What does `useEffect` do? Why is cleanup important?
**Answer:** `useEffect` runs side‑effects after render (timers, listeners, localStorage). Cleanup (returning a function) prevents memory leaks when the component unmounts or the effect re‑runs.

**Bisaya tip:** Cleanup gawas sa effects makapadayon ang timers ug listeners, walay memory leak.

**Code reference:** `src/components/Loader.jsx:24‑48` → `useEffect` with `finishedRef` guard

### Q6. When would you use `useCallback` / `useRef`?
**Answer:** `useCallback` returns a stable function reference so downstream effects don’t re‑run unnecessarily. `useRef` stores a value or DOM node without causing a re‑render; useful for focusing elements, storing previous values, or avoiding clean‑up hassles.

**Bisaya tip:** `useCallback` keeps function consistent; `useRef` stores data wala mag‑re‑render.

**Code reference:** `src/hooks/useSlideshow.js:55` → `const toggleAutoPlay = useCallback(() => setAutoPlay((prev) => !prev), []);`

---

## Part 2 – Project‑specific questions
### Q7. Why `HashRouter` instead of `BrowserRouter`?
**Answer:** GitHub Pages is static hosting; there’s no server to rewrite unknown URLs to `index.html`. `HashRouter` uses the `#` portion of the URL, so direct links like `/about` work without a rewrite. The trade‑off is that the URL shows `#/about` instead of clean `/about`.

**Bisaya tip:** GitHub Pages dili suporta direct routes, kaya gamit ang hash (`#`) upat kun‑map ang route.

**Code reference:** `src/main.jsx` → `<HashRouter>…</HashRouter>`

### Q8. How does theme persistence work?
**Answer:** `useTheme` toggles the `dark-mode` class on `<body>` and saves the choice to `localStorage`. On app start, `src/main.jsx` reads that saved value and adds the class before React renders.

**Bisaya tip:** Theme gitagta sa localStorage, kaya unsaon usab pag‑reload.

**Code reference:** `src/main.jsx:4‑8` → `if (localStorage.getItem("cresadel-theme") === "dark") { document.body.classList.add("dark-mode"); }`

### Q9. How does `useSlideshow` work?
**Answer:** The hook maintains the current `index`, provides `next()`, `previous()`, and `toggleAutoPlay()`. Autoplay runs via `setInterval` and is paused on hover, disabled when the OS prefers reduced motion, and cleaned up on unmount.

**Bisaya tip:** Autoplay kay pause sa hover, i‑disable kung reduced motion ang OS.

**Code reference:** `src/hooks/useSlideshow.js:17‑57`

### Q10. How does `useReveal` work?
**Answer:** It adds the `.show` class to elements with the `.reveal` class when they intersect the viewport, using `IntersectionObserver`. Hero elements use staggered `setTimeout` timers instead. Cleanup (`observer.disconnect()`) happens on route change.

**Bisaya tip:** IntersectionObserver nag‑detect ug mag‑add og class kapag element mag‑enter sa viewport.

**Code reference:** `src/hooks/useReveal.js:23‑62`

### Q11. Why is `key` important in `.map()`?
**Answer:** React uses `key` to identify which items changed, added, or removed. A stable `key` (usually an ID) lets React reuse DOM nodes, avoiding unnecessary re‑creations and flicker.

**Bisaya tip:** Key gawas kay mag‑ingon sa React unsaon pag‑update ang lista.

**Code reference:** `src/components/PlaceSlideshow.jsx:36` → `key={slide.src}`

### Q12. Why use `SafeImage` and `asset()`?
**Answer:** `asset()` prepends Vite’s `import.meta.env.BASE_URL`, crucial for GitHub Pages paths. `SafeImage` adds `loading="lazy"`, an error‑class on fail, and forwards extra props (`...rest`). It keeps images performant and robust.

**Bisaya tip:** `asset()` gamit ang base URL para GitHub Pages; `SafeImage` mag‑handle og error ug lazy load.

**Code reference:** `src/components/SafeImage.jsx:1‑21`

### Q13. How is accessibility handled?
**Answer:** The site includes a skip‑link, `aria‑current="page"` on active nav links, `aria‑live` regions in sliders, keyboard arrows/space for slide navigation, and reduced‑motion support. Note: focus‑management on route change and mobile menu is still a future improvement.

**Bisaya tip:** May skip link, aria‑current, keyboard controls, ug reduced motion. Focus‑management pa kini ihambog.

**Code reference:** `src/components/Navbar.jsx:111‑133` → `aria-current`, `aria-haspopup`; `src/components/PlaceSlideshow.jsx:21‑24` → keyboard handlers

### Q14. Why optimize the images?
**Answer:** Original assets were **8.49 MB**. After WebP conversion, dimension reduction, and quality tweaks, the deployed bundle is **2.64 MB** (~69 % reduction). `profile.jpg` is kept for OG/Twitter metadata; `place‑4.jpg` is retained because its WebP version was larger.

**Bisaya tip:** Daghan mabaw‑sabot kaayo ang images, kaya mog‑reduce og file size. Profile image i‑retain para OG metadata.

**Code reference:** `src/data/projects.js` → project image paths; `index.html:125` → OG image

### Q15. What does `StrictMode` do?
**Answer:** `StrictMode` runs some effects twice in development to surface missing clean‑ups and other side‑effect issues. It does **not** appear in production builds but helps catch bugs early.

**Bisaya tip:** Development check only, mag‑double‑run og effects para mapan‑detect ang bug.

**Code reference:** `src/main.jsx` → `<React.StrictMode>`

### Q16. Why not Redux (or any global state library)?
**Answer:** The app’s state is local and limited to a few components (theme, slideshow, loader). Adding Redux would add unnecessary complexity. If shared state grows, Context or Zustand can be introduced later.

**Bisaya tip:** Dili pa needed karon, kay state local lang. Kapag daghan, gitawas na lang Context.

**Code reference:** `src/hooks/useTheme.js` → `useState` + `localStorage`

### Q17. What causes re‑renders, and how do you optimize?
**Answer:** State or prop changes trigger re‑renders. Over‑using `useMemo`/`useCallback` too early can hurt readability. The best approach: measure first with the React DevTools Profiler, then apply memoization where it matters (e.g., stable callbacks in the slideshow hook).

**Bisaya tip:** Dili maka‑optimize ug una; ipali‑measure og Profiler muna.

**Code reference:** `src/hooks/useSlideshow.js` → `useCallback` for `next`, `previous`, `toggleAutoPlay`

### Q18. How is deployment done?
**Answer:** `npm run build` creates a `dist/` folder. GitHub Actions (`.github/workflows/deploy.yml`) runs the build and pushes the `dist/` to GitHub Pages. The `base: "./"` in `vite.config.js` and `HashRouter` keep routes and asset paths correct on Pages.

**Bisaya tip:** Build ug GitHub Actions, pag‑deploy sa Pages. Base `"./"` ug HashRouter kay ma‑work ang routes.

**Code reference:** `vite.config.js:2‑5` → `base: "./"` and plugins; `.github/workflows/deploy.yml`

---

## Part 3 – Tricky follow‑up questions
### Q19. Why `StrictMode`?
*(same as Q18, kept here for emphasis)*  

### Q20. Why not Redux?
*(same as Q17, kept here for emphasis)*  

### Q21. What causes re‑renders?
*(same as Q17, kept here for emphasis)*  

### Q22. Where would you add global state?
**Answer:** Not needed yet. If the app grows (e.g., user preferences, theme across many pages), consider React **Context** or a lightweight store like **Zustand**. Adding it now would be premature optimization.

**Bisaya tip:** Dili pa daghan, gitawas na lang Context ug Zustand kay unay ra.

**Code reference:** `src/hooks/useTheme.js` → could be moved to Context later.

### Q23. How would you improve focus management on route change?
**Answer:** Currently the app lacks an automatic focus‑return after navigation. A common pattern is to set `focus` to the main content wrapper (`#main-content`) or use a `useEffect` that calls `window.focus()` when the URL changes. This would complete the accessibility story for keyboard‑only users.

**Bisaya tip:** I‑focus ang main content pag‑change sa route para ma‑assist ang keyboard users.

**Code reference:** `src/components/Navbar.jsx:216‑287` → mobile menu; `src/main.jsx` → root `<div id="root"></div>`

---

## Top 5 most likely defense questions
1. **Why HashRouter?** – static hosting limitation.  
2. **How does theme persist?** – `localStorage` + class toggle.  
3. **How does the slideshow autoplay work?** – interval, hover pause, reduced‑motion respect.  
4. **What does `useEffect` cleanup do?** – prevents leaks.  
5. **How are images optimized?** – WebP, dimensions, fallback JPG for OG.

---

## Quick defense checklist
- [ ] Can explain JSX compilation.  
- [ ] Can differentiate props vs state.  
- [ ] Know why `HashRouter` is used.  
- [ ] Understand theme‑persistence mechanism.  
- [ ] Describe slideshow autoplay & reduced‑motion handling.  
- [ ] Recall `useEffect` cleanup purpose.  
- [ ] Explain image‑optimization workflow.  
- [ ] Mention one a‑11y feature and one remaining gap.  

---
*Generated automatically from the project’s source code references. No React source files were modified.*