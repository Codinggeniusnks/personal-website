export interface ProjectMetric {
  label: string;
  value: string;
  context: string;
  highlight?: boolean;
}

export interface ArchitectureLayer {
  layer: string;
  title: string;
  components: string[];
  description: string;
}

export interface CaseStudySections {
  overview: string[];
  problem: string[];
  whyItMatters: string[];
  usersStakeholders: {
    group: string;
    needs: string;
  }[];
  constraints: string[];
  researchData: {
    source: string;
    role: string;
    details: string;
  }[];
  approach: string[];
  architectureSummary: string;
  architectureLayers: ArchitectureLayer[];
  aiMlMethodology: {
    title: string;
    points: string[];
  }[];
  implementation: {
    area: string;
    details: string;
  }[];
  interfaceDesign: string[];
  results: {
    summary: string;
    metrics: ProjectMetric[];
  };
  impact: string[];
  limitations: string[];
  lessonsLearned: string[];
  nextSteps: string[];
}

export interface ProjectData {
  id: string;
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  categories: string[];
  role: string;
  year: string;
  contextBadge: string;
  awards: string[];
  sdgAlignment?: string;
  technologies: string[];
  hardware?: string[];
  problemSummary: string;
  keyResultSummary: string;
  headlineMetrics: ProjectMetric[];
  caseStudy: CaseStudySections;
}

