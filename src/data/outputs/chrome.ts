type OutputMap = Record<string, [string, string, string]>;

const outputs: OutputMap = {
  'chrome-0': [ // Summarize
    `TL;DR: EU AI Act requires AI companies to disclose training
data sources and complete risk assessments by 2027.`,

    `Summary: The EU AI Act introduces mandatory transparency
requirements for AI developers. Key provisions include:

--> Training data disclosure for all foundation models
--> Risk assessments for high-impact AI systems
--> Penalties up to 7% of global revenue
--> 18-month compliance window starting Q1 2026

The regulation affects all companies serving EU users,
regardless of where they're headquartered.`,

    `Comprehensive Analysis: EU AI Act - Impact Assessment

OVERVIEW
The European Union's AI Act establishes the world's first
comprehensive AI regulatory framework. It classifies AI
systems into four risk tiers.

KEY PROVISIONS
1. Transparency Requirements
   All foundation model providers must disclose copyrighted
   materials used in training datasets.

2. Risk Classification
   - Unacceptable: Social scoring (banned)
   - High-Risk: Healthcare, employment (audits required)
   - Limited: Chatbots, deepfakes (disclosure required)
   - Minimal: Spam filters (no requirements)

3. Enforcement
   Fines of \u20AC35M or 7% of global annual turnover.

TIMELINE
   --> Mar 2024: Act finalized
   --> Aug 2025: Unacceptable AI practices banned
   --> Feb 2027: Full compliance deadline

IMPACT: Affects estimated 6,800+ companies globally.`,
  ],

  'chrome-1': [ // Translate
    `[FR] L'UE exige la divulgation des donn\u00E9es d'entra\u00EEnement de l'IA d'ici 2027.`,

    `Translation (French):

La loi europ\u00E9enne sur l'IA introduit des exigences de
transparence obligatoires pour les d\u00E9veloppeurs d'IA.

Points cl\u00E9s :
--> Divulgation des donn\u00E9es d'entra\u00EEnement
--> \u00C9valuations des risques pour les syst\u00E8mes \u00E0 haut impact
--> Amendes jusqu'\u00E0 7% du chiffre d'affaires mondial
--> D\u00E9lai de conformit\u00E9 de 18 mois`,

    `MULTI-LANGUAGE TRANSLATION

[French]
La loi europ\u00E9enne sur l'intelligence artificielle
\u00E9tablit le premier cadre r\u00E9glementaire complet au monde.

[Spanish]
La Ley de IA de la UE establece el primer marco
regulatorio integral del mundo para la IA.

[German]
Das EU-KI-Gesetz legt den weltweit ersten umfassenden
Regulierungsrahmen f\u00FCr KI fest.

[Japanese]
EU AI\u6CD5\u306F\u3001\u4E16\u754C\u521D\u306E\u5305\u62EC\u7684\u306AAI\u898F\u5236\u6846\u7D44\u307F\u3092
\u78BA\u7ACB\u3057\u307E\u3059\u3002

Language confidence: 97% | Tone: Formal
Source language detected: English (US)`,
  ],

  'chrome-2': [ // Extract
    `{ "title": "EU AI Act", "date": "2024-03-15", "topic": "regulation" }`,

    `Extracted Data:

| Field     | Value                        |
|-----------|------------------------------|
| Title     | EU AI Act Overview           |
| Author    | European Commission          |
| Date      | March 15, 2024               |
| Category  | Technology Regulation        |
| Key Terms | AI, transparency, compliance |
| Sentiment | Neutral / Informational      |`,

    `STRUCTURED DATA EXTRACTION

{
  "article": {
    "title": "EU AI Act - Complete Overview",
    "author": "European Commission",
    "published": "2024-03-15T09:00:00Z",
    "modified": "2024-08-22T14:30:00Z",
    "wordCount": 2847,
    "readTime": "12 min"
  },
  "entities": [
    { "name": "European Union", "type": "organization" },
    { "name": "AI Act", "type": "legislation" },
    { "name": "GDPR", "type": "legislation", "relation": "referenced" }
  ],
  "keyDates": [
    { "date": "2024-03", "event": "Act finalized" },
    { "date": "2025-08", "event": "Phase 1 enforcement" },
    { "date": "2027-02", "event": "Full compliance" }
  ],
  "sentiment": "neutral",
  "confidence": 0.94
}

Extracted 3 entities, 3 dates, 12 key terms.`,
  ],

  'chrome-3': [ // Reply
    `Thanks for sharing! I'll review this and follow up.`,

    `Hi,

Thanks for sending this over. I've reviewed the key points
about the EU AI Act timeline. A few thoughts:

- The 2027 deadline gives us about 18 months to prepare
- We should audit our training data sources ASAP
- I'll schedule a compliance review meeting for next week

Let me know if you want to discuss further.

Best regards`,

    `Hi team,

Thanks for flagging the EU AI Act update. I've done a
thorough review and here's my assessment:

IMMEDIATE ACTIONS NEEDED:
1. Training Data Audit - We need to catalog all data
   sources used in our foundation models. I'd suggest
   Sarah leads this with a 2-week deadline.

2. Risk Classification - Our customer-facing AI falls
   under "Limited Risk" but the B2B product may qualify
   as "High Risk" given its use in hiring workflows.

3. Legal Review - Recommend engaging outside counsel
   for a compliance gap analysis.

TIMELINE:
- Week 1-2: Complete data audit
- Week 3-4: Risk assessment
- Month 2-3: Implementation plan
- Month 4+: Technical compliance work

I'll set up a kickoff meeting for Monday. Please come
prepared with a list of all AI models in production.

Happy to discuss any of this in more detail.

Best,
Alex`,
  ],

  'chrome-4': [ // Cite
    `European Commission. (2024). EU AI Act. EUR-Lex.`,

    `Citations (APA 7th):

European Commission. (2024). Regulation (EU) 2024/1689
  of the European Parliament: Artificial Intelligence Act.
  Official Journal of the European Union.

European Parliament. (2024). AI Act: First regulation on
  artificial intelligence. europarl.europa.eu.

Related:
Floridi, L. (2024). "The EU AI Act: A critical analysis."
  Nature Machine Intelligence, 6(2), 112-118.`,

    `CITATION BUNDLE - Multiple Formats

APA 7th:
European Commission. (2024). Regulation (EU) 2024/1689
  of the European Parliament and of the Council laying
  down harmonised rules on artificial intelligence.
  Official Journal of the European Union, L 1689, 1-144.

MLA 9th:
European Commission. "Artificial Intelligence Act."
  Official Journal of the European Union, 2024, pp. 1-144.

Chicago:
European Commission. Regulation (EU) 2024/1689: Artificial
  Intelligence Act. Brussels: Official Journal of the
  European Union, 2024.

BibTeX:
@article{eu_ai_act_2024,
  title={Artificial Intelligence Act},
  author={{European Commission}},
  journal={Official Journal of the EU},
  year={2024},
  number={L 1689}
}

DOI: 10.2860/000001 | CELEX: 32024R1689`,
  ],

  'chrome-5': [ // Simplify
    `The EU made new rules for AI. Companies must follow them by 2027.`,

    `Here's what this article is saying in simple terms:

The EU created a rulebook for AI companies. The main idea:
if you build AI, you need to be open about how it works.

What companies must do:
--> Tell people what data they used to train their AI
--> Check if their AI could cause harm
--> Follow the rules or pay big fines

Deadline: February 2027
Who it affects: Any company whose AI is used in Europe`,

    `SIMPLIFIED VERSION - Reading Level: Grade 8

THE EU'S NEW AI RULES (EXPLAINED SIMPLY)

What happened?
The European Union made the first big rulebook for
artificial intelligence. Think of it like traffic laws,
but for AI companies.

Why does it matter?
Right now, AI companies can do pretty much whatever they
want. These new rules change that.

The rules say:
1. BE HONEST - Tell people what information you used
   to teach your AI. No secrets.

2. BE CAREFUL - If your AI is used for important things
   like healthcare or hiring, you need extra checks.

3. DON'T BE CREEPY - Some uses of AI are just banned.
   Like rating people's "social score."

What if companies break the rules?
They pay HUGE fines - up to 7% of all the money they
make worldwide. For a big tech company, that could be
billions of dollars.

When does this start?
Companies have until February 2027 to follow all the
rules. That's about 18 months from now.

Original: 2,847 words at grade 14 reading level
Simplified: 180 words at grade 8 reading level`,
  ],

  'chrome-6': [ // Compare
    `This article aligns with Reuters' coverage. No major discrepancies.`,

    `SOURCE COMPARISON

This article vs Reuters vs TechCrunch:

| Point          | This Page | Reuters  | TechCrunch |
|---------------|-----------|----------|------------|
| Fine amount   | 7%        | 7% [OK]    | 6% [X]      |
| Deadline      | Feb 2027  | Feb 2027 | 2027 [OK]   |
| Risk tiers    | 4         | 4 [OK]     | 3 [X]       |

Verdict: This article is accurate. TechCrunch has
minor inaccuracies on fine percentage and risk tiers.`,

    `COMPREHENSIVE SOURCE COMPARISON

Compared against 5 authoritative sources:
* Reuters * TechCrunch * Ars Technica * EUR-Lex * BBC

ACCURACY MATRIX
+---------------+-------+-------+-------+
| Claim          | Match | Conf  | Note  |
|---------------+-------+-------+-------+
| 7% fine cap    |  5/5  |  99%  |       |
| 4 risk tiers   |  4/5  |  95%  | TC: 3 |
| Feb 2027       |  5/5  |  99%  |       |
| 6,800 cos.     |  2/5  |  72%  | Unverified|
|---------------+-------+-------+-------+

BIAS ANALYSIS
This page: Neutral (0.12 bias score)
Reuters: Neutral (0.08)
TechCrunch: Slight negative tone toward regulation (0.31)

UNIQUE INFORMATION
Only in this article: compliance window detail
Missing from this article: industry reaction quotes

VERDICT: Highly accurate (94% confidence)
Recommendation: Cross-reference the 6,800 number`,
  ],

  'chrome-7': [ // Key Points
    `* EU AI Act requires transparency from AI companies by 2027`,

    `KEY TAKEAWAYS:

1. * First comprehensive AI regulation in the world
2. * Four-tier risk classification system
3. * Fines up to 7% of global revenue
4. * Full compliance deadline: February 2027
5. * Applies to any company serving EU users`,

    `KEY POINTS EXTRACTED

MUST KNOW (Critical)
* The EU AI Act is the world's first comprehensive AI law
* All AI companies serving EU users must comply
* Non-compliance fines: up to \u20AC35M or 7% of revenue
* Full compliance deadline: February 2027

SHOULD KNOW (Important)
* AI systems classified into 4 risk tiers
* Social scoring and real-time biometric surveillance banned
* High-risk AI requires third-party audits
* Training data sources must be disclosed

NICE TO KNOW (Context)
* Act was finalized in March 2024
* Modeled partially on GDPR enforcement structure
* Estimated 6,800+ companies affected globally
* National authorities handle enforcement

ACTION ITEMS FOR YOUR TEAM:
[ ] Classify your AI systems by risk tier
[ ] Begin training data documentation
[ ] Consult legal for compliance roadmap`,
  ],

  'chrome-8': [ // Read Aloud
    `[Audio ready] Reading 45 words. Estimated: 20 seconds.`,

    `[Audio Generated]

Voice: Natural (en-US, female)
Speed: 1.0x | Duration: 1m 42s
Words: 248

Preview transcript:
"The EU AI Act introduces mandatory transparency
requirements for AI developers. Key provisions include
training data disclosure for all foundation models..."

[>] Press play to start | * Headphones recommended`,

    `[AUDIO GENERATION COMPLETE]

Voice Settings:
* Voice: Neural2-F (natural, warm)
* Language: English (US)
* Speed: 1.0x (adjustable 0.5x - 2.0x)
* Duration: 4m 28s
* Word count: 682

Chapters Generated:
  00:00 - Overview
  00:45 - Key Provisions
  01:30 - Risk Classification
  02:15 - Enforcement & Fines
  03:00 - Timeline
  03:45 - Global Impact

Accessibility Features:
[OK] SSML markup for proper pronunciation
[OK] Emphasis on key terms and numbers
[OK] Natural pauses at section breaks
[OK] Downloadable as MP3 (2.1MB)

[>] Ready to play | [>>] Chapters enabled`,
  ],


};

export default outputs;
