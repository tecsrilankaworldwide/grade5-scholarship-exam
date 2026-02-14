{
  "brand_attributes": {
    "name": "Grade 5 Scholarship Platform",
    "personality": ["encouraging", "trustworthy", "cheerful", "calm focus", "official"],
    "voice_tone": ["motivational", "clear", "age-appropriate"],
    "audiences": ["students 7-11", "parents", "teachers/admins"]
  },
  "design_personality": {
    "style_mix": [
      "Bento Grid for dashboard cards",
      "Swiss/functional layout for exam interface",
      "Subtle Glassmorphism accents for results celebration only",
      "Playful micro-animations (stars/streaks) with professional typography"
    ],
    "layout_patterns": ["Z-Pattern for landing/login", "Single-Column focus for exam", "Card/Grid layout for dashboard", "Masonry for announcements if needed"],
    "motion_principles": {
      "duration_ms": {"fast": 120, "base": 200, "slow": 320},
      "easing": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      "entrances": "fade+rise 12px, stagger children 60ms",
      "hover": "lift 2-4px with shadow-md -> shadow-lg",
      "press": "scale 0.98 with rebound",
      "scroll": "parallax 6-10% only on hero/empty states, never on exam screen"
    }
  },
  "color_system": {
    "goal": "Keep warm orange/yellow family, increase kid-friendliness and contrast while retaining official look.",
    "tokens_hex": {
      "primary": "#F6A317",            
      "primary-600": "#EB8F08",        
      "primary-700": "#D97706",        
      "secondary-brown": "#8A4D12",    
      "secondary-brown-700": "#6E3B0E", 
      "success": "#10B981",
      "success-700": "#059669",
      "warning": "#F59E0B",
      "error": "#EF4444",
      "info": "#0EA5E9",
      "ink": "#1F2937",
      "ink-soft": "#374151",
      "bg-0": "#FFFBF3",               
      "bg-1": "#FFF7E6",
      "bg-2": "#FFEFC7",
      "accent-yellow": "#FCD34D",
      "accent-peach": "#FFD89A",
      "chart-orange": "#F6A317",
      "chart-gold": "#F7AA37",
      "chart-deep": "#EB7400",
      "chart-green": "#0D7A6F"
    },
    "gradients": {
      "hero_soft_diagonal": ["#FFF7E6", "#FFEFC7", "#FFFBF3"],
      "cta_warm_glow": ["#FFFBF3", "#FFE8B5", "#FFD89A"],
      "chart_fill": ["#F6A317", "#F7AA37", "#EB7400"],
      "rules": [
        "Do not exceed 20% viewport coverage with gradients",
        "Never apply gradients to text-heavy reading areas",
        "Use only light/pastel warm gradients; avoid saturated purple/pink/blue mixes",
        "No gradients on small UI elements (<100px)"
      ]
    },
    "index_css_root_overrides": "@layer base { :root { --background: 40 100% 99%; --foreground: 215 28% 17%; --card: 0 0% 100%; --card-foreground: 215 28% 17%; --popover: 0 0% 100%; --popover-foreground: 215 28% 17%; --primary: 38 94% 54%; --primary-foreground: 0 0% 100%; --secondary: 28 77% 30%; --secondary-foreground: 43 100% 97%; --muted: 45 100% 96%; --muted-foreground: 215 15% 40%; --accent: 46 94% 85%; --accent-foreground: 215 28% 17%; --destructive: 0 84% 60%; --destructive-foreground: 43 100% 97%; --border: 45 56% 90%; --input: 45 56% 90%; --ring: 38 94% 54%; --chart-1: 38 94% 54%; --chart-2: 43 93% 60%; --chart-3: 26 86% 46%; --chart-4: 164 79% 26%; --chart-5: 180 6% 20%; --radius: 0.75rem; } }",
    "usage": {
      "text_on_primary": "Use white or near-white for WCAG AA",
      "headings": "Prefer secondary-brown for a warm academic tone",
      "exam_screen": "Use bg-0/bg-1 solids only; avoid gradients and animations behind content"
    }
  },
  "typography": {
    "headings": "Nunito (continue, bold/extra-bold)",
    "ui_body": "Manrope for professional clarity",
    "local_language_support": ["Noto Sans Sinhala", "Noto Sans Tamil"],
    "google_fonts_import": "<link href=\"https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Nunito:wght@700;800;900&family=Noto+Sans+Sinhala:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&display=swap\" rel=\"stylesheet\">",
    "classes": {
      "h1": "font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[color:var(--foreground)]",
      "h2": "font-bold text-base md:text-lg text-[color:var(--foreground)]",
      "body": "text-base sm:text-sm text-[color:var(--foreground)] leading-7",
      "small": "text-sm text-[color:var(--muted-foreground)]"
    }
  },
  "tokens": {
    "spacing": {"xs": 4, "sm": 8, "md": 16, "lg": 24, "xl": 32, "xxl": 48},
    "radius": {"sm": 8, "md": 12, "lg": 16, "xl": 24},
    "shadows": {
      "card": "0 6px 20px rgba(246, 163, 23, 0.12)",
      "card-hover": "0 12px 32px rgba(246, 163, 23, 0.18)",
      "focus": "0 0 0 3px rgba(246, 163, 23, 0.35)"
    }
  },
  "buttons": {
    "shape": "Playful / Youth primary with pill shape; Secondary uses professional medium radius",
    "variants": {
      "primary": "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full px-5 py-3 font-semibold shadow-sm hover:shadow-md hover:bg-[#EB8F08] focus-visible:ring-2 focus-visible:ring-[#F6A317] focus-visible:outline-none",
      "secondary": "bg-[hsl(var(--secondary))]/90 text-white rounded-md px-5 py-3 font-semibold hover:bg-[hsl(var(--secondary))] focus-visible:ring-2 focus-visible:ring-[#F6A317]",
      "ghost": "bg-transparent text-[#8A4D12] rounded-full px-5 py-3 hover:bg-[#FFEFC7] border border-[hsl(var(--border))]"
    },
    "sizes": {"sm": "h-9 px-4 text-sm", "md": "h-11 px-6 text-base", "lg": "h-12 px-7 text-base"},
    "data_testid_rule": "All Button components must forward data-testid like data-testid=\"primary-cta-button\""
  },
  "components": {
    "component_path": {
      "Button": "/app/frontend/src/components/ui/button.jsx",
      "Card": "/app/frontend/src/components/ui/card.jsx",
      "Input": "/app/frontend/src/components/ui/input.jsx",
      "Label": "/app/frontend/src/components/ui/label.jsx",
      "Progress": "/app/frontend/src/components/ui/progress.jsx",
      "Tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "Switch": "/app/frontend/src/components/ui/switch.jsx",
      "Badge": "/app/frontend/src/components/ui/badge.jsx",
      "Dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "Tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "Toast(Sonner)": "/app/frontend/src/components/ui/sonner.jsx",
      "RadioGroup": "/app/frontend/src/components/ui/radio-group.jsx",
      "Calendar": "/app/frontend/src/components/ui/calendar.jsx",
      "Table": "/app/frontend/src/components/ui/table.jsx"
    },
    "icons": {
      "library": "lucide-react",
      "style": "simple stroke icons, 1.5px, colors from tokens",
      "usage": "Do not use emoji. Example: <Star className=\"text-[#FCD34D]\" aria-hidden data-testid=\"reward-star-icon\" />"
    },
    "card_style": "rounded-xl border border-[hsl(var(--border))] bg-card shadow-[0_6px_20px_rgba(246,163,23,.08)]",
    "card_hover": "hover:shadow-[0_12px_32px_rgba(246,163,23,.16)] hover:-translate-y-0.5 transition-shadow duration-200",
    "input_style": "h-11 rounded-lg border-[hsl(var(--border))] focus-visible:ring-2 focus-visible:ring-[#F6A317] focus:outline-none placeholder:text-[hsl(var(--muted-foreground))]",
    "chip_badge": "inline-flex items-center rounded-full bg-[#FFEFC7] text-[#8A4D12] px-3 py-1 text-xs font-semibold"
  },
  "page_layouts": {
    "login": {
      "goal": "Warm welcome for kids; quick sign-in; parent help link",
      "structure": [
        "Top: logo + brand in secondary-brown",
        "Middle: card with Input (admission number or username), password, primary CTA",
        "Side/Bottom: hero photo with soft diagonal gradient overlay (<=20% viewport)"
      ],
      "container_classes": "min-h-screen bg-[#FFFBF3] grid md:grid-cols-2 gap-8 p-6 md:p-10",
      "card_classes": "max-w-md mx-auto md:mx-0 p-6 md:p-8 bg-white rounded-2xl shadow-lg",
      "micro_interactions": ["staggered field fade-in", "button hover lift"],
      "data_testids": ["login-username-input", "login-password-input", "login-form-submit-button", "login-help-link"]
    },
    "student_dashboard": {
      "goal": "At-a-glance exams, streaks, rewards, and next action",
      "structure": [
        "Header: avatar + Welcome message + streak badge",
        "Bento grid: 2-col on mobile -> 4-col on desktop of exam cards",
        "Progress row: Recharts area/line",
        "Rewards strip: badges with stars"
      ],
      "container_classes": "max-w-7xl mx-auto p-6 md:p-10 space-y-6",
      "grid_classes": "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
      "card_types": {
        "exam_card": "Card with subject color chip, attempt CTA, small progress bar",
        "streak_card": "Glassmorphism accent only here: bg-white/70 backdrop-blur supports hero vibe"
      },
      "data_testids": ["exam-card-math", "exam-card-sinhala", "start-exam-button", "dashboard-progress-chart", "reward-badges-section"]
    },
    "exam_interface": {
      "goal": "Calm, distraction-free 60 MCQ flow",
      "rules": ["Solid backgrounds only (bg-0/bg-1)", "No parallax or decorative animations", "Large tap targets (min 44x44)", "Sticky top bar with timer and question progress"],
      "topbar_classes": "sticky top-0 z-20 bg-[#FFFBF3] border-b border-[hsl(var(--border))]",
      "question_card": "p-5 md:p-6 rounded-xl bg-white border border-[hsl(var(--border))] shadow-sm",
      "option_item": "rounded-xl border-2 data-[state=checked]:border-[#10B981] data-[state=checked]:bg-[#ECFDF5] hover:border-[#F6A317] transition-colors",
      "nav": "flex items-center justify-between pt-4",
      "data_testids": ["exam-timer", "exam-question-text", "exam-option-a", "exam-option-b", "exam-option-c", "exam-option-d", "exam-next-button", "exam-prev-button", "exam-submit-button"]
    },
    "results_page": {
      "goal": "Celebrate without overwhelming; clear breakdown for parents",
      "structure": [
        "Hero card with score, rank, and pass status",
        "Confetti Lottie for short 2s on load (can be disabled in parent settings)",
        "Breakdown tabs: by subject, strengths, improvements"
      ],
      "classes": "max-w-5xl mx-auto p-6 md:p-10 space-y-6",
      "data_testids": ["result-total-score", "result-pass-badge", "result-subject-tabs", "result-download-button"]
    },
    "progress_reports": {
      "goal": "Trend focused, parent-readable",
      "components": ["Recharts Area/Bar/Line", "Table for attempts"],
      "classes": "max-w-6xl mx-auto p-6 md:p-10 space-y-6",
      "data_testids": ["progress-area-chart", "progress-bar-chart", "attempts-table"]
    }
  },
  "micro_interactions": {
    "buttons": "Hover: translate-y-[-2px] + shadow-lg. Active: translate-y-0. Use transition on background-color, box-shadow, transform only.",
    "cards": "Hover: -translate-y-0.5 + shadow elevation. No hover motion on mobile.",
    "charts": "Animate value entrances 300-600ms with ease-out",
    "toasts": "Use Sonner with success color #10B981 and error #EF4444"
  },
  "accessibility": {
    "contrast": "All text passes WCAG AA; verify orange on white with 4.5:1 for body text (use secondary-brown or ink for body)",
    "focus": "Use 3px visible ring in primary (#F6A317)",
    "touch_targets": ">=44px height for options and buttons",
    "language_support": "Ensure Sinhala/Tamil rendering checks for numerals and punctuation"
  },
  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid attributes (kebab-case, role based)",
    "examples": [
      "data-testid=\"login-form-submit-button\"",
      "data-testid=\"exam-option-a\"",
      "data-testid=\"result-total-score\""
    ]
  },
  "code_scaffolds": {
    "login_form_jsx": "import { Button } from './components/ui/button'; import { Input } from './components/ui/input'; import { Label } from './components/ui/label'; export default function LoginCard(){ return (<div className=\"max-w-md p-6 rounded-2xl bg-white shadow-lg\"> <form className=\"space-y-4\" data-testid=\"login-form\"> <div> <Label htmlFor=\"username\" className=\"text-[#8A4D12]\">Admission / Username</Label> <Input id=\"username\" data-testid=\"login-username-input\" placeholder=\"e.g., 5A-1023\" className=\"h-11 rounded-lg\" /> </div> <div> <Label htmlFor=\"password\" className=\"text-[#8A4D12]\">Password</Label> <Input id=\"password\" type=\"password\" data-testid=\"login-password-input\" className=\"h-11 rounded-lg\" /> </div> <Button data-testid=\"login-form-submit-button\" className=\"bg-[#F6A317] hover:bg-[#EB8F08] text-white rounded-full h-11 w-full\">Sign In</Button> <a href=\"#\" className=\"text-sm text-[#8A4D12] hover:underline\" data-testid=\"login-help-link\">Need help?</a> </form> </div> ); }",
    "exam_question_jsx": "import { Card } from './components/ui/card'; import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'; import { Button } from './components/ui/button'; export function Question({q, onNext, onPrev}){ return (<Card className=\"p-5 md:p-6\"> <div className=\"flex items-center justify-between pb-3 border-b\"> <div className=\"text-sm text-[#8A4D12]\" data-testid=\"exam-timer\">08:42</div> <div className=\"text-sm\">Q {q.index+1}/60</div> </div> <h2 className=\"mt-4 font-extrabold text-xl\" data-testid=\"exam-question-text\">{q.text}</h2> <RadioGroup className=\"mt-4 space-y-3\" data-testid=\"exam-options\"> {q.options.map((opt, i)=>{ const id = String.fromCharCode(65+i); return (<div key={id} className=\"flex items-center gap-3 p-4 rounded-xl border-2 hover:border-[#F6A317] data-[state=checked]:border-[#10B981] data-[state=checked]:bg-[#ECFDF5]\"> <RadioGroupItem value={id} id={id} data-testid={\`exam-option-${id.toLowerCase()}\`} /> <label htmlFor={id} className=\"font-semibold\">{id}. {opt}</label> </div> ); })} </RadioGroup> <div className=\"flex justify-between mt-4\"> <Button variant=\"ghost\" data-testid=\"exam-prev-button\">Previous</Button> <Button className=\"bg-[#F6A317] hover:bg-[#EB8F08]\" data-testid=\"exam-next-button\">Next</Button> </div> </Card> ); }",
    "recharts_line_jsx": "import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts'; export function ProgressChart({data}){ return (<div className=\"h-56\" data-testid=\"progress-area-chart\"> <ResponsiveContainer width=\"100%\" height=\"100%\"> <LineChart data={data}> <CartesianGrid stroke=\"#F6A31720\" /> <XAxis dataKey=\"label\" stroke=\"#8A4D12\" /> <YAxis stroke=\"#8A4D12\" /> <Tooltip /> <Line type=\"monotone\" dataKey=\"score\" stroke=\"#EB7400\" strokeWidth={3} dot={{ r: 3, stroke: '#F7AA37', fill: '#F7AA37' }} /> </LineChart> </ResponsiveContainer> </div> ); }"
  },
  "images": {
    "policy_note": "Use culturally sensitive, classroom-neutral photography. Do not identify people by name.",
    "image_urls": [
      {
        "url": "https://images.unsplash.com/photo-1698993082050-19ca94c62fb8?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Primary school student smiling in classroom, warm light",
        "category": "login-hero"
      },
      {
        "url": "https://images.unsplash.com/photo-1698993081947-8a3654303904?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Group of students smiling at desks, warm light",
        "category": "dashboard-welcome"
      },
      {
        "url": "https://images.unsplash.com/flagged/photo-1574098335395-18cf525e45d6?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Focused child in classroom, shallow depth of field",
        "category": "progress-report-hero"
      }
    ]
  },
  "library_integration": {
    "install_steps": [
      "npm i recharts framer-motion",
      "npm i lucide-react",
      "Ensure Sonner toast already exists at /app/frontend/src/components/ui/sonner.jsx"
    ],
    "usage_notes": [
      "Use Shadcn components from /components/ui exclusively for dropdowns, dialogs, calendar, toasts",
      "Avoid native HTML controls for complex components"
    ]
  },
  "grid_system": {
    "container": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    "columns": {"mobile": 4, "tablet": 8, "desktop": 12},
    "gutters": {"mobile": 12, "tablet": 16, "desktop": 24}
  },
  "index_css_todos": [
    "Add Google Fonts link in index.html head",
    "Paste color_system.index_css_root_overrides into /app/frontend/src/index.css @layer base :root",
    "Replace any 'transition: all' in CSS with property-specific transitions (e.g., transition: background-color 200ms, box-shadow 200ms, transform 120ms) per enforcement"
  ],
  "icons_and_illustrations": {
    "icons": "lucide-react only",
    "lottie": "Use a short 2s Confetti animation for results (search on lottiefiles.com); provide reduced-motion media query to disable",
    "texture": "Optional ultra-subtle grain overlay: after:bg-[radial-gradient(closest-side,rgba(0,0,0,.03),transparent)] after:opacity-40 after:pointer-events-none"
  },
  "instructions_to_main_agent": [
    "Implement the new CSS variables under :root in index.css using the provided HSL values.",
    "Refactor App.css button/card selectors to avoid transition: all; use property-specific transitions only.",
    "Adopt shadcn/ui components listed in components.component_path. Do not introduce raw HTML dropdowns or toasts.",
    "Add data-testid attributes to all interactive elements and key labels as per testing_attributes.rule.",
    "Apply gradient backgrounds only to login hero or empty-state banners; never on exam interface.",
    "Use secondary-brown for headings and icons where orange on white may fail AA.",
    "Keep spacing generous: use mt-6/mb-6 and gap-6 on desktop, gap-4 on mobile.",
    "Charts: prefer Recharts; use the provided ProgressChart scaffold and palette.",
    "For calendars (scheduling exams), use /components/ui/calendar.jsx only.",
    "Check focus-visible rings and keyboard navigation across all key pages."
  ]
}


General UI UX Design Guidelines  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."}]},