export const projectsData: ProjectData[] = [
  {
    id: "cardioxy-pro",
    number: "01",
    slug: "cardioxy-pro",
    title: "CardiOxy Pro",
    subtitle: "Predictive AI Early-Warning & Fault-Tolerant IoT Vital Monitoring System",
    tagline:
      "Dual-tier physiological telemetry combining predictive trend detection, deterministic emergency thresholds, and ESP-NOW offline resilience for high-risk patients.",
    categories: [
      "AI Healthcare",
      "IoT Systems",
      "Predictive Monitoring",
      "Remote Telemetry",
    ],
    role: "Lead AI & Embedded Systems Architect",
    year: "2024 – 2026",
    contextBadge: "2× International Gold & Best AI Tech Award",
    awards: [
      "Borneo International Innovation & Creativity Competition (BIICC) 2026 — Best AI Technology Award",
      "Borneo International Innovation & Creativity Competition (BIICC) 2026 — Gold Award",
      "International Science and Innovation Competition (ISIC-WOU24) — Gold Award",
    ],
    technologies: [
      "Predictive Trend AI",
      "C++ / Arduino Firmware",
      "ESP-NOW Mesh",
      "ESP32 & Wemos D1 R1",
      "MAX30102 / MAX30105 PPG",
      "Telegram Bot API",
      "Google Sheets Cloud Sync",
      "Real-Time Dashboard",
    ],
    hardware: [
      "MAX30102 / MAX30105 Pulse Oximeter & Heart-Rate Sensor",
      "SSD1306 OLED Local Display",
      "ESP32 Dual-Core Microcontroller",
      "Wemos D1 R1 Wi-Fi Board",
      "Arduino UNO Controller",
      "MicroSD Card Storage Module",
      "DS1302 Real-Time Clock (RTC) Module",
    ],
    problemSummary:
      "Conventional home pulse oximeters only react after a patient crosses a critical threshold and fail silently when household Wi-Fi drops, leaving elderly and chronic cardiopulmonary patients vulnerable during gradual physiological deterioration.",
    keyResultSummary:
      "Engineered a tri-mode (Manual, Online, Offline) wearable and bedside telemetry system that distinguishes AI-detected pre-threshold deterioration from immediate threshold breaches (HR > 100 bpm, HR < 60 bpm, SpO₂ < 90%) while guaranteeing zero data loss via ESP-NOW and RTC-timestamped SD logging.",
    headlineMetrics: [
      {
        label: "Safety Thresholds",
        value: "HR 60–100 · SpO₂ ≥90%",
        context: "Hard deterministic guardrails paired with pre-threshold AI trajectory warning",
        highlight: true,
      },
      {
        label: "Operational Modes",
        value: "3 Modes",
        context: "Manual local check, Online cloud/Telegram/call escalation, Offline ESP-NOW + SD",
      },
      {
        label: "Offline Continuity",
        value: "100% Local Mesh",
        context: "ESP-NOW peer-to-peer link + DS1302 RTC timestamped SD backup without Wi-Fi",
      },
      {
        label: "Recognition",
        value: "2× Gold + Best AI",
        context: "ISIC-WOU24 Gold & BIICC 2026 Best AI Technology + Gold Award",
        highlight: true,
      },
    ],
    caseStudy: {
      overview: [
        "CardiOxy Pro is an intelligent physiological monitoring and early-warning system engineered for elderly individuals, chronic cardiopulmonary patients, and high-risk home-care environments.",
        "Unlike consumer pulse oximeters that display isolated instantaneous numbers or cloud-only wearables that become inert during internet outages, CardiOxy Pro integrates optical photoplethysmography (MAX30102/MAX30105), multi-node microcontroller orchestration (ESP32, Wemos D1 R1, Arduino UNO), predictive trend analysis, and multi-channel emergency dispatch.",
      ],
      problem: [
        "Clinical deterioration in chronic and elderly patients rarely happens as an instantaneous step function. Hypoxemia (falling SpO₂) and tachycardia/bradycardia often exhibit subtle, progressive drift over minutes or hours before crossing an acute crisis boundary.",
        "Standard threshold-only monitors suffer from two fatal flaws: (1) they remain silent during steady downward physiological drift until the patient is already in acute distress, and (2) when deployed in rural or unstable residential networks, Wi-Fi dropouts sever cloud alerting and erase historical vitals.",
      ],
      whyItMatters: [
        "Early intervention during pre-threshold physiological decline dramatically reduces emergency hospitalization risk and caregiver response latency.",
        "For families and remote clinicians caring for high-risk patients across Malaysia and Southeast Asia, a monitoring architecture must be both predictively intelligent and hardware-resilient when connectivity degrades.",
      ],
      usersStakeholders: [
        {
          group: "Elderly & Chronic Cardiopulmonary Patients",
          needs: "Non-invasive, immediate bedside OLED feedback and automatic emergency escalation when unable to call for help manually.",
        },
        {
          group: "Family Caregivers & Remote Monitors",
          needs: "Instant Telegram alerts, automated emergency voice calls on critical breaches, and a live web dashboard with historical vital trajectories.",
        },
        {
          group: "Clinical & Community Healthcare Workers",
          needs: "Accurate, DS1302 RTC-timestamped heart-rate and SpO₂ logs preserved on SD card even across prolonged internet blackouts.",
        },
      ],
      constraints: [
        "Optical PPG sensors (MAX30102/MAX30105) are highly sensitive to finger placement pressure, ambient light interference, and motion artifacts.",
        "Microcontroller memory limits across Arduino UNO, Wemos D1 R1, and ESP32 require lightweight, deterministic feature extraction and ring-buffer trend evaluation.",
        "Emergency alerting must strictly avoid alarm fatigue during routine Manual Mode spot-checks while guaranteeing rapid dispatch in Online Mode.",
      ],
      researchData: [
        {
          source: "Clinical Vital Safety Boundaries",
          role: "Deterministic Emergency Thresholds",
          details: "Resting Heart Rate > 100 bpm (tachycardia alert), Heart Rate < 60 bpm (bradycardia alert), and Peripheral Oxygen Saturation SpO₂ < 90% (hypoxemia alert).",
        },
        {
          source: "Multi-Window Temporal Vital Trajectories",
          role: "Predictive Early-Warning Signal",
          details: "Rolling slope, variance, and coupled HR-SpO₂ divergence patterns that indicate physiological decompensation prior to crossing hard thresholds.",
        },
        {
          source: "Residential Network Failure Scenarios",
          role: "Fault-Tolerance Engineering",
          details: "Simulated Wi-Fi dropouts and router power loss used to validate seamless switchover to ESP-NOW peer-to-peer packets and local MicroSD persistence.",
        },
      ],
      approach: [
        "We architected CardiOxy Pro around a strict separation between two warning classes and three operational modes.",
        "First, we separated Predictive Warnings (AI detects worsening multi-sample slopes and HR/SpO₂ coupling drift before a threshold is crossed) from Threshold Warnings (patient crosses HR > 100 bpm, HR < 60 bpm, or SpO₂ < 90%, triggering immediate emergency escalation).",
        "Second, we built a tri-mode state machine (Manual Mode, Online Mode, Offline Mode) so the device adapts gracefully to user intent and network availability.",
      ],
      architectureSummary:
        "Four-stage hardware-software pipeline linking optical biosensing, multi-MCU edge inference, dual online/offline transport, and multi-channel caregiver dispatch.",
      architectureLayers: [
        {
          layer: "LAYER 01 // BIOSENSING & TIMEKEEPING",
          title: "Optical PPG Acquisition & Hardware RTC",
          components: ["MAX30102 / MAX30105", "DS1302 RTC", "SSD1306 OLED"],
          description:
            "Captures red and infrared photoplethysmography waveforms to compute real-time Heart Rate (bpm) and SpO₂ (%), synchronized against hardware DS1302 real-time clock timestamps and rendered locally on the OLED display.",
        },
        {
          layer: "LAYER 02 // EDGE PROCESSING & DUAL-TIER ALERT ENGINE",
          title: "Multi-Controller Inference & Threshold Guard",
          components: ["ESP32", "Wemos D1 R1", "Arduino UNO"],
          description:
            "Filters contact artifacts, evaluates rolling window trajectories for Predictive AI Early Warning, and enforces hard safety boundaries (HR < 60, HR > 100, SpO₂ < 90%).",
        },
        {
          layer: "LAYER 03 // RESILIENT TRANSPORT LAYER",
          title: "Cloud Wi-Fi Sync + Offline ESP-NOW Failover",
          components: ["HTTPS / Wi-Fi", "ESP-NOW Protocol", "MicroSD Module"],
          description:
            "Streams telemetry to Google Sheets and the live dashboard in Online Mode; automatically falls back to connectionless ESP-NOW local wireless relay and SD-card CSV archival when Wi-Fi is unavailable.",
        },
        {
          layer: "LAYER 04 // CAREGIVER DISPATCH & INTERFACE",
          title: "Live Telemetry Dashboard & Emergency Escalation",
          components: ["Live Web Dashboard", "Telegram Bot Alerts", "Automated Phone Call"],
          description:
            "Visualizes live waveforms and historical logs while dispatching tiered Telegram notifications for predictive warnings and automatic emergency phone calls on critical threshold breaches.",
        },
      ],
      aiMlMethodology: [
        {
          title: "Predictive Early Warning vs. Hard Threshold Alerting",
          points: [
            "Predictive Warning Tier: Evaluates rolling temporal windows of valid HR and SpO₂ readings. When SpO₂ exhibits a sustained downward gradient (e.g., dropping from 98% → 94% → 91.5% across consecutive windows) paired with compensatory heart-rate elevation (e.g., 76 → 89 → 96 bpm), the AI flags a worsening trajectory BEFORE HR exceeds 100 bpm or SpO₂ falls below 90%.",
            "Threshold Warning Tier: Hard deterministic comparator that fires immediately when any validated reading crosses HR > 100 bpm, HR < 60 bpm, or SpO₂ < 90%.",
            "Signal Contact Gating: Prevents false alarms when no finger is placed on the MAX30102/MAX30105 sensor by checking IR reflection amplitude before entering the inference pipeline.",
          ],
        },
        {
          title: "Tri-Mode Operational State Machine",
          points: [
            "Manual Mode: Patient places finger on sensor for on-demand spot checks; readings display locally on OLED; normal readings generate zero emergency alerts.",
            "Online Mode: Continuous telemetry uploads to Google Sheets and the live web dashboard; historical records remain queryable; predictive warnings send Telegram advisories while threshold breaches trigger urgent Telegram alerts and automatic emergency phone calls.",
            "Offline Mode: Activated automatically when Wi-Fi is unreachable; ESP-NOW maintains local node-to-node communication and every reading is written with its DS1302 RTC timestamp to the MicroSD card so zero clinical history is lost.",
          ],
        },
      ],
      implementation: [
        {
          area: "Embedded Sensor Fusion & I²C Bus Management",
          details:
            "Configured MAX30102/MAX30105 sampling rate, LED pulse width, and ADC range alongside SSD1306 OLED rendering and DS1302 RTC time synchronization across the Arduino UNO / Wemos D1 R1 / ESP32 hardware stack.",
        },
        {
          area: "ESP-NOW & SD Fault-Tolerant Failover",
          details:
            "Implemented non-blocking Wi-Fi health checks. On connection loss, packets route over ESP-NOW MAC-layer frames while appending timestamped records (`YYYY-MM-DD HH:MM:SS, HR, SpO2, Mode, AlertState`) to the SD card module.",
        },
        {
          area: "Cloud Synchronization & Multi-Channel Escalation",
          details:
            "Integrated Google Apps Script webhooks for real-time Google Sheets persistence, Telegram Bot API for structured caregiver alert cards, and automated telephony trigger routines for acute threshold emergencies.",
        },
      ],
      interfaceDesign: [
        "Bedside OLED interface engineered for high-contrast glanceability by elderly users, displaying large numerical HR/SpO₂ readouts, finger-contact confirmation, and active connectivity mode.",
        "Remote Web Dashboard designed as an operational clinical monitor showing live vital traces, predictive vs. threshold alert status, timestamped history from Google Sheets/SD logs, and escalation controls.",
      ],
      results: {
        summary:
          "Validated across simulated normal, gradual-deterioration, acute-threshold, and network-blackout scenarios, earning multiple international innovation gold medals.",
        metrics: [
          {
            label: "Emergency Thresholds",
            value: "HR <60 / >100 · SpO₂ <90%",
            context: "100% deterministic trigger accuracy on validated contact readings",
            highlight: true,
          },
          {
            label: "Predictive Lead Time",
            value: "Pre-Threshold Detection",
            context: "Flags sustained SpO₂ decline & HR drift before crossing emergency cutoffs",
          },
          {
            label: "Offline Data Retention",
            value: "Zero Packet Loss",
            context: "Continuous ESP-NOW local relay + RTC-timestamped MicroSD logging",
          },
          {
            label: "International Honours",
            value: "3 Major Awards",
            context: "BIICC 2026 Best AI Tech + Gold Award · ISIC-WOU24 Gold Award",
            highlight: true,
          },
        ],
      },
      impact: [
        "Demonstrates how affordable embedded hardware and targeted predictive logic can bring hospital-grade early-warning concepts into residential eldercare.",
        "Bridges the urban-rural connectivity gap by ensuring offline patients still benefit from local wireless monitoring (ESP-NOW) and complete historical auditability (SD + RTC).",
      ],
      limitations: [
        "Optical wrist/finger PPG readings remain susceptible to motion artifacts during vigorous physical movement and peripheral vasoconstriction (cold extremities).",
        "Predictive trend sensitivity requires calibration to individual baseline resting heart rates (e.g., athletic bradycardia vs. pathological bradycardia).",
        "Hardware prototype currently spans discrete development boards (ESP32, Wemos D1 R1, Arduino UNO) rather than a single custom PCB.",
      ],
      lessonsLearned: [
        "In healthcare IoT, reliability under failure (what happens when Wi-Fi drops or a sensor is half-touched) is just as important as the AI model itself.",
        "Separating predictive trend warnings from hard threshold emergencies prevents caregiver panic while still providing actionable early lead time.",
      ],
      nextSteps: [
        "Consolidate the multi-board prototype onto a single custom ultra-low-power ESP32-S3 PCB with LiPo battery management and wearable enclosure.",
        "Incorporate personalized baseline adaptive calibration over a patient's first 48 hours of wear.",
      ],
    },
  },
  {
    id: "foodresilience",
    number: "02",
    slug: "foodresilience",
    title: "FoodResilience",
    subtitle: "Multi-Horizon Demand & Price Forecasting Engine for Inventory Intelligence",
    tagline:
      "Walk-forward validated forecasting across 1-to-30 day horizons integrating retail POS, DOSM PriceCatcher, and macroeconomic signals to optimize stock decisions and reduce food waste.",
    categories: [
      "Predictive AI",
      "Time-Series Forecasting",
      "Inventory Intelligence",
      "Sustainability (SDG 12)",
    ],
    role: "Lead ML & Forecasting Systems Engineer",
    year: "2026",
    contextBadge: "DORMATHON 2026 · UN SDG 12",
    awards: ["Developed for DORMATHON 2026 — Predictive Retail & Sustainability Track"],
    sdgAlignment: "UN SDG 12 — Responsible Consumption and Production",
    technologies: [
      "LightGBM",
      "CatBoost",
      "XGBoost",
      "Walk-Forward Validation",
      "Python / Pandas / NumPy",
      "Multi-Horizon Forecasting",
      "Inventory Optimization",
      "DOSM PriceCatcher & CPI",
    ],
    problemSummary:
      "Food retailers and F&B operators face simultaneous volatility in consumer demand and supplier purchasing prices. Naive moving-average ordering leads either to perishable spoilage (overstocking) or costly emergency restocking during price spikes.",
    keyResultSummary:
      "Built a multi-horizon gradient-boosted forecasting and inventory decision engine spanning 1, 3, 7, 14, 21, and 30-day horizons, evaluated under strict walk-forward validation (2024-10-01 to 2024-12-31 holdout) with transparent uncertainty communication.",
    headlineMetrics: [
      {
        label: "Forecast Horizons",
        value: "1 · 3 · 7 · 14 · 21 · 30d",
        context: "Six discrete operational planning windows for perishable & staple SKUs",
        highlight: true,
      },
      {
        label: "Validation Protocol",
        value: "Walk-Forward Split",
        context: "Strict temporal holdout (2024-10-01 to 2024-12-31) with zero future leakage",
        highlight: true,
      },
      {
        label: "Gradient Ensembles",
        value: "LGBM · CatBoost · XGB",
        context: "Horizon-matched gradient boosted decision trees with exogenous macro features",
      },
      {
        label: "Sustainability Goal",
        value: "UN SDG 12",
        context: "Balances spoilage reduction against stockout protection via days-of-stock rules",
      },
    ],
    caseStudy: {
      overview: [
        "Developed for DORMATHON 2026 and aligned with United Nations Sustainable Development Goal 12 (Responsible Consumption and Production), FoodResilience is a predictive decision-support platform that helps food businesses forecast both SKU demand and supplier purchase prices.",
        "Rather than outputting raw point predictions in isolation, FoodResilience translates multi-horizon forecasts (1, 3, 7, 14, 21, and 30 days) into concrete inventory recommendations, days-of-stock targets, and purchase timing guidance — while explicitly surfacing data validation boundaries.",
      ],
      problem: [
        "Small and medium food enterprises operate on thin margins where perishable waste and wholesale ingredient price inflation directly threaten survival.",
        "Most accessible inventory tools rely on static reorder points or improperly validated time-series models (such as random K-fold splits on temporal data that leak future seasonal spikes into training), giving operators false confidence when market regimes shift.",
      ],
      whyItMatters: [
        "Reducing retail and F&B food waste directly advances UN SDG 12 while protecting business cash flow.",
        "Furthermore, coupling demand forecasts with wholesale purchase-price forecasts allows buyers to accelerate non-perishable procurement before predicted price rises and tighten perishable buffers when spoilage risk outweighs price inflation.",
      ],
      usersStakeholders: [
        {
          group: "Retail & F&B Inventory Managers",
          needs: "Actionable reorder quantities and days-of-stock recommendations across 1-day to 30-day procurement cycles.",
        },
        {
          group: "Procurement & Purchasing Teams",
          needs: "Forward visibility into ingredient purchase-price trends informed by DOSM PriceCatcher, CPI, and fuel/holiday signals.",
        },
        {
          group: "Sustainability & Operations Analysts",
          needs: "Auditable validation metrics and explicit confidence flags showing which SKU/horizon combinations are empirically reliable.",
        },
      ],
      constraints: [
        "Heterogeneous data granularity: daily/transactional POS records must align with monthly CPI releases, weekly fuel updates, and regional DOSM PriceCatcher observations.",
        "Forecast horizon degradation: error variance naturally expands from 1-day tactical horizons to 30-day strategic horizons.",
        "Strict epistemic constraint: if an external dataset or specific commodity regime was not sufficiently validated across the holdout window, the interface must flag that uncertainty rather than masking it.",
      ],
      researchData: [
        {
          source: "POS Transaction History & Kaggle Retail Benchmarks",
          role: "Core Demand Signal",
          details: "Historical daily unit sales, SKU categories, store-level velocity, and promotional flags.",
        },
        {
          source: "DOSM PriceCatcher & Consumer Price Index (CPI)",
          role: "Purchase-Price & Inflation Signal",
          details: "Malaysian Department of Statistics premises-level price tracking and food-group CPI series.",
        },
        {
          source: "Exogenous Context (Weather, Holidays, Fuel, Promotions)",
          role: "Regime & Calendar Covariates",
          details: "Public holidays, festival calendar effects, rainfall/temperature anomalies, retail fuel price shifts, and planned store promotions.",
        },
      ],
      approach: [
        "We designed a dual-stream forecasting pipeline (Stream A: Unit Demand Forecasting; Stream B: Unit Purchase-Price Forecasting) across six explicit horizons: 1, 3, 7, 14, 21, and 30 days.",
        "To prevent look-ahead bias, every feature transformation (lag windows, rolling quantiles, expanding price ratios) was computed strictly inside a Walk-Forward Validation harness, culminating in an out-of-time evaluation on the 2024-10-01 to 2024-12-31 holdout quarter.",
      ],
      architectureSummary:
        "Four-stage forecasting and inventory decision architecture from multi-source temporal alignment to walk-forward GBDT ensembles and risk-aware stock recommendations.",
      architectureLayers: [
        {
          layer: "LAYER 01 // MULTI-SOURCE TEMPORAL INGESTION",
          title: "POS, PriceCatcher & Exogenous Alignment",
          components: ["POS History", "DOSM PriceCatcher & CPI", "Weather / Holidays / Fuel"],
          description:
            "Harmonizes transactional sales with macro price series and calendar/weather covariates using point-in-time availability rules (publication-lag aware).",
        },
        {
          layer: "LAYER 02 // CAUSAL FEATURE ENGINEERING",
          title: "Lag, Rolling & Calendar Feature Factory",
          components: ["Causal Lags (7/14/28d)", "Rolling Volatility", "Holiday Lead/LagCounters"],
          description:
            "Generates strictly causal temporal features, price-elasticity proxies, and promotional interaction terms without leaking future observations.",
        },
        {
          layer: "LAYER 03 // MULTI-HORIZON GBDT ENSEMBLE",
          title: "Walk-Forward Validated Model Suite",
          components: ["LightGBM", "CatBoost", "XGBoost"],
          description:
            "Trains direct multi-horizon models for 1d, 3d, 7d, 14d, 21d, and 30d targets, evaluated across rolling walk-forward folds including the 2024-Q4 holdout.",
        },
        {
          layer: "LAYER 04 // INVENTORY DECISION ENGINE",
          title: "Days-of-Stock & Procurement Optimizer",
          components: ["Safety Stock Calculator", "Price-Lock Advisory", "Uncertainty Disclosure"],
          description:
            "Combines predicted demand, predicted price trajectory, and SKU perishability shelf-life to recommend order quantities and days-of-stock coverage.",
        },
      ],
      aiMlMethodology: [
        {
          title: "Walk-Forward Validation Protocol (Holdout: 2024-10-01 to 2024-12-31)",
          points: [
            "Why Walk-Forward Matters: Standard random cross-validation on time series leaks future trend and holiday effects into earlier folds. We enforced expanding-window walk-forward splits with a final strict out-of-time holdout from 2024-10-01 to 2024-12-31.",
            "Multi-Horizon Direct Strategy: Rather than recursively feeding 1-day predictions into 30-day rollouts (which compounds drift), each horizon (1d, 3d, 7d, 14d, 21d, 30d) uses horizon-specific target shifts and tailored feature lags.",
            "Model Selection Across Architectures: LightGBM provided the fastest training and lowest error on high-cardinality POS demand series; CatBoost excelled when categorical store/commodity interactions dominated; XGBoost served as a regularized ensemble comparator.",
          ],
        },
        {
          title: "Inventory & Days-of-Stock Decision Logic",
          points: [
            "Perishable Constraint Capping: Recommended days-of-stock is bounded by SKU shelf-life decay so a predicted price spike never triggers an order that will spoil before consumption.",
            "Forward Price-Demand Matrix: Crosses 7-to-30 day price slope with demand certainty to output four clear operator actions: Order NormalCycle, Build Buffer Before Price Rise, Lean Just-in-Time (High Spoilage Risk), or Hold / Manual Review (High Uncertainty).",
          ],
        },
      ],
      implementation: [
        {
          area: "Point-in-Time Data Pipeline",
          details:
            "Implemented strict temporal join logic in Python so monthly CPI and PriceCatcher updates only become visible to the model on their actual release dates.",
        },
        {
          area: "Multi-Horizon Evaluation Matrix",
          details:
            "Logged MAE, RMSE, MAPE, and directional price accuracy per horizon (1d to 30d) across the 2024-10-01 to 2024-12-31 holdout window.",
        },
        {
          area: "Decision Support Interface",
          details:
            "Built interactive horizon selectors, confidence band visualizations, and explicit validation badges indicating whether a given data source is fully validated or proxy-estimated.",
        },
      ],
      interfaceDesign: [
        "Designed around operational decisions rather than raw data science jargon: inventory planners select a SKU class and planning horizon (1d–30d) to inspect predicted demand, predicted purchase price, recommended days-of-stock, and explicit validation confidence.",
      ],
      results: {
        summary:
          "Demonstrated stable short-to-medium horizon accuracy (1d–14d) on validated retail/PriceCatcher series while transparently quantifying error growth at 21d–30d horizons.",
        metrics: [
          {
            label: "Holdout Window",
            value: "2024-Q4 (92 Days)",
            context: "Strict out-of-time evaluation: 2024-10-01 through 2024-12-31",
            highlight: true,
          },
          {
            label: "Horizon Span",
            value: "6 Horizons (1d–30d)",
            context: "Tactical replenishment (1–7d) to strategic purchasing (14–30d)",
          },
          {
            label: "Core Models",
            value: "LightGBM + CatBoost",
            context: "Benchmark winner across demand velocity and categorical price series",
            highlight: true,
          },
          {
            label: "SDG Alignment",
            value: "Target 12.3",
            context: "Reduces perishable over-ordering via shelf-life-constrained safety stock",
          },
        ],
      },
      impact: [
        "Provides food businesses with an auditable, scientifically grounded alternative to guesswork ordering, directly targeting food waste reduction under UN SDG 12.",
        "Establishes a reusable benchmark pattern for combining Malaysian open government data (DOSM PriceCatcher, CPI) with commercial retail POS streams.",
      ],
      limitations: [
        "Epistemic Honesty Disclosure: Not all external covariates (such as localized micro-weather anomalies and unrecorded competitor flash promotions) were uniformly available across every historical SKU series; where cross-dataset linkage was synthetic or partially coverage-limited, predictions are explicitly marked as exploratory rather than production-certified.",
        "At 21-day and 30-day horizons, sudden supply-chain shocks (e.g., abrupt export bans or flash floods) widen prediction intervals significantly.",
      ],
      lessonsLearned: [
        "Communicating model uncertainty honestly builds far more trust with technical judges and business operators than pretending a 30-day forecast is as sharp as a 1-day forecast.",
        "Preventing temporal leakage in feature engineering (especially macro indicators like CPI) is the single most critical step in forecasting engineering.",
      ],
      nextSteps: [
        "Integrate conformal prediction intervals to provide distribution-free coverage guarantees across all six horizons.",
        "Connect live POS webhook ingestion for automated daily walk-forward recalibration.",
      ],
    },
  },
  {
    id: "occupational-skills-demand",
    number: "03",
    slug: "occupational-skills-demand",
    title: "Occupational Skills & Demand Predictor",
    subtitle: "Calibrated Multi-Label NLP & Labour Intelligence Classifier",
    tagline:
      "Dual word/character TF-IDF and Platt-calibrated One-vs-Rest Logistic Regression mapping unstructured occupation descriptions to canonical skills and labour-market demand under rigorous Protocol B/C holdouts.",
    categories: [
      "Machine Learning",
      "Natural Language Processing",
      "Labour Intelligence",
      "Multi-Label Classification",
    ],
    role: "Lead ML & NLP Research Engineer",
    year: "2025 – 2026",
    contextBadge: "Protocol B & C Audited · Platt Calibrated",
    awards: [
      "Rigorous Multi-Protocol Evaluation & Synthetic Data Ablation Benchmark",
    ],
    technologies: [
      "Word 1–3 Gram TF-IDF",
      "Char 3–5 Gram TF-IDF",
      "One-vs-Rest Logistic Regression",
      "Platt Scaling Calibration",
      "Scikit-Learn / Python",
      "MASCO 2020 & MyCOL",
      "O*NET / ESCO / ILO",
      "OpenDOSM",
    ],
    problemSummary:
      "National occupational taxonomies (MASCO, O*NET, ESCO) and real-world job descriptions evolve at different speeds. Workforce planners need an explainable, well-calibrated NLP engine that extracts required skills and predicts labour demand without suffering from uncalibrated probabilities or synthetic data illusions.",
    keyResultSummary:
      "Engineered a dual-granularity TF-IDF + OvR Logistic Regression pipeline (C = 2.2, threshold = 0.42, GOLD records weighted 3×) achieving Protocol B Skills Macro F1 = 0.7149, Demand Macro F1 = 0.7644, ROC AUC = 0.8379, and Brier Score = 0.1668, while exposing critical generalization truths via Protocol C (Macro F1 = 0.6196) and synthetic ablation (0.1678 → 0.6612).",
    headlineMetrics: [
      {
        label: "Protocol B Skills Macro F1",
        value: "0.7149",
        context: "Paired with Skills Micro F1 = 0.6824 on stratified multi-label evaluation",
        highlight: true,
      },
      {
        label: "Demand Macro F1 & AUC",
        value: "0.7644 · 0.8379 AUC",
        context: "Labour demand classification with strong discriminative ranking",
        highlight: true,
      },
      {
        label: "Probability Calibration",
        value: "0.1668 Brier",
        context: "Platt scaling calibration with C = 2.2 and tuned threshold = 0.42",
      },
      {
        label: "Protocol C Strict Holdout",
        value: "0.6196 Macro F1",
        context: "Honest cross-distribution holdout (Micro F1 = 0.6712) revealing domain shift",
      },
    ],
    caseStudy: {
      overview: [
        "The Occupational Skills & Demand Predictor is an applied NLP and labour-market intelligence system built to analyze free-text occupation descriptions and predict both (1) the multi-label set of required canonical skills and (2) labour-market demand tiers.",
        "Grounded in Malaysian and international occupational standards — MASCO 2020, MyCOL 2024/25, O*NET, ESCO, ILO, and OpenDOSM — this project serves as a case study in rigorous ML evaluation: demonstrating why evaluation protocols, sample weighting, probability calibration, and synthetic-data ablation matter more than chasing a single inflated leaderboard number.",
      ],
      problem: [
        "Policymakers, universities, and workforce reskilling platforms struggle to map unstructured role descriptions onto standardized skill taxonomies and demand indicators.",
        "In low-resource domain NLP (such as Malaysian MASCO occupation mappings), two pitfalls routinely invalidate ML models: (1) heavy reliance on synthetic training text can inflate in-distribution validation scores while failing on real authoritative records, and (2) uncalibrated classifiers output raw decision scores that cannot be trusted as confidence probabilities.",
      ],
      whyItMatters: [
        "When an NLP model recommends reskilling priorities or informs labour-market analysis, downstream consumers need calibrated probabilities (low Brier score) and transparent out-of-distribution generalization metrics.",
        "By documenting both Protocol B and the stricter Protocol C holdout — alongside a 0% vs. 100% synthetic data ablation — this project provides a blueprint for auditable, honest NLP engineering.",
      ],
      usersStakeholders: [
        {
          group: "Workforce Planners & Labour Economists",
          needs: "Consistent mapping from occupation narratives to MASCO/O*NET/ESCO skills and MyCOL/OpenDOSM demand indicators.",
        },
        {
          group: "Curriculum Designers & Reskilling Platforms",
          needs: "Calibrated confidence scores (via Platt scaling) so borderline skill predictions can be flagged for human review.",
        },
        {
          group: "ML Engineers & Research Auditors",
          needs: "Complete reproducibility of hyperparameters (C = 2.2, threshold = 0.42, 3× GOLD weighting) and transparent ablation evidence.",
        },
      ],
      constraints: [
        "High label sparsity and class imbalance across multi-label occupational skill sets.",
        "Scarcity of human-curated authoritative Malaysian occupation-to-skill records ('GOLD' records) relative to augmented/synthetic descriptions.",
        "Need for fast, deterministic CPU inference and token-level feature explainability without requiring opaque billion-parameter LLMs at runtime.",
      ],
      researchData: [
        {
          source: "MASCO 2020 & MyCOL 2024/25",
          role: "Malaysian Occupational & Critical Demand Ground Truth",
          details: "Malaysia Standard Classification of Occupations (MASCO 2020) hierarchy and Malaysia Critical Occupations List (MyCOL 2024/25) demand signals.",
        },
        {
          source: "O*NET, ESCO & ILO Frameworks",
          role: "International Skill & Competency Taxonomies",
          details: "Cross-walked skill definitions, task descriptors, and occupational metadata.",
        },
        {
          source: "OpenDOSM Labour Statistics & GOLD Curated Records",
          role: "Macro Demand Context & High-Trust Supervision",
          details: "Department of Statistics Malaysia open labour datasets; authoritative GOLD records weighted 3× during training to anchor decision boundaries.",
        },
      ],
      approach: [
        "Instead of jumping to a heavy transformer that overfits small tabular-text corpora, we engineered a dual-channel sparse lexical + subword representation: combining Word 1–3 gram TF-IDF (capturing domain phrases like 'statistical process control' or 'embedded firmware') with Character 3–5 gram TF-IDF (capturing morphological variants, abbreviations, and noisy spelling).",
        "We paired this feature space with a regularized One-vs-Rest (OvR) Logistic Regression classifier (C = 2.2), weighted authoritative GOLD records at 3×, applied Platt sigmoid calibration to align predicted probabilities with empirical accuracy, and tuned the multi-label operating threshold to 0.42.",
      ],
      architectureSummary:
        "Dual-branch lexical/character TF-IDF feature union feeding a 3× GOLD-weighted One-vs-Rest Logistic Regression ensemble with Platt calibration and multi-protocol evaluation.",
      architectureLayers: [
        {
          layer: "LAYER 01 // TAXONOMY & CORPUS HARMONIZATION",
          title: "Multi-Standard Corpus & 3× GOLD Sample Weighting",
          components: ["MASCO 2020", "MyCOL 2024/25", "O*NET / ESCO / ILO", "OpenDOSM"],
          description:
            "Aligns occupational narratives and demand tiers, assigning a 3.0× sample weight to verified GOLD records so authoritative ground truth dominates synthetic augmentation.",
        },
        {
          layer: "LAYER 02 // DUAL-GRANULARITY FEATURE UNION",
          title: "Word (1–3 Gram) + Character (3–5 Gram) TF-IDF",
          components: ["Word 1–3 Gram TF-IDF", "Char 3–5 Gram TF-IDF", "Sublinear TF Scaling"],
          description:
            "Extracts both multi-word technical phrases and subword character n-grams, providing resilience against terminology variations across Malaysian and international standards.",
        },
        {
          layer: "LAYER 03 // CLASSIFIER & PLATT CALIBRATION",
          title: "One-vs-Rest Logistic Regression (C = 2.2, τ = 0.42)",
          components: ["OvR Logistic Regression (C=2.2)", "Platt Scaling", "Threshold τ=0.42"],
          description:
            "Trains independent L2-regularized linear classifiers per label, calibrates raw logits via Platt scaling (Brier = 0.1668), and applies the optimal F1 threshold of 0.42.",
        },
        {
          layer: "LAYER 04 // MULTI-PROTOCOL AUDIT HARNESS",
          title: "Protocol B, Protocol C & Synthetic Ablation Suite",
          components: ["Protocol B Evaluation", "Protocol C Strict Holdout", "0% vs 100% Synthetic Ablation"],
          description:
            "Audits macro/micro F1, ROC AUC, and calibration error across standard stratified splits, strict unseen-group holdouts, and synthetic data ratios.",
        },
      ],
      aiMlMethodology: [
        {
          title: "Why Protocol B vs. Protocol C Matters",
          points: [
            "Protocol B (Standard Stratified Evaluation): Evaluates performance when occupation variants share structural distribution with the training corpus — achieving Skills Macro F1 = 0.7149, Skills Micro F1 = 0.6824, Demand Macro F1 = 0.7644, ROC AUC = 0.8379, and Brier Score = 0.1668.",
            "Protocol C (Strict Holdout Evaluation): Restricts shared lexical templates across holdout boundaries to test harder generalization — yielding Skills Macro F1 = 0.6196 and Skills Micro F1 = 0.6712.",
            "Engineering Insight: Reporting Protocol B alone would overstate real-world readiness on novel occupation phrasings by ~9.5 Macro F1 points. Showing both protocols proves where the model is strong (Micro F1 drops by only 1.12 points: 0.6824 → 0.6712) and where rare-skill tail classes face domain shift.",
          ],
        },
        {
          title: "Synthetic Data Ablation & 3× GOLD Weighting",
          points: [
            "The Synthetic Data Dilemma: Training with 0% synthetic data (GOLD-only scarcity) yielded a Skills Macro F1 of just 0.1678 because rare skills lacked sufficient positive support.",
            "Training with 100% synthetic expansion raised Macro F1 to 0.6612 by populating rare label combinations, but risked drifting away from authentic Malaysian MASCO phrasing.",
            "Optimal Resolution: Combining synthetic coverage with 3× sample weighting on verified GOLD records pushed Protocol B Skills Macro F1 to 0.7149 while anchoring decision boundaries in real occupational records.",
          ],
        },
        {
          title: "Platt Calibration & Threshold Optimization (C = 2.2, τ = 0.42)",
          points: [
            "Default 0.50 probability thresholds under-predict sparse multi-label skills. Platt calibration (Brier Score = 0.1668) followed by validation threshold tuning at τ = 0.42 maximized macro-averaged skill recovery without flooding predictions with false positives.",
          ],
        },
      ],
      implementation: [
        {
          area: "Feature Union & Sparse Linear Pipeline",
          details:
            "Implemented deterministic Scikit-Learn `FeatureUnion` combining word (1–3) and char_wb (3–5) TF-IDF vectorizers with `OneVsRestClassifier(LogisticRegression(C=2.2))`.",
        },
        {
          area: "Calibration & Threshold Auditing",
          details:
            "Fitted Platt sigmoid calibrators per label and evaluated Brier score (0.1668) alongside ROC AUC (0.8379) and precision-recall operating curves.",
        },
        {
          area: "Ablation & Holdout Reproducibility",
          details:
            "Automated benchmark scripts comparing Protocol B, Protocol C, and synthetic mixture ratios (0% to 100%) with fixed random seeds.",
        },
      ],
      interfaceDesign: [
        "Interactive NLP & Calibration Inspector allowing technical reviewers to inspect how word/char n-grams activate specific skill labels, compare Protocol B vs. Protocol C metrics, and explore the synthetic-data ablation curve.",
      ],
      results: {
        summary:
          "Delivered a fast, explainable, and well-calibrated multi-label classifier with full empirical transparency across evaluation protocols and data mixtures.",
        metrics: [
          {
            label: "Protocol B Skills F1",
            value: "0.7149 Macro · 0.6824 Micro",
            context: "Primary multi-label skill prediction benchmark",
            highlight: true,
          },
          {
            label: "Demand Classification",
            value: "0.7644 Macro F1 · 0.8379 AUC",
            context: "High discrimination on labour-market demand tiers",
            highlight: true,
          },
          {
            label: "Calibration (Brier Score)",
            value: "0.1668",
            context: "Platt-calibrated probabilities at C = 2.2, threshold = 0.42",
          },
          {
            label: "Protocol C & Ablation",
            value: "0.6196 Macro · 0.6712 Micro",
            context: "Ablation: 0% synthetic (0.1678) → 100% synthetic (0.6612) → 3× GOLD hybrid (0.7149)",
          },
        ],
      },
      impact: [
        "Demonstrates mature ML research hygiene: treating dataset construction, sample weighting, holdout design, and probability calibration as first-class engineering problems.",
        "Provides an interpretable, low-latency baseline for Malaysian labour-market intelligence across MASCO 2020 and MyCOL 2024/25.",
      ],
      limitations: [
        "TF-IDF bag-of-n-grams captures lexical and subword patterns effectively but cannot resolve deep semantic paraphrases when zero character or word n-grams overlap.",
        "The 9.5-point Macro F1 gap between Protocol B (0.7149) and Protocol C (0.6196) highlights that tail skills with limited GOLD support remain sensitive to phrasing shifts.",
        "Synthetic data expansion (0.1678 → 0.6612) aids coverage but requires ongoing human audit to prevent synthetic template artifacts.",
      ],
      lessonsLearned: [
        "In real-world applied ML, how you design your validation split (Protocol B vs. Protocol C) teaches you far more about your system than tuning a hyperparameter by 0.01.",
        "Well-tuned linear models with character + word n-grams and Platt calibration are remarkably competitive, fast, and auditable when paired with thoughtful data weighting (3× GOLD).",
      ],
      nextSteps: [
        "Evaluate hybrid retrieval-augmented classification combining sparse Word/Char TF-IDF logits with dense multilingual embeddings (`bge-m3`).",
        "Expand verified human-annotated GOLD occupation records for rare technical MASCO unit groups.",
      ],
    },
  },
];

