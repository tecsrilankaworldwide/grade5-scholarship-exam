{
  "brand": {
    "name": "Examination Evaluation Bureau – Grade 5 Scholarship Platform",
    "attributes": ["official", "trustworthy", "calm focus", "parent-friendly", "teacher-efficient"],
    "tone": "Warm academic with amber/gold accents and light parchment surfaces. Professional, government-grade clarity."
  },
  "typography": {
    "families": {
      "headings": "Manrope",
      "body": "Figtree",
      "mono": "Roboto Mono"
    },
    "load_fonts": {
      "html_head_links": [
        "<link href=\"https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap\" rel=\"stylesheet\" />"
      ],
      "css_overrides": "@layer base { h1, h2, h3, h4, h5, h6 { font-family: 'Manrope', ui-sans-serif, system-ui, -apple-system; font-weight: 800; } body { font-family: 'Figtree', ui-sans-serif, system-ui, -apple-system; } }"
    },
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight",
      "h2": "text-xl md:text-2xl font-semibold tracking-tight",
      "h3": "text-lg md:text-xl font-semibold",
      "body": "text-base md:text-[17px] leading-7",
      "small": "text-sm leading-6",
      "code": "text-sm font-mono"
    }
  },
  "color_system": {
    "keep_existing_palette": true,
    "notes": "Preserve warm academic palette: parchment backgrounds from #FFFBF0–#FFF4E6, amber/gold primary #F59E0B. Prefer solid surfaces for reading areas.",
    "tokens_hsl": {
      "--brand-primary": "35 92% 51%",
      "--brand-primary-dark": "35 92% 44%",
      "--brand-surface": "48 100% 97%",
      "--brand-surface-2": "45 100% 95%",
      "--brand-surface-3": "45 100% 90%",
      "--brand-ink": "215 28% 17%",
      "--brand-ink-soft": "215 19% 27%",
      "--brand-brown": "24 85% 32%",
      "--brand-brown-soft": "26 86% 27%",
      "--ring": "35 92% 51%",
      "--border": "45 70% 80%"
    },
    "chart_palette": {
      "line": ["hsl(38 94% 54%)", "hsl(35 92% 51%)", "hsl(35 92% 44%)"],
      "radar": ["hsl(35 92% 51%)", "hsl(24 85% 32%)", "hsl(45 94% 85%)"],
      "grid": "hsl(45 70% 80% / 0.42)",
      "axis": "hsl(215 19% 27%)",
      "tooltip_bg": "#fff",
      "tooltip_text": "#111827"
    },
    "gradients_and_textures": {
      "allowed": [
        "Section headers/hero strips (max-height: 20vh)",
        "Wide decorative bands between sections",
        "Large CTA background only (not the text)"
      ],
      "restriction_rule": {
        "never": [
          "dark/saturated purple/pink/blue/green combos",
          "gradients on text-heavy content",
          "gradients on small UI elements (<100px)",
          "more than 20% of viewport"
        ],
        "enforcement": "If any gradient area exceeds 20% of the viewport or hurts readability, replace with solid --brand-surface and retain subtle .noise-soft texture."
      },
      "examples": {
        "soft_amber_band": "bg-[radial-gradient(80%_120%_at_50%_0%,_rgba(246,163,23,0.10),_rgba(255,255,255,0))]",
        "header_strip": "from-[#FFFBF0] via-[#FFF6EA] to-[#FFF4E6]"
      }
    }
  },
  "css_tokens_and_overrides": {
    "add_to_index_css": "@layer base { :root { --radius: 12px; } }",
    "utilities": [
      ".reading-prose: max-w-[72ch] text-[15.5px] leading-7 text-[hsl(var(--foreground))]",
      ".section-pad: py-10 md:py-16",
      ".elev-1: shadow-[0_6px_20px_rgba(249,168,38,0.08)]",
      ".elev-2: shadow-[0_14px_42px_rgba(249,168,38,0.14)]"
    ],
    "focus_state": "Use focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
    "buttons": {
      "shape": "rounded-[10px]",
      "variants": {
        "primary": "bg-[hsl(var(--brand-primary))] text-white hover:bg-[hsl(var(--brand-primary-dark))]",
        "secondary": "bg-[hsl(var(--brand-surface-2))] text-[hsl(var(--brand-ink))] hover:bg-[hsl(var(--brand-surface-3))]",
        "ghost": "bg-transparent hover:bg-[hsl(var(--brand-surface-2)/0.6)]"
      },
      "motion": "transition-colors duration-200 ease-out focus-visible:scale-[.99] data-[state=open]:translate-y-px"
    }
  },
  "css_audit_and_fixes": {
    "issues_found": [
      "App.css overrides fonts to Inter/Nunito; conflicts with product fonts (Manrope/Figtree).",
      "Universal transitions used (transition: all) on buttons and card-hover, violating best practice.",
      "index.css @layer utilities has an unclosed .noise-soft block, causing nested rules to be invalid and possibly dropped.",
      "Duplicate spinner styles defined in App.css and index.css; unify to one utility.",
      "Hard-coded body background in App.css conflicts with Tailwind tokens."
    ],
    "patches": [
      {
        "file": "/app/frontend/src/App.css",
        "replace": {
          "from": "body {\n  font-family: 'Inter', 'Segoe UI', sans-serif;\n  background: #FFFBF0;\n  color: #1F2937;\n  line-height: 1.6;\n}",
          "to": "body {\n  font-family: 'Figtree', ui-sans-serif, -apple-system, system-ui;\n  color: #1F2937;\n  line-height: 1.6;\n} /* Background now driven by Tailwind tokens (bg-background) */"
        }
      },
      {
        "file": "/app/frontend/src/App.css",
        "replace": {
          "from": "h1, h2, h3, h4, h5, h6 {\n  font-family: 'Nunito', sans-serif;\n  font-weight: 800;\n  color: #92400E;\n}",
          "to": "h1, h2, h3, h4, h5, h6 {\n  font-family: 'Manrope', ui-sans-serif, system-ui;\n  font-weight: 800;\n  color: #92400E;\n}"
        }
      },
      {
        "file": "/app/frontend/src/App.css",
        "replace": {
          "from": "button {\n  transition: all 0.3s ease;\n}",
          "to": "button {\n  transition: background-color .2s ease, color .2s ease, box-shadow .2s ease;\n}"
        }
      },
      {
        "file": "/app/frontend/src/App.css",
        "replace": {
          "from": ".card-hover {\n  transition: all 0.3s ease;\n}",
          "to": ".card-hover {\n  transition: transform .25s ease, box-shadow .25s ease;\n}"
        }
      },
      {
        "file": "/app/frontend/src/App.css",
        "replace": {
          "from": "*:focus-visible {\n  outline: 3px solid var(--primary-yellow);\n  outline-offset: 2px;\n}",
          "to": "*:focus-visible {\n  outline: 3px solid hsl(var(--ring));\n  outline-offset: 2px;\n}"
        }
      },
      {
        "file": "/app/frontend/src/index.css",
        "description": "Close .noise-soft rule and keep spinner utilities valid. Also ensure one spinner variant only.",
        "replace": {
          "from": ".noise-soft {\n    background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"220\" height=\"220\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.03\"/></svg>');\n\n  /* Spinner animations */\n  @keyframes spin {\n    to { transform: rotate(360deg); }\n  }\n\n  .spinner {\n    border: 4px solid rgba(246, 163, 23, 0.3);\n    border-top-color: #F6A317;\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    animation: spin 0.6s linear infinite;\n  }\n\n  .spinner-small {\n    border: 3px solid rgba(255, 255, 255, 0.3);\n    border-top-color: #ffffff;\n    border-radius: 50%;\n    width: 20px;\n    height: 20px;\n    animation: spin 0.6s linear infinite;\n    display: inline-block;\n  }\n\n  }",
          "to": ".noise-soft {\n    background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"220\" height=\"220\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.03\"/></svg>');\n}\n\n/* Spinner animations */\n@keyframes spin { to { transform: rotate(360deg); } }\n\n.spinner {\n  border: 4px solid rgba(246, 163, 23, 0.3);\n  border-top-color: #F6A317;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: spin 0.6s linear infinite;\n}"
        }
      },
      {
        "file": "/app/frontend/src/App.css",
        "description": "Remove duplicate spinner from App.css to avoid conflicts.",
        "suggestion": "Delete .spinner and @keyframes spin from App.css and rely on index.css utilities."
      }
    ]
  },
  "layouts": {
    "student_exam_interface": {
      "principles": [
        "Distraction-free: hide global nav, show slim header with exam title, time, language.",
        "Clear question area with generous spacing and readable options.",
        "Persistent timer + Submit CTA fixed on mobile."
      ],
      "jsx_skeleton": "import { Button } from './components/ui/button';\nimport { ScrollArea } from './components/ui/scroll-area';\nimport { RadioGroup, RadioGroupItem } from './components/ui/radio-group';\nimport { Checkbox } from './components/ui/checkbox';\nimport { Separator } from './components/ui/separator';\n\nexport default function ExamPage() {\n  return (\n    <div className=\"min-h-screen bg-background text-foreground\">\n      <header className=\"sticky top-0 z-40 border-b bg-[hsl(var(--brand-surface))] supports-[backdrop-filter]:bg-[hsl(var(--brand-surface)/0.9)]/80 backdrop-blur\">\n        <div className=\"mx-auto max-w-6xl px-4 py-3 flex items-center gap-3\">\n          <div className=\"text-sm text-[hsl(var(--brand-brown))]\" data-testid=\"exam-title\">Grade 5 Scholarship – Paper 1</div>\n          <div className=\"ml-auto flex items-center gap-3\">\n            <span className=\"inline-flex items-center gap-2 rounded-full bg-[hsl(var(--brand-surface-2))] px-3 py-1 text-sm font-semibold text-[hsl(var(--brand-brown))]\" data-testid=\"exam-timer\">⏱ 59:12</span>\n            <Button className=\"\" data-testid=\"exit-exam-button\" variant=\"ghost\">Exit</Button>\n          </div>\n        </div>\n      </header>\n\n      <main className=\"mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 py-6 section-pad\">\n        <section className=\"bg-card rounded-xl p-5 md:p-7 elev-1\">\n          <div className=\"text-sm text-muted-foreground mb-2\" data-testid=\"question-progress\">Question 12 of 60</div>\n          <h1 className=\"text-2xl md:text-3xl font-extrabold text-[hsl(var(--brand-brown))] mb-4\" data-testid=\"question-stem\">What is 24 ÷ 6 ?</h1>\n          <RadioGroup className=\"space-y-3\" data-testid=\"mcq-options\">\n            {[4,6,8,12].map((choice,i)=> (\n              <label key={i} className=\"flex items-center gap-3 rounded-lg border p-3 hover:bg-[hsl(var(--brand-surface-2))] cursor-pointer transition-colors\">\n                <RadioGroupItem value={String(choice)} id=\"opt-\" />\n                <span className=\"text-base\">{choice}</span>\n              </label>\n            ))}\n          </RadioGroup>\n          <Separator className=\"my-6\" />\n          <div className=\"flex items-center justify-between\">\n            <Button variant=\"secondary\" data-testid=\"prev-question-button\">Previous</Button>\n            <div className=\"flex gap-3\">\n              <Button variant=\"ghost\" data-testid=\"flag-question-button\">Flag</Button>\n              <Button className=\"\" data-testid=\"next-question-button\">Next</Button>\n            </div>\n          </div>\n        </section>\n\n        <aside className=\"lg:sticky lg:top-16 bg-card rounded-xl p-4 elev-1\">\n          <div className=\"text-sm font-semibold mb-3 text-[hsl(var(--brand-brown))]\">Question Navigator</div>\n          <ScrollArea className=\"h-[60vh]\">\n            <div className=\"grid grid-cols-6 gap-2\" data-testid=\"question-navigator\">\n              {Array.from({length:60}).map((_,i)=> (\n                <Button key={i} variant=\"secondary\" size=\"sm\" data-testid=\"nav-q-button\">{i+1}</Button>\n              ))}\n            </div>\n          </ScrollArea>\n          <div className=\"mt-4\">\n            <Button className=\"w-full\" data-testid=\"submit-exam-button\">Submit Exam</Button>\n          </div>\n        </aside>\n      </main>\n    </div>\n  )\n}"
    },
    "teacher_dashboard": {
      "skeleton": "import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';\nimport { Button } from './components/ui/button';\nexport default function TeacherDashboard() {\n  return (\n    <div className=\"mx-auto max-w-6xl px-4 py-8 space-y-6\">\n      <Tabs defaultValue=\"exams\" className=\"space-y-6\">\n        <TabsList data-testid=\"teacher-tabs\">\n          <TabsTrigger value=\"exams\">Exams</TabsTrigger>\n          <TabsTrigger value=\"paper2\">Paper 2 Marking</TabsTrigger>\n          <TabsTrigger value=\"published\">Published</TabsTrigger>\n        </TabsList>\n        <TabsContent value=\"exams\">\n          <div className=\"flex justify-between items-center\">\n            <h2 className=\"text-xl font-bold\">Your Exams</h2>\n            <Button data-testid=\"create-exam-button\">Create Exam</Button>\n          </div>\n          {/* List/Table here using shadcn Table */}\n        </TabsContent>\n        <TabsContent value=\"paper2\">{/* Marking UI */}</TabsContent>\n        <TabsContent value=\"published\">{/* Published list */}</TabsContent>\n      </Tabs>\n    </div>\n  )\n}"
    },
    "parent_dashboard": {
      "principles": ["Plain-language labels, large legends, clear tooltips, summary first then detail."],
      "chart_styles": {
        "container": "bg-card rounded-xl p-5 elev-1",
        "line_chart_props": {
          "strokeWidth": 3,
          "dotRadius": 3,
          "activeDot": { "r": 5 }
        },
        "radar_opacity": 0.28
      },
      "recharts_snippet": "import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';\n\nconst colors = { line1: 'hsl(38 94% 54%)', line2: 'hsl(35 92% 51%)', grid: 'hsl(45 70% 80% / 0.42)', axis: 'hsl(215 19% 27%)' };\n\nexport function MonthlyProgress({ data }) {\n  return (\n    <div className=\"bg-card rounded-xl p-5 elev-1\" data-testid=\"monthly-progress-card\">\n      <h3 className=\"text-lg font-semibold mb-4\">Monthly Progress</h3>\n      <ResponsiveContainer width=\"100%\" height={280}>\n        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>\n          <CartesianGrid stroke={colors.grid} vertical={false} />\n          <XAxis dataKey=\"month\" stroke={colors.axis} tick={{ fontSize: 12 }} />\n          <YAxis stroke={colors.axis} domain={[0, 100]} tick={{ fontSize: 12 }} />\n          <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EEE' }} />\n          <Legend wrapperStyle={{ paddingTop: 8 }} />\n          <Line type=\"monotone\" dataKey=\"score\" stroke={colors.line1} strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />\n        </LineChart>\n      </ResponsiveContainer>\n    </div>\n  );\n}\n\nexport function SkillRadar({ data }) {\n  return (\n    <div className=\"bg-card rounded-xl p-5 elev-1\" data-testid=\"skill-radar-card\">\n      <h3 className=\"text-lg font-semibold mb-4\">Skill Profile</h3>\n      <ResponsiveContainer width=\"100%\" height={320}>\n        <RadarChart cx=\"50%\" cy=\"50%\" outerRadius=\"80%\" data={data}>\n          <PolarGrid stroke=\"hsl(45 70% 80% / 0.42)\" />\n          <PolarAngleAxis dataKey=\"skill\" tick={{ fontSize: 12, fill: 'hsl(215 19% 27%)' }} />\n          <PolarRadiusAxis angle={30} domain={[0, 100]} />\n          <Radar name=\"Score\" dataKey=\"value\" stroke=\"hsl(35 92% 51%)\" fill=\"hsl(35 92% 51%)\" fillOpacity={0.28} />\n        </RadarChart>\n      </ResponsiveContainer>\n    </div>\n  );\n}"
    }
  },
  "components": {
    "paths": {
      "button": "./components/ui/button",
      "badge": "./components/ui/badge",
      "tabs": "./components/ui/tabs",
      "table": "./components/ui/table",
      "dialog": "./components/ui/dialog",
      "alert_dialog": "./components/ui/alert-dialog",
      "dropdown_menu": "./components/ui/dropdown-menu",
      "select": "./components/ui/select",
      "popover": "./components/ui/popover",
      "scroll_area": "./components/ui/scroll-area",
      "radio_group": "./components/ui/radio-group",
      "checkbox": "./components/ui/checkbox",
      "switch": "./components/ui/switch",
      "separator": "./components/ui/separator",
      "tooltip": "./components/ui/tooltip",
      "sonner": "./components/ui/sonner"
    },
    "usage_notes": [
      "Always import from existing shadcn/ui .jsx components. Do not use native HTML dropdowns/menus.",
      "Include data-testid on all interactive and key informational elements.",
      "Use Button variants defined by tokens above (primary, secondary, ghost)."
    ],
    "micro_interactions": {
      "button": "hover:translate-y-[-1px] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
      "card": "transition-[transform,box-shadow] duration-200 hover:shadow-[0_20px_40px_rgba(245,158,11,0.14)] hover:-translate-y-[2px]",
      "nav_link": "underline-offset-4 hover:underline focus-visible:ring-2"
    }
  },
  "accessibility_and_testing": {
    "wcag": "AA contrast minimum. Use text-[hsl(var(--brand-ink))] on light surfaces.",
    "keyboard": ["All focusable elements must have visible focus ring using --ring.", "Ensure Skip to content in exam pages is hidden during exam but available before starting."],
    "i18n": "Language switch via DropdownMenu with Sr-only current language label.",
    "data_testid_convention": {
      "rule": "kebab-case focusing on role (not appearance)",
      "examples": [
        "data-testid=\"exam-timer\"",
        "data-testid=\"submit-exam-button\"",
        "data-testid=\"question-navigator\"",
        "data-testid=\"teacher-tabs\"",
        "data-testid=\"monthly-progress-card\"",
        "data-testid=\"skill-radar-card\""
      ]
    }
  },
  "multi_language": {
    "component": "dropdown_menu",
    "sketch": "<DropdownMenu> <DropdownMenuTrigger asChild><Button variant='secondary' data-testid='language-switcher'>Language</Button></DropdownMenuTrigger> <DropdownMenuContent align='end'> <DropdownMenuItem data-testid='lang-si'>සිංහල</DropdownMenuItem> <DropdownMenuItem data-testid='lang-ta'>தமிழ்</DropdownMenuItem> <DropdownMenuItem data-testid='lang-en'>English</DropdownMenuItem> </DropdownMenuContent></DropdownMenu>",
    "notes": "Reflect chosen language in html[lang] attribute for screen readers."
  },
  "charts": {
    "recharts": {
      "install": "npm install recharts",
      "shared_props": {
        "ResponsiveContainer": true,
        "CartesianGrid.stroke": "hsl(45 70% 80% / 0.42)",
        "Axis.stroke": "hsl(215 19% 27%)",
        "Tooltip.contentStyle": { "background": "#fff", "border": "1px solid #EEE", "borderRadius": "10px" }
      },
      "empty_states": {
        "pattern": "Use shadcn/skeleton + a short helper copy, keep height consistent.",
        "example": "<div className='bg-card rounded-xl p-5 elev-1'> <div className='h-[280px] grid place-items-center text-muted-foreground' data-testid='chart-empty'>No data for this period</div></div>"
      }
    }
  },
  "images_and_illustration": {
    "style": "Real classroom textures and sunlight shots; avoid cartoonish imagery. Low-saturation warm tones.",
    "image_urls": [
      {
        "url": "https://images.unsplash.com/photo-1637777292536-27a13272dbea?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Warm sunlight on a wooden desk (minimal academic mood)",
        "category": "hero-strip/headers"
      },
      {
        "url": "https://images.unsplash.com/photo-1582202602267-840d332d9530?crop=entropy&cs=srgb&fm=jpg&q=85",
        "description": "Laptop on classroom desk by window – for parent/teacher dashboards",
        "category": "dashboard empty/intro"
      },
      {
        "url": "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg",
        "description": "Apple and stationery on notebook – use in marketing/about",
        "category": "marketing/about section"
      }
    ]
  },
  "grids_and_spacing": {
    "container": "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
    "grid_patterns": [
      "Dashboard: grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8",
      "Sidebar layout: grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8",
      "Cards in 2-up: grid grid-cols-1 md:grid-cols-2 gap-6"
    ],
    "spacing": "Use 2–3x comfortable spacing. Section padding: py-10 md:py-16; Card padding: p-5 md:p-7"
  },
  "motion": {
    "library": {
      "optional": true,
      "name": "framer-motion",
      "install": "npm i framer-motion",
      "usage": "Use for subtle entrance animations only (staggered cards, fade-up). Do not animate large reading blocks."
    },
    "principles": [
      "No universal transitions (avoid transition: all).",
      "Entrance: fade/translate-y-8 with 200–300ms and 40ms stagger.",
      "Hover: tiny translateY(-1px) or shadow elevation.",
      "Focus: ring motion only (no position jump)."
    ]
  },
  "page_specific_polish": {
    "student": [
      "Enable focus mode: hide app nav; keep header 56–64px high with timer and title.",
      "Question spacing: at least 16px between options; option hit-area 44px height min.",
      "Autosave state text at bottom-left: small, muted, non-intrusive."
    ],
    "teacher": [
      "Use Tabs for creation/marking/published; keep consistent card padding and table density.",
      "Use Dialog for publish confirmation with explicit consequences copy."] ,
    "parent": [
      "Show 2–3 KPI cards (avg score, attendance, last exam) before charts.",
      "Charts: strong legends and explicit units (%)."
    ],
    "admin": [
      "Tables with sticky header, row hover bg-[hsl(var(--brand-surface-2))], and visible sort icons."] ,
    "typesetter": [
      "Upload area: dashed border, subtle noise background, show language tags as Badge components."]
  },
  "non_functional_requirements": {
    "performance": "Defer decorative images; use loading='lazy'.",
    "readability": "Max line width ~72ch; avoid long unbroken paragraphs.",
    "consistency": "Use shadcn components first before creating new ones."
  },
  "instructions_to_main_agent": [
    "Apply the CSS patches in css_audit_and_fixes.patches exactly (update App.css and index.css).",
    "Ensure Google Fonts are loaded and base font utilities are applied.",
    "Refactor buttons to use token-based variants; remove any 'transition: all' styles.",
    "Ensure every interactive and key informational element includes data-testid as per the convention.",
    "Constrain gradients to decorative sections only; keep reading areas solid with optional .noise-soft texture.",
    "Adopt the provided JSX skeletons (in .js files) for Student, Teacher, Parent pages and adjust to live data.",
    "Prefer existing components in ./components/ui; do not introduce raw HTML controls for menus, selects, toasts, or calendar.",
    "Run ESLint after changes and verify no CSS syntax errors (especially the utilities layer fix)."
  ],
  "component_path": {
    "primary_source": "./components/ui/*",
    "notes": "All shadcn components are present as .jsx. Keep named exports for components and default exports for pages (functions in .js)."
  },
  "general_guidelines_appendix": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n	- Prioritize using pre-existing components from src/components/ui when applicable\n	- Create new components that match the style and conventions of existing components when needed\n	- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n	- Use Shadcn/UI as the primary component library for consistency and accessibility\n	- Import path: ./components/[component-name]\n\n**Export Conventions:**\n	- Components MUST use named exports (export const ComponentName = ...)\n	- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
