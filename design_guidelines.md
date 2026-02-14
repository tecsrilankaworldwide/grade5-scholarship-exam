{
  "meta": {
    "product": "Grade 5 Scholarship Examination Platform (Sri Lanka)",
    "audience": "Students ages 7–11, parents, teachers, administrators",
    "goals": [
      "Create playful yet official academic feel",
      "Improve readability and focus during exams",
      "Introduce subtle kid-friendly backgrounds and motifs",
      "Add consistent ~3cm (80–100px) left padding across pages"
    ],
    "brand_attributes": ["trustworthy", "motivating", "warm", "structured", "achievement-oriented"]
  },

  "color_system": {
    "palette_hex": {
      "primary": "#F59E0B",
      "primary-dark": "#D97706",
      "primary-soft": "#F6A317",
      "surface": "#FFFBF0",
      "surface-2": "#FFF7E5",
      "surface-3": "#FFF1CC",
      "ink": "#1F2937",
      "ink-soft": "#374151",
      "brown": "#92400E",
      "brown-soft": "#78350F",
      "success": "#16A34A",
      "warning": "#F59E0B",
      "error": "#DC2626",
      "ring": "#F59E0B",
      "chart-1": "#F6A317",
      "chart-2": "#F59E0B",
      "chart-3": "#D97706",
      "chart-4": "#FCD34D",
      "chart-5": "#92400E"
    },
    "css_tokens": {
      ":root": [
        "--brand-primary: 35 92% 51%",        
        "--brand-primary-dark: 35 92% 44%",
        "--brand-surface: 48 100% 97%",
        "--brand-surface-2: 45 100% 95%",
        "--brand-surface-3: 45 100% 90%",
        "--brand-ink: 215 28% 17%",
        "--brand-ink-soft: 215 19% 27%",
        "--brand-brown: 24 85% 32%",
        "--brand-brown-soft: 26 86% 27%",
        "--brand-ring: 35 92% 51%",
        "--layout-left-gutter: 96px" 
      ]
    },
    "usage": {
      "backgrounds": [
        "Use surface (#FFFBF0) as base app background",
        "Use surface-2 and surface-3 for section splits",
        "Keep primary (orange) for highlights, CTAs, charts, badges"
      ],
      "borders": "Use #F5E6B3 (hsl(45 70% 80%)) 1px for subtle separators",
      "gradients": [
        "Allowed only on section backgrounds or large hero bands; max 20% viewport",
        "Examples: linear-gradient(180deg, #FFF7E5 0%, #FFF1CC 60%, #FFE7A3 100%)",
        "Never apply gradients under dense text blocks or on small UI elements"
      ]
    }
  },

  "typography": {
    "fonts": {
      "heading": "Manrope",
      "body": "Figtree",
      "fallbacks": "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    },
    "google_import": "<link href=\"https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Manrope:wght@700;800&display=swap\" rel=\"stylesheet\">",
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl leading-tight",
      "h2": "text-base md:text-lg font-semibold",
      "body": "text-sm md:text-base",
      "small": "text-xs text-ink-soft"
    },
    "rules": [
      "Headings use Manrope 800 with brown (#92400E)",
      "Body uses Figtree 400–500 with ink (#1F2937)",
      "Avoid all-caps for long headings; Title Case preferred",
      "Line-height 1.5–1.6 for paragraphs"
    ]
  },

  "spacing_and_layout": {
    "left_padding_requirement": {
      "goal": "Introduce approximately 3cm (80–100px) left padding across all pages",
      "mobile_first": "Start with mobile px-4; scale up on larger screens",
      "tailwind_utilities": "container mx-auto px-4 sm:px-6 md:px-8 md:pl-20 lg:pl-24",
      "css_token": "--layout-left-gutter: 96px",
      "wrapper_example_jsx": "<main className=\"min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] container mx-auto px-4 sm:px-6 md:px-8 md:pl-20 lg:pl-24\" data-testid=\"page-main\">...</main>",
      "notes": [
        "Do not center the entire app container with text-align: center",
        "Ensure sticky sidebars respect the extra left padding"
      ]
    },
    "grid": {
      "dashboard": "grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6",
      "dashboard_zones": [
        "lg:col-span-8 for main content",
        "lg:col-span-4 for secondary column/widgets"
      ],
      "exam_interface": "max-w-5xl mx-auto grid gap-4 md:gap-6"
    }
  },

  "backgrounds_and_patterns": {
    "principles": [
      "Subtle, academic motifs (lined paper, dotted grid, stars, badges, books)",
      "Opacity 4%–10% to avoid distraction",
      "Place in section backgrounds, not inside cards/forms",
      "Prefer cream surfaces; avoid saturated/dark gradients"
    ],
    "css_utilities_to_add": {
      "index.css_additions": "@layer utilities {\n  .bg-lined-paper {\n    background-image: linear-gradient(to bottom, rgba(249, 202, 103, 0.18) 1px, transparent 1px);\n    background-size: 100% 28px;\n  }\n  .bg-dotted-grid {\n    background-image: radial-gradient(rgba(249, 202, 103, 0.20) 1px, transparent 1px);\n    background-size: 18px 18px;\n  }\n  .bg-stars-soft {\n    background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120' fill='none'><g fill='%23FCD34D' fill-opacity='0.18'><path d='M60 8l4 10 11 1-8 7 2 11-9-6-9 6 2-11-8-7 11-1 4-10z'/><circle cx='20' cy='20' r='2'/><circle cx='95' cy='40' r='2'/></g></svg>\");\n    background-size: 160px 160px;\n  }\n  .bg-badges-soft {\n    background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160' fill='none'><g stroke='%23F6A317' stroke-opacity='0.18' stroke-width='2'><circle cx='40' cy='40' r='14'/><path d='M36 28h8l2 8-6 4-6-4 2-8z'/></g></svg>\");\n    background-size: 200px 200px;\n  }\n  .noise-soft {\n    background-image: url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'220\\' height=\\'220\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.65\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.03\\'/></svg>');\n  }\n}"
    },
    "page_backgrounds": {
      "login": ["bg-dotted-grid noise-soft", "gradient: linear 180deg from #FFF7E5 to #FFE7A3 (<=20% viewport height)", "1–2 faint book icons via bg-badges-soft top-right"],
      "student_dashboard": ["bg-lined-paper", "use badges or stars in header strip only"],
      "teacher_admin_dashboard": ["solid surface (#FFFBF0) with subtle noise-soft", "no stars; keep academic tone"],
      "exam_interface": ["solid surface (#FFFBF0) only; optional 2px top border with #FCD34D", "no repeating patterns inside test view"],
      "results_and_certificates": ["bg-badges-soft on upper 30% header area only", "solid cream body for readability"]
    }
  },

  "buttons": {
    "style_family": "Professional / Corporate",
    "tokens": {
      "--btn-radius": "10px",
      "--btn-shadow": "0 1px 2px rgba(146,64,14,0.10)",
      "--btn-motion": "150ms ease-out"
    },
    "variants": {
      "primary": "bg-[#F59E0B] hover:bg-[#D97706] text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F59E0B]",
      "secondary": "bg-[#FFF7E5] hover:bg-[#FFF1CC] text-[#92400E] border border-[#F5E6B3]",
      "ghost": "bg-transparent hover:bg-[#FFF7E5] text-[#92400E]"
    },
    "sizes": {
      "sm": "h-9 px-3",
      "md": "h-10 px-4",
      "lg": "h-11 px-5"
    },
    "transition_rule": "Do NOT use transition: all. Use transition-colors, transition-shadow only. Movement/scale if needed via Framer Motion, not CSS transforms."
  },

  "components": {
    "use_shadcn": true,
    "paths": {
      "button": "/app/frontend/src/components/ui/button.jsx",
      "card": "/app/frontend/src/components/ui/card.jsx",
      "badge": "/app/frontend/src/components/ui/badge.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "table": "/app/frontend/src/components/ui/table.jsx",
      "progress": "/app/frontend/src/components/ui/progress.jsx",
      "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "calendar": "/app/frontend/src/components/ui/calendar.jsx",
      "select": "/app/frontend/src/components/ui/select.jsx",
      "input": "/app/frontend/src/components/ui/input.jsx",
      "textarea": "/app/frontend/src/components/ui/textarea.jsx",
      "switch": "/app/frontend/src/components/ui/switch.jsx",
      "sheet": "/app/frontend/src/components/ui/sheet.jsx",
      "menubar": "/app/frontend/src/components/ui/menubar.jsx",
      "navigation_menu": "/app/frontend/src/components/ui/navigation-menu.jsx",
      "sonner": "/app/frontend/src/components/ui/sonner.jsx"
    },
    "reusables": [
      {
        "name": "StatCard",
        "usage": "Student or admin KPIs",
        "base": "Card",
        "style": "bg-white/90 rounded-xl shadow-sm hover:shadow-md border border-[#F5E6B3]",
        "micro": "hover:shadow-md via transition-shadow duration-150 (no transform)"
      },
      {
        "name": "ExamCTA",
        "usage": "Start exam / Resume",
        "base": "Button",
        "style": "variant=primary size=lg w-full md:w-auto",
        "testid": "cta-start-exam-button"
      }
    ]
  },

  "page_specific_guidance": {
    "login": {
      "layout": "split on lg: content left, illustration right. Mobile single column.",
      "background": "bg-dotted-grid noise-soft with a 18–22% height warm gradient band behind the logo",
      "card": "max-w-md mx-auto bg-white shadow-sm border border-[#F5E6B3] rounded-xl p-6 md:p-8",
      "components": ["input", "button", "checkbox", "sonner"],
      "testids": [
        "login-form",
        "login-email-input",
        "login-password-input",
        "login-submit-button",
        "login-error-text"
      ]
    },
    "student_dashboard": {
      "layout": "container with md:pl-20 lg:pl-24; header strip with subtle stars, content on cream",
      "widgets": [
        "Progress ring or linear progress (use progress.jsx) for syllabus coverage",
        "Upcoming exams (card list)",
        "Badges (badge.jsx) for achievements"
      ],
      "charts": "Use Recharts with warm yellows/orange on white cards",
      "testids": [
        "student-dashboard-progress",
        "student-dashboard-upcoming-exams",
        "student-dashboard-badges"
      ]
    },
    "teacher_admin_dashboard": {
      "layout": "Two-column on lg with stat cards and recent activity table",
      "tone": "avoid playful stars; keep lined-paper or noise only",
      "testids": [
        "admin-dashboard-stats",
        "admin-dashboard-recent-activity-table",
        "admin-dashboard-create-exam-button"
      ]
    },
    "exam_interface": {
      "focus_mode": true,
      "background": "solid #FFFBF0 only. No patterns behind the question area.",
      "header": "thin top bar: left shows paper title, center shows question x/total, right shows subtle timer",
      "nav": "Previous, Next, Flag Question buttons only. Ghost style for Flag.",
      "question_card": "bg-white border border-[#F5E6B3] rounded-xl p-5 md:p-6 shadow-sm",
      "testids": [
        "exam-timer",
        "exam-progress-text",
        "exam-question-card",
        "exam-nav-prev-button",
        "exam-nav-next-button",
        "exam-flag-button",
        "exam-submit-button"
      ]
    },
    "results_and_certificates": {
      "header_band": "bg-badges-soft over surface-2; include a medal/badge icon (lucide-react)",
      "cards": "white paper-like cards with slight texture border",
      "actions": "Download PDF, Share (admin) using primary/secondary buttons",
      "testids": [
        "results-summary-card",
        "results-breakdown-table",
        "certificate-download-button"
      ]
    }
  },

  "micro_interactions_and_motion": {
    "rules": [
      "No transition: all anywhere",
      "Transitional properties limited to colors, shadows, opacity",
      "Use Framer Motion for entrance and minor position transitions (not CSS transform transitions)",
      "Keep animations under 200–250ms for focus contexts (exams)"
    ],
    "examples": {
      "framer_install": "npm i framer-motion",
      "easing": "{ duration: 0.18, ease: 'easeOut' }",
      "card_enter_jsx": "import { motion } from 'framer-motion';\n<motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.2, ease:'easeOut'}} data-testid=\"stat-card\">...</motion.div>",
      "parallax_header_hint": "Apply subtle translateY via framer on scroll for header stars only on non-exam pages"
    }
  },

  "charts_and_data_viz": {
    "lib": "Recharts",
    "install": "npm i recharts",
    "palette": ["#F6A317", "#F59E0B", "#D97706", "#FCD34D", "#92400E"],
    "rules": [
      "Avoid heavy gradients; use flat fills",
      "Axis labels in #374151, gridlines in rgba(146,64,14,0.12)",
      "Minimum 12px labels for readability"
    ],
    "snippet": "import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';\n<ResponsiveContainer width=\"100%\" height={180} data-testid=\"student-progress-chart\">\n  <AreaChart data={data}>\n    <defs>\n      <linearGradient id=\"fillPrimary\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n        <stop offset=\"0%\" stopColor=\"#F59E0B\" stopOpacity={0.35} />\n        <stop offset=\"100%\" stopColor=\"#F59E0B\" stopOpacity={0.06} />\n      </linearGradient>\n    </defs>\n    <XAxis dataKey=\"label\" stroke=\"#9CA3AF\" />\n    <YAxis stroke=\"#9CA3AF\" />\n    <Tooltip contentStyle={{ borderRadius: 10, borderColor: '#F5E6B3' }} />\n    <Area type=\"monotone\" dataKey=\"value\" stroke=\"#D97706\" fill=\"url(#fillPrimary)\" />\n  </AreaChart>\n</ResponsiveContainer>"
  },

  "accessibility_and_testing": {
    "contrast": "Maintain WCAG AA: dark text on cream, white text on primary buttons",
    "focus": "Use ring-[#F59E0B] with ring-offset-2; ensure keyboard navigation for exam controls",
    "localization": "Prepare for Sinhala, Tamil, English labels; avoid text baked into images",
    "readability": "Min 14px body on md+; 16px for inputs",
    "testing_ids": {
      "convention": "kebab-case describing role, stable across refactors",
      "apply_to": ["buttons", "links", "inputs", "menus", "critical info texts"],
      "examples": [
        "login-form", "login-form-submit-button", "exam-question-card", "exam-progress-text", "admin-dashboard-create-exam-button"
      ]
    }
  },

  "code_scaffolds": {
    "imports": {
      "icons": "npm i lucide-react",
      "usage": "import { Medal, Star, BookOpen } from 'lucide-react'"
    },
    "layout_wrapper_jsx": "export default function PageWrapper({ children }) {\n  return (\n    <div className=\"min-h-screen bg-[#FFFBF0] text-[#1F2937] container mx-auto px-4 sm:px-6 md:px-8 md:pl-20 lg:pl-24\" data-testid=\"page-wrapper\">\n      {children}\n    </div>\n  );\n}",
    "exam_header_jsx": "<header className=\"sticky top-0 z-30 bg-[#FFFBF0] border-b border-[#F5E6B3]\" data-testid=\"exam-header\">\n  <div className=\"container mx-auto px-4 sm:px-6 md:px-8 md:pl-20 lg:pl-24 h-14 flex items-center justify-between\">\n    <div className=\"text-[#92400E] font-extrabold\" data-testid=\"paper-title\">Grade 5 Scholarship</div>\n    <div className=\"text-sm\" data-testid=\"exam-progress-text\">Q 5/50</div>\n    <div className=\"text-sm font-semibold text-[#92400E]\" data-testid=\"exam-timer\">59:12</div>\n  </div>\n</header>",
    "button_usage_jsx": "import { Button } from './components/ui/button';\n<Button data-testid=\"exam-nav-next-button\" className=\"bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-[10px] transition-colors\">Next</Button>",
    "sonner_usage_jsx": "import { Toaster } from './components/ui/sonner';\n<Toaster position=\"top-right\" />"
  },

  "image_urls": [
    {
      "category": "login-hero-accent",
      "description": "Yellow tiled geometric surface for subtle academic vibe",
      "url": "https://images.unsplash.com/photo-1745878716659-dcf15b0dfe1f?crop=entropy&cs=srgb&fm=jpg&q=85"
    },
    {
      "category": "dashboard-sidebar-motif",
      "description": "Row of yellow lockers (crop to small sidebar banner)",
      "url": "https://images.unsplash.com/photo-1723829096089-3e7576131e34?crop=entropy&cs=srgb&fm=jpg&q=85"
    },
    {
      "category": "exam-hero-safety",
      "description": "Sharpened #2 pencils on wood for pre-exam landing (use small accent only)",
      "url": "https://images.unsplash.com/photo-1599081595468-de614fc93694?crop=entropy&cs=srgb&fm=jpg&q=85"
    },
    {
      "category": "paper-texture-cards",
      "description": "Warm cream subtle paper texture; apply softly to certificate header",
      "url": "https://images.unsplash.com/photo-1693592401248-c9544518318a?crop=entropy&cs=srgb&fm=jpg&q=85"
    }
  ],

  "web_inspiration": {
    "search_notes": [
      "Behance kids dashboards show warm tones, rounded cards, progress widgets",
      "Minimalist exam UIs emphasize linear progress, subtle timers, essential controls only"
    ],
    "citations": [
      "https://www.behance.net/search/projects/kids%20dashboard?locale=en_US",
      "https://dribbble.com/search/kids-education-dashboard",
      "https://www.nngroup.com/articles/characteristics-minimalism/"
    ]
  },

  "refactoring_notes": {
    "app_css_compliance": [
      "Replace button { transition: all 0.3s ease } with .btn { transition-property: background-color, color, box-shadow, border-color; transition-duration: 150ms; }",
      "Remove transform-based hover from buttons/cards; use shadow/color changes instead or Framer Motion for movement"
    ],
    "containers": [
      "Apply md:pl-20 lg:pl-24 to all major page containers to satisfy the 3cm left padding request"
    ]
  },

  "instructions_to_main_agent": [
    "Add Google Fonts import for Manrope and Figtree in public/index.html head",
    "Append utilities from backgrounds_and_patterns.css_utilities_to_add into src/index.css under @layer utilities",
    "Wrap all pages with container mx-auto px-4 sm:px-6 md:px-8 md:pl-20 lg:pl-24",
    "Use shadcn/ui components from the specified .jsx paths only",
    "All interactive/critical elements must have a data-testid attribute (kebab-case role names)",
    "Keep gradients light and in section bands only; never exceed 20% viewport; fall back to solid colors otherwise",
    "Use Recharts for dashboard stats; Sonner for toasts; Framer Motion for entrances (no CSS transform transitions)",
    "On exam pages, disable decorative backgrounds; show solid cream with slim border and clear hierarchy"
  ]
}


<General UI UX Design Guidelines>  
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

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>