export interface NormalizedProject {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  timeframe: string;
  role: string;
  awards: string[];
  stack: string[];
  keyMetrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  overview: string;
  problem: string;
  whyItMatters: string;
  usersStakeholders: string[];
  constraints: string[];
  researchData: string;
  engineeringApproach: string;
  systemArchitecture: string;
  architectureLayers: {
    layer: string;
    components: string[];
    responsibility: string;
  }[];
  methodology: string[];
  implementation: string[];
  interfaceExperience: string;
  resultsEvaluation: string[];
  impact: string;
  limitations: string[];
  lessonsLearned: string[];
  nextSteps: string[];
}

export const projects: NormalizedProject[] = projectsData.map((p) => ({
  slug: p.slug,
  index: p.number,
  title: p.title,
  subtitle: p.subtitle,
  tagline: p.tagline,
  category: p.categories[0] || "AI Systems",
  timeframe: p.year,
  role: p.role,
  awards: p.awards,
  stack: [...p.technologies, ...(p.hardware || [])],
  keyMetrics: p.headlineMetrics.map((m) => ({
    label: m.label,
    value: m.value,
    detail: m.context,
  })),
  overview: p.caseStudy.overview.join(" "),
  problem: p.caseStudy.problem.join(" "),
  whyItMatters: p.caseStudy.whyItMatters.join(" "),
  usersStakeholders: p.caseStudy.usersStakeholders.map(
    (u) => `${u.group}: ${u.needs}`
  ),
  constraints: p.caseStudy.constraints,
  researchData: p.caseStudy.researchData
    .map((r) => `${r.source} (${r.role}): ${r.details}`)
    .join(" "),
  engineeringApproach: p.caseStudy.approach.join(" "),
  systemArchitecture: p.caseStudy.architectureSummary,
  architectureLayers: p.caseStudy.architectureLayers.map((l) => ({
    layer: `${l.layer} — ${l.title}`,
    components: l.components,
    responsibility: l.description,
  })),
  methodology: p.caseStudy.aiMlMethodology.flatMap((m) =>
    m.points.map((pt) => `${m.title}: ${pt}`)
  ),
  implementation: p.caseStudy.implementation.map(
    (i) => `${i.area}: ${i.details}`
  ),
  interfaceExperience: p.caseStudy.interfaceDesign.join(" "),
  resultsEvaluation: [
    p.caseStudy.results.summary,
    ...p.caseStudy.results.metrics.map(
      (m) => `${m.label}: ${m.value} (${m.context})`
    ),
  ],
  impact: p.caseStudy.impact.join(" "),
  limitations: p.caseStudy.limitations,
  lessonsLearned: p.caseStudy.lessonsLearned,
  nextSteps: p.caseStudy.nextSteps,
}));

export function getProjectBySlug(slug: string): NormalizedProject | undefined {
  return projects.find((p) => p.slug === slug);
}

