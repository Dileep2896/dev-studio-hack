type OutputMap = Record<string, [string, string, string]>;

const outputs: OutputMap = {
  // ═══════════════════════════════════════
  // VS CODE — 9 buttons
  // ═══════════════════════════════════════

  'vscode-0': [ // Refactor
    `// Minimal refactoring applied
const userData = fetchUser(id);
const formattedName = \`\${userData.first} \${userData.last}\`;
return { name: formattedName, email: userData.email };

// Changes: Renamed 2 variables for clarity`,

    `// Moderate refactoring applied
function getFormattedName(user) {
  return \`\${user.first} \${user.last}\`;
}

function getUserProfile(id) {
  const user = fetchUser(id);
  return {
    name: getFormattedName(user),
    email: user.email,
    displayId: \`USR-\${id}\`
  };
}

// Changes: Extracted helper function, improved structure`,

    `// Comprehensive refactoring applied
interface UserProfile {
  name: string;
  email: string;
  displayId: string;
}

class UserService {
  constructor(private api: UserAPI) {}

  async getProfile(id: string): Promise<UserProfile> {
    const user = await this.api.fetch(id);
    return {
      name: this.formatName(user),
      email: user.email,
      displayId: \`USR-\${id}\`
    };
  }

  private formatName(user: RawUser): string {
    return \`\${user.first} \${user.last}\`;
  }
}

// Changes: Full OOP restructure with TypeScript interfaces,
// async/await, dependency injection, and separation of concerns`,
  ],

  'vscode-1': [ // Explain
    `This function fetches a user by ID and returns their name and email.`,

    `This function does three things:
1. Fetches user data from the API using the provided ID
2. Formats the user's first and last name into a single string
3. Returns an object with the formatted name and email

The \`fetchUser\` call is synchronous, which could block
the main thread if the API is slow.`,

    `DETAILED EXPLANATION

Purpose: Retrieve and format user profile data

Line-by-line breakdown:
\u2192 Line 1: fetchUser(id) — Makes a synchronous API call
   to retrieve user data. Returns a RawUser object.
\u2192 Line 2: Template literal concatenates first + last name
   with a space separator.
\u2192 Line 3-4: Returns a plain object (not a class instance)
   containing the formatted name and raw email.

Potential Issues:
\u2022 No error handling if fetchUser fails or returns null
\u2022 Synchronous API call blocks execution
\u2022 No input validation on the id parameter
\u2022 No TypeScript types — any values possible

Dependencies: fetchUser (imported from ../api/users)
Called by: ProfilePage, SettingsPanel, AdminDashboard`,
  ],

  'vscode-2': [ // Write Tests
    `test('returns user profile', () => {
  const result = getUserProfile('123');
  expect(result.name).toBe('John Doe');
});`,

    `describe('getUserProfile', () => {
  it('returns formatted user profile', () => {
    const result = getUserProfile('123');
    expect(result).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      displayId: 'USR-123'
    });
  });

  it('throws on invalid ID', () => {
    expect(() => getUserProfile('')).toThrow();
  });

  it('handles missing email gracefully', () => {
    mockFetchUser({ first: 'Jane', last: 'Doe' });
    const result = getUserProfile('456');
    expect(result.email).toBeUndefined();
  });
});`,

    `describe('getUserProfile', () => {
  let mockApi: jest.Mocked<UserAPI>;

  beforeEach(() => {
    mockApi = { fetch: jest.fn() };
  });

  describe('successful retrieval', () => {
    it('returns complete user profile', async () => {
      mockApi.fetch.mockResolvedValue({
        first: 'John', last: 'Doe',
        email: 'john@example.com'
      });
      const service = new UserService(mockApi);
      const result = await service.getProfile('123');
      expect(result).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        displayId: 'USR-123'
      });
    });

    it('formats display ID correctly', async () => {
      mockApi.fetch.mockResolvedValue({ first: 'A', last: 'B', email: '' });
      const result = await new UserService(mockApi).getProfile('xyz-99');
      expect(result.displayId).toBe('USR-xyz-99');
    });
  });

  describe('error handling', () => {
    it('throws on API failure', async () => {
      mockApi.fetch.mockRejectedValue(new Error('Network'));
      const service = new UserService(mockApi);
      await expect(service.getProfile('123')).rejects.toThrow('Network');
    });

    it('throws on null user', async () => {
      mockApi.fetch.mockResolvedValue(null);
      await expect(new UserService(mockApi).getProfile('1'))
        .rejects.toThrow();
    });
  });

  describe('edge cases', () => {
    it('handles unicode names', async () => {
      mockApi.fetch.mockResolvedValue({
        first: '\u00C9milie', last: 'M\u00FCller', email: 'e@m.com'
      });
      const result = await new UserService(mockApi).getProfile('7');
      expect(result.name).toBe('\u00C9milie M\u00FCller');
    });
  });
});`,
  ],

  'vscode-3': [ // Debug
    `Bug: Possible null reference at line 3.
Fix: Add null check before accessing userData.`,

    `Bugs Found: 2

1. \u26A0\uFE0F Line 3: fetchUser may return null
   Fix: Add guard clause
   if (!userData) throw new Error('User not found');

2. \u26A0\uFE0F Line 5: No error boundary for API failures
   Fix: Wrap in try/catch block

Suggested fix applied \u2192 2 issues resolved`,

    `DEBUG ANALYSIS \u2014 getUserProfile()

\u2501\u2501\u2501 ISSUES FOUND: 4 \u2501\u2501\u2501

\u274C CRITICAL: Null reference (Line 3)
   fetchUser() can return null when user is deleted.
   Impact: Uncaught TypeError crashes the app.
   Fix: Add early return with error.

\u274C CRITICAL: Unhandled promise rejection (Line 1)
   If the API is unreachable, the error propagates
   unhandled through the call stack.
   Fix: Wrap in try/catch, return fallback.

\u26A0\uFE0F WARNING: No input validation (Line 1)
   Empty string or non-string IDs pass silently.
   Fix: Validate id is non-empty string.

\u26A0\uFE0F WARNING: Memory leak potential (Line 2)
   Template literal creates new string every call.
   Low impact but fix with memoization for hot paths.

Auto-fix applied: 4/4 issues patched.
Run tests to verify: npm test -- --grep "getUserProfile"`,
  ],

  'vscode-4': [ // Optimize
    `\u26A1 Suggestion: Cache fetchUser result to avoid repeat calls.`,

    `\u26A1 Performance Suggestions:

1. Cache API responses (saves ~200ms per call)
   const cache = new Map();
   if (cache.has(id)) return cache.get(id);

2. Use string concatenation instead of template literal
   for hot paths (5% faster in V8)

3. Lazy-load the email field if not always needed

Estimated improvement: 35% faster execution`,

    `\u26A1 PERFORMANCE AUDIT

Current: 245ms avg response time
Target:  <50ms avg response time

OPTIMIZATIONS (ordered by impact):

1. API CACHING [High Impact]
   Add LRU cache with 5-min TTL
   Before: 245ms | After: 2ms (cache hit)
   Implementation: Map + setTimeout cleanup

2. BATCH REQUESTS [High Impact]
   Combine multiple getUserProfile calls
   Use DataLoader pattern (Facebook)
   Reduces N+1 queries by 90%

3. LAZY FIELDS [Medium Impact]
   Don't fetch email unless component needs it
   Saves 15ms per call on average

4. CONNECTION POOLING [Medium Impact]
   Reuse HTTP connections to user API
   Keep-alive reduces handshake overhead by 40ms

5. MEMOIZE FORMAT [Low Impact]
   Cache formatName results
   Saves <1ms but reduces GC pressure

PROJECTED RESULT: 245ms \u2192 8ms (97% improvement)
Memory impact: +2.1MB for cache (acceptable)`,
  ],

  'vscode-5': [ // Document
    `/** Gets the user profile by ID. */`,

    `/**
 * Retrieves a user profile by their unique identifier.
 *
 * @param id - The unique user identifier (e.g., "USR-123")
 * @returns An object containing the formatted name and email
 * @throws {Error} If the user is not found
 *
 * @example
 * const profile = getUserProfile('123');
 * console.log(profile.name); // "John Doe"
 */`,

    `/**
 * Retrieves and formats a complete user profile.
 *
 * Fetches raw user data from the UserAPI, transforms it
 * into a standardized UserProfile interface, and returns
 * the result. Handles name formatting and ID generation.
 *
 * @param id - Unique user identifier. Must be a non-empty
 *   string matching the pattern /^[a-zA-Z0-9-]+$/
 * @returns Promise resolving to a UserProfile object
 * @throws {UserNotFoundError} When no user matches the ID
 * @throws {NetworkError} When the API is unreachable
 *
 * @example
 * // Basic usage
 * const profile = await userService.getProfile('123');
 * console.log(profile.name); // "John Doe"
 *
 * @example
 * // Error handling
 * try {
 *   const profile = await userService.getProfile(id);
 * } catch (e) {
 *   if (e instanceof UserNotFoundError) {
 *     showNotFound();
 *   }
 * }
 *
 * @see UserProfile - Return type interface
 * @see UserAPI.fetch - Underlying API method
 * @since 2.0.0
 * @category User Management
 */`,
  ],

  'vscode-6': [ // Convert
    `# Python equivalent
def get_user_profile(id):
    user = fetch_user(id)
    return {"name": f"{user['first']} {user['last']}", "email": user["email"]}`,

    `# Python equivalent with type hints
from dataclasses import dataclass

@dataclass
class UserProfile:
    name: str
    email: str
    display_id: str

def get_user_profile(user_id: str) -> UserProfile:
    user = fetch_user(user_id)
    name = f"{user['first']} {user['last']}"
    return UserProfile(
        name=name,
        email=user['email'],
        display_id=f"USR-{user_id}"
    )`,

    `# Python equivalent — full conversion
from dataclasses import dataclass
from typing import Protocol
import asyncio

@dataclass(frozen=True)
class UserProfile:
    """Immutable user profile data."""
    name: str
    email: str
    display_id: str

class UserAPI(Protocol):
    """Interface for user data retrieval."""
    async def fetch(self, user_id: str) -> dict: ...

class UserService:
    def __init__(self, api: UserAPI) -> None:
        self._api = api

    async def get_profile(self, user_id: str) -> UserProfile:
        if not user_id or not user_id.strip():
            raise ValueError("user_id must be non-empty")
        user = await self._api.fetch(user_id)
        return UserProfile(
            name=self._format_name(user),
            email=user["email"],
            display_id=f"USR-{user_id}",
        )

    @staticmethod
    def _format_name(user: dict) -> str:
        return f"{user['first']} {user['last']}"

# Converted from TypeScript to Python 3.12
# Changes: dataclass, Protocol, async/await, frozen=True`,
  ],

  'vscode-7': [ // Review
    `\u2705 Code looks clean. Minor: consider adding null check on line 3.`,

    `CODE REVIEW \u2014 getUserProfile()

\u2705 Good: Clear function name and purpose
\u2705 Good: Simple return structure
\u26A0\uFE0F Suggestion: Add null check for fetchUser result
\u26A0\uFE0F Suggestion: Add error handling for API calls
\u274C Issue: No TypeScript types on parameters

Overall: Approve with minor changes`,

    `CODE REVIEW \u2014 Full Analysis

Reviewer: AI Code Assistant
Verdict: REQUEST CHANGES (2 blocking, 3 suggestions)

BLOCKING ISSUES:
\u274C No error handling for API failures
  The function will throw an unhandled rejection.
  Suggestion: Add try/catch with meaningful error.

\u274C Missing input validation
  Passing undefined crashes without useful error.
  Suggestion: Validate id parameter at entry.

SUGGESTIONS:
\u26A0\uFE0F Add return type annotation
  function getUserProfile(id: string): UserProfile

\u26A0\uFE0F Consider making async
  fetchUser likely hits a network \u2014 should be awaited.

\u26A0\uFE0F Add JSDoc for public API
  This is used in 3+ files \u2014 worth documenting.

METRICS:
  Complexity: 2 (low \u2714\uFE0F)
  Test coverage: 0% (needs tests \u274C)
  Dependencies: 1 (fetchUser)
  Bundle impact: +0.2KB (negligible)

APPROVED after addressing blocking issues.`,
  ],

  'vscode-8': [ // Complete
    `return { name: formattedName, email: userData.email, role: userData.role };`,

    `// Smart completion based on context
return {
  name: formattedName,
  email: userData.email,
  displayId: \`USR-\${id}\`,
  avatar: userData.avatarUrl ?? '/default-avatar.png',
  lastLogin: new Date(userData.lastLoginAt),
};`,

    `// Context-aware completion — inferred from codebase patterns
return {
  name: formattedName,
  email: userData.email,
  displayId: \`USR-\${id}\`,
  avatar: userData.avatarUrl ?? '/default-avatar.png',
  lastLogin: new Date(userData.lastLoginAt),
  role: userData.role as UserRole,
  permissions: derivePermissions(userData.role),
  preferences: {
    theme: userData.prefs?.theme ?? 'system',
    language: userData.prefs?.lang ?? 'en',
    timezone: userData.prefs?.tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  metadata: {
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
    version: userData.__v,
  },
};

// Inferred 8 additional fields from UserProfile interface
// and 3 files using this function`,
  ],

  // ═══════════════════════════════════════
  // CHROME — 9 buttons
  // ═══════════════════════════════════════

  'chrome-0': [ // Summarize
    `TL;DR: EU AI Act requires AI companies to disclose training
data sources and complete risk assessments by 2027.`,

    `Summary: The EU AI Act introduces mandatory transparency
requirements for AI developers. Key provisions include:

\u2192 Training data disclosure for all foundation models
\u2192 Risk assessments for high-impact AI systems
\u2192 Penalties up to 7% of global revenue
\u2192 18-month compliance window starting Q1 2026

The regulation affects all companies serving EU users,
regardless of where they're headquartered.`,

    `Comprehensive Analysis: EU AI Act \u2014 Impact Assessment

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
   \u2192 Mar 2024: Act finalized
   \u2192 Aug 2025: Unacceptable AI practices banned
   \u2192 Feb 2027: Full compliance deadline

IMPACT: Affects estimated 6,800+ companies globally.`,
  ],

  'chrome-1': [ // Translate
    `[FR] L'UE exige la divulgation des donn\u00E9es d'entra\u00EEnement de l'IA d'ici 2027.`,

    `Translation (French):

La loi europ\u00E9enne sur l'IA introduit des exigences de
transparence obligatoires pour les d\u00E9veloppeurs d'IA.

Points cl\u00E9s :
\u2192 Divulgation des donn\u00E9es d'entra\u00EEnement
\u2192 \u00C9valuations des risques pour les syst\u00E8mes \u00E0 haut impact
\u2192 Amendes jusqu'\u00E0 7% du chiffre d'affaires mondial
\u2192 D\u00E9lai de conformit\u00E9 de 18 mois`,

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
    "title": "EU AI Act \u2014 Complete Overview",
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
1. Training Data Audit \u2014 We need to catalog all data
   sources used in our foundation models. I'd suggest
   Sarah leads this with a 2-week deadline.

2. Risk Classification \u2014 Our customer-facing AI falls
   under "Limited Risk" but the B2B product may qualify
   as "High Risk" given its use in hiring workflows.

3. Legal Review \u2014 Recommend engaging outside counsel
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

    `CITATION BUNDLE \u2014 Multiple Formats

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
\u2192 Tell people what data they used to train their AI
\u2192 Check if their AI could cause harm
\u2192 Follow the rules or pay big fines

Deadline: February 2027
Who it affects: Any company whose AI is used in Europe`,

    `SIMPLIFIED VERSION \u2014 Reading Level: Grade 8

THE EU'S NEW AI RULES (EXPLAINED SIMPLY)

What happened?
The European Union made the first big rulebook for
artificial intelligence. Think of it like traffic laws,
but for AI companies.

Why does it matter?
Right now, AI companies can do pretty much whatever they
want. These new rules change that.

The rules say:
1. BE HONEST \u2014 Tell people what information you used
   to teach your AI. No secrets.

2. BE CAREFUL \u2014 If your AI is used for important things
   like healthcare or hiring, you need extra checks.

3. DON'T BE CREEPY \u2014 Some uses of AI are just banned.
   Like rating people's "social score."

What if companies break the rules?
They pay HUGE fines \u2014 up to 7% of all the money they
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
| Fine amount   | 7%        | 7% \u2714\uFE0F    | 6% \u274C      |
| Deadline      | Feb 2027  | Feb 2027 | 2027 \u2714\uFE0F   |
| Risk tiers    | 4         | 4 \u2714\uFE0F     | 3 \u274C       |

Verdict: This article is accurate. TechCrunch has
minor inaccuracies on fine percentage and risk tiers.`,

    `COMPREHENSIVE SOURCE COMPARISON

Compared against 5 authoritative sources:
\u2022 Reuters \u2022 TechCrunch \u2022 Ars Technica \u2022 EUR-Lex \u2022 BBC

ACCURACY MATRIX
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Claim          \u2502 Match \u2502 Conf  \u2502 Note  \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 7% fine cap    \u2502  5/5  \u2502  99%  \u2502       \u2502
\u2502 4 risk tiers   \u2502  4/5  \u2502  95%  \u2502 TC: 3 \u2502
\u2502 Feb 2027       \u2502  5/5  \u2502  99%  \u2502       \u2502
\u2502 6,800 cos.     \u2502  2/5  \u2502  72%  \u2502 Unverified\u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

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
    `\u2022 EU AI Act requires transparency from AI companies by 2027`,

    `KEY TAKEAWAYS:

1. \u{1F3DB}\uFE0F First comprehensive AI regulation in the world
2. \u{1F4CA} Four-tier risk classification system
3. \u{1F4B0} Fines up to 7% of global revenue
4. \u{1F4C5} Full compliance deadline: February 2027
5. \u{1F30D} Applies to any company serving EU users`,

    `KEY POINTS EXTRACTED

MUST KNOW (Critical)
\u2022 The EU AI Act is the world's first comprehensive AI law
\u2022 All AI companies serving EU users must comply
\u2022 Non-compliance fines: up to \u20AC35M or 7% of revenue
\u2022 Full compliance deadline: February 2027

SHOULD KNOW (Important)
\u2022 AI systems classified into 4 risk tiers
\u2022 Social scoring and real-time biometric surveillance banned
\u2022 High-risk AI requires third-party audits
\u2022 Training data sources must be disclosed

NICE TO KNOW (Context)
\u2022 Act was finalized in March 2024
\u2022 Modeled partially on GDPR enforcement structure
\u2022 Estimated 6,800+ companies affected globally
\u2022 National authorities handle enforcement

ACTION ITEMS FOR YOUR TEAM:
\u2610 Classify your AI systems by risk tier
\u2610 Begin training data documentation
\u2610 Consult legal for compliance roadmap`,
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

\u25B6 Press play to start | \u{1F3A7} Headphones recommended`,

    `[AUDIO GENERATION COMPLETE]

Voice Settings:
\u2022 Voice: Neural2-F (natural, warm)
\u2022 Language: English (US)
\u2022 Speed: 1.0x (adjustable 0.5x \u2014 2.0x)
\u2022 Duration: 4m 28s
\u2022 Word count: 682

Chapters Generated:
  00:00 \u2014 Overview
  00:45 \u2014 Key Provisions
  01:30 \u2014 Risk Classification
  02:15 \u2014 Enforcement & Fines
  03:00 \u2014 Timeline
  03:45 \u2014 Global Impact

Accessibility Features:
\u2714\uFE0F SSML markup for proper pronunciation
\u2714\uFE0F Emphasis on key terms and numbers
\u2714\uFE0F Natural pauses at section breaks
\u2714\uFE0F Downloadable as MP3 (2.1MB)

\u25B6 Ready to play | \u23EF Chapters enabled`,
  ],

  // ═══════════════════════════════════════
  // FIGMA — 9 buttons
  // ═══════════════════════════════════════

  'figma-0': [ // Alt Text
    `alt="Blue signup button with white text"`,

    `Component: Primary CTA Button
alt="Large blue signup button reading 'Get Started Free'
     positioned center-right of the hero section"

Accessibility Notes:
\u2192 Color contrast ratio: 7.2:1 (passes AAA)
\u2192 Touch target: 48x44px (meets minimum)
\u2192 Consider adding aria-label for screen readers`,

    `Accessibility Audit \u2014 Hero Section CTA

COMPONENT: Primary Call-to-Action Button
alt="Large royal blue (#2563EB) button with white text
     reading 'Get Started Free' with right arrow icon,
     positioned in the hero section below the headline"

WCAG 2.1 COMPLIANCE REPORT
\u251C\u2500\u2500 Color Contrast: 7.2:1 \u2705 (AAA)
\u251C\u2500\u2500 Touch Target: 48x44px \u2705 (WCAG 2.5.5)
\u251C\u2500\u2500 Focus Indicator: Not detected \u26A0\uFE0F
\u251C\u2500\u2500 Keyboard Nav: Needs tabindex verification \u26A0\uFE0F
\u2514\u2500\u2500 Screen Reader: Missing aria-label \u274C

RECOMMENDATIONS
1. Add focus-visible outline (3px solid #1D4ED8)
2. Add aria-label="Sign up for free account"
3. Add role="button" if using <div> instead of <button>

SUGGESTED HTML:
<button
  class="cta-primary"
  aria-label="Sign up for free account"
  aria-describedby="pricing-note">
  Get Started Free \u2192
</button>`,
  ],

  'figma-1': [ // Color Fix
    `\u26A0\uFE0F Text #888 on #FFF \u2192 Contrast 3.5:1 (fails AA). Fix: use #595959.`,

    `COLOR ACCESSIBILITY FIXES:

1. Body text: #888888 on #FFFFFF
   Contrast: 3.5:1 \u274C Fails AA
   \u2192 Fix: #595959 (7.0:1 \u2714\uFE0F AAA)

2. Link text: #5B9FFF on #FFFFFF
   Contrast: 3.1:1 \u274C Fails AA
   \u2192 Fix: #2563EB (4.6:1 \u2714\uFE0F AA)

3. Button text: #FFFFFF on #3B82F6
   Contrast: 4.5:1 \u2714\uFE0F Passes AA

2 of 3 elements need fixes.`,

    `FULL COLOR ACCESSIBILITY AUDIT

Scanned: 24 text elements across 8 frames

FAILURES (6 elements):
\u274C Subheading: #888 on #FFF \u2192 3.5:1
  Fix: #595959 (7.0:1 AAA)
\u274C Caption: #AAA on #F5F5F5 \u2192 1.9:1
  Fix: #717171 (4.6:1 AA)
\u274C Link hover: #93C5FD on #FFF \u2192 2.1:1
  Fix: #2563EB (4.6:1 AA)
\u274C Placeholder: #CCC on #FFF \u2192 1.6:1
  Fix: #767676 (4.5:1 AA)
\u274C Disabled btn: #999 on #E5E5E5 \u2192 2.3:1
  Fix: #6B6B6B on #E5E5E5 (4.5:1 AA)
\u274C Footer link: #666 on #1A1A2E \u2192 3.8:1
  Fix: #9CA3AF (5.2:1 AA)

PASSES (18 elements): All good \u2714\uFE0F

SUMMARY: 75% compliance (18/24)
After fixes: 100% WCAG AA compliance
Apply all fixes? [One click to update]`,
  ],

  'figma-2': [ // Layout
    `Suggestion: Increase card spacing from 12px to 16px.`,

    `LAYOUT SUGGESTIONS:

1. Card Grid \u2192 Increase gap from 12px to 16px
2. Hero section \u2192 Add 80px top padding for breathing room
3. Sidebar \u2192 Fix 280px width, currently collapses at 1024px
4. CTA cluster \u2192 Align to 8px grid (currently off by 2px)

Auto-layout confidence: 92%`,

    `AI LAYOUT ANALYSIS

Current layout issues detected: 7

SPACING FIXES:
\u2022 Card grid gap: 12px \u2192 16px (match 8px grid)
\u2022 Section padding: 48px \u2192 64px (better rhythm)
\u2022 Hero top padding: 40px \u2192 80px (breathing room)

ALIGNMENT FIXES:
\u2022 CTA button: off 8px grid by 2px
\u2022 Feature icons: inconsistent 4px offset
\u2022 Footer columns: uneven width distribution

RESPONSIVE SUGGESTIONS:
\u2022 Desktop (1440px): 3-column, 16px gaps
\u2022 Tablet (768px): 2-column, 12px gaps
\u2022 Mobile (375px): 1-column, stacked, 8px gaps

COMPONENT STRUCTURE:
  Page
  \u251C\u2500 Header (fixed, h=72)
  \u251C\u2500 Hero (min-h=480, flex-center)
  \u251C\u2500 Features (grid 3-col, gap=16)
  \u251C\u2500 Pricing (grid 3-col, gap=24)
  \u2514\u2500 Footer (grid 4-col, py=64)

Would you like me to apply these changes?`,
  ],

  'figma-3': [ // Copy
    `Button: "Get Started Free"`,

    `UI COPY SUGGESTIONS:

Hero headline: "Ship faster with AI"
Hero subline: "Automate the boring parts of development"
CTA primary: "Start building \u2014 it's free"
CTA secondary: "See how it works"
Social proof: "Trusted by 12,000+ developers"

Tone: Confident, casual, developer-friendly`,

    `UI COPY & MICROCOPY AUDIT

HERO SECTION:
  Headline: "Ship faster with AI"
  Subline: "Automate the boring parts of development.
    Focus on what matters."
  CTA: "Start building \u2014 it's free"
  Secondary: "Watch 2-min demo"

FEATURE CARDS:
  Card 1: "Lightning Fast" / "Deploy in under 30 seconds"
  Card 2: "Battle Tested" / "99.9% uptime, guaranteed"
  Card 3: "Open Source" / "MIT licensed. Fork it, own it."

FORM MICROCOPY:
  Email placeholder: "work@company.com"
  Submit: "Create account"
  Error: "Hmm, that doesn't look like an email"
  Success: "You're in! Check your inbox."
  Loading: "Setting up your workspace..."

EMPTY STATES:
  No projects: "Your first project is one click away"
  No results: "Nothing matched. Try different keywords?"

TONE GUIDE: Confident but not arrogant. Casual but
professional. Use contractions. Avoid jargon.
Reading level: Grade 7-8 target.`,
  ],

  'figma-4': [ // Variants
    `Generated: Default, Hover, Active, Disabled states.`,

    `COMPONENT VARIANTS GENERATED:

Button / Primary:
  \u251C\u2500 State: Default | Hover | Active | Disabled | Loading
  \u251C\u2500 Size: Small (32h) | Medium (40h) | Large (48h)
  \u2514\u2500 Icon: None | Left | Right | Only

Total: 5 \u00D7 3 \u00D7 4 = 60 variants
Auto-layout: Applied with 8px internal padding`,

    `FULL VARIANT MATRIX GENERATED

BUTTON COMPONENT
States: Default | Hover | Active | Focus | Disabled | Loading
Sizes: XS (24h) | SM (32h) | MD (40h) | LG (48h) | XL (56h)
Types: Primary | Secondary | Ghost | Danger | Success
Icons: None | Left | Right | Icon-only

Total variants: 6 \u00D7 5 \u00D7 5 \u00D7 4 = 600

INPUT COMPONENT
States: Default | Focus | Filled | Error | Disabled
Sizes: SM (36h) | MD (44h) | LG (52h)
Types: Text | Email | Password | Search | Number
Addons: None | Left icon | Right icon | Both

Total variants: 5 \u00D7 3 \u00D7 5 \u00D7 4 = 300

CARD COMPONENT
States: Default | Hover | Selected
Sizes: Compact | Standard | Featured
Types: Product | Profile | Stat | Media

Total variants: 3 \u00D7 3 \u00D7 4 = 36

GRAND TOTAL: 936 variants generated
All variants use consistent 8px grid
and shared design tokens.`,
  ],

  'figma-5': [ // Inspect
    `\u2714\uFE0F Follows design system. 1 minor spacing deviation.`,

    `DESIGN SYSTEM INSPECTION:

\u2714\uFE0F Typography: Uses system font stack correctly
\u2714\uFE0F Colors: All from approved palette
\u2714\uFE0F Border radius: Consistent 8px
\u26A0\uFE0F Spacing: Card padding 14px (should be 16px)
\u26A0\uFE0F Icon size: 18px (system uses 20px)

Score: 87/100 \u2014 2 minor deviations`,

    `DESIGN SYSTEM COMPLIANCE REPORT

Score: 87/100

TYPOGRAPHY (22/25)
\u2714\uFE0F Font family: Inter \u2014 correct
\u2714\uFE0F Heading sizes: Match type scale
\u2714\uFE0F Line heights: Correct
\u26A0\uFE0F Body size: 15px (system: 14px or 16px)

COLORS (25/25)
\u2714\uFE0F Primary: #2563EB \u2714\uFE0F
\u2714\uFE0F Neutral: Correct gray scale
\u2714\uFE0F Semantic: Success/Warning/Error correct
\u2714\uFE0F No hardcoded values found

SPACING (18/25)
\u26A0\uFE0F Card padding: 14px (should be 16px)
\u26A0\uFE0F Section gap: 52px (should be 48px or 64px)
\u2714\uFE0F Component gaps: On 8px grid
\u2714\uFE0F Margins: Consistent

COMPONENTS (22/25)
\u2714\uFE0F Using shared button component
\u2714\uFE0F Using shared input component
\u26A0\uFE0F Custom card (not from library)
\u2714\uFE0F Icons from approved set

RECOMMENDATION: Fix 4 minor deviations.
Auto-fix available for spacing issues.`,
  ],

  'figma-6': [ // Animate
    `Suggestion: Add 200ms ease-out fade-in on card hover.`,

    `ANIMATION SUGGESTIONS:

1. Cards: Scale 1.02 + shadow on hover (200ms ease-out)
2. Page load: Stagger fade-in, 80ms delay per card
3. CTA button: Subtle pulse every 3s to draw attention
4. Scroll: Parallax on hero image (0.5x speed)

All durations follow Material Design guidelines.`,

    `MICRO-INTERACTION DESIGN SPEC

PAGE LOAD SEQUENCE:
  0ms    \u2014 Header slides down (300ms, ease-out)
  100ms  \u2014 Hero text fades up (400ms, ease-out)
  300ms  \u2014 CTA scales in (300ms, spring)
  500ms  \u2014 Feature cards stagger (80ms each, fade-up)

HOVER INTERACTIONS:
  Cards: translateY(-4px) + shadow elevation (200ms)
  Buttons: brightness(1.1) + scale(1.02) (150ms)
  Links: underline slides in from left (200ms)
  Icons: rotate(5deg) + color shift (200ms)

SCROLL ANIMATIONS:
  Hero image: parallax at 0.5x scroll speed
  Stats: Count up animation when in viewport
  Sections: fade-up with 20px translate (400ms)
  Progress bars: Width animates on scroll-into-view

CLICK FEEDBACK:
  Buttons: scale(0.98) then scale(1) (100ms)
  Cards: Ripple effect from click point (400ms)

TRANSITIONS:
  Page: Crossfade (300ms ease)
  Modal: Scale from 0.95 + fade (250ms spring)
  Drawer: Slide from right (300ms ease-out)

Easing: cubic-bezier(0.16, 1, 0.3, 1) for spring
GPU-accelerated: transform + opacity only`,
  ],

  'figma-7': [ // Resize
    `Suggestion: Stack cards vertically below 768px.`,

    `RESPONSIVE RESIZE PLAN:

Desktop (1440px):
  Grid: 3 columns | Hero: side-by-side | Nav: horizontal

Tablet (768px):
  Grid: 2 columns | Hero: stacked | Nav: hamburger menu

Mobile (375px):
  Grid: 1 column | Hero: stacked | Nav: bottom sheet
  CTA: Full-width sticky bottom bar

Breakpoints follow Tailwind defaults.`,

    `RESPONSIVE DESIGN SPECIFICATION

BREAKPOINTS:
  sm: 640px | md: 768px | lg: 1024px | xl: 1280px

DESKTOP (1280px+):
  Layout: 12-col grid, 32px gutters
  Hero: 50/50 split (text left, image right)
  Features: 3-col grid, 24px gap
  Sidebar: 280px fixed, content fills

TABLET (768px - 1279px):
  Layout: 8-col grid, 24px gutters
  Hero: Full-width stacked (text \u2192 image)
  Features: 2-col grid, 16px gap
  Sidebar: Collapsible drawer

MOBILE (< 768px):
  Layout: 4-col grid, 16px gutters
  Hero: Full-width stacked, centered text
  Features: Single column, card stack
  Nav: Bottom tab bar (5 items max)
  CTA: Sticky bottom bar (56px height)

SPECIAL HANDLING:
  \u2022 Tables: Horizontal scroll with fade edge
  \u2022 Images: Art direction via <picture> tag
  \u2022 Typography: Fluid scale clamp(16px, 2vw, 20px)
  \u2022 Touch targets: Minimum 44x44px on mobile
  \u2022 Spacing: Scale down by 0.75x on mobile

Generated 3 responsive frames in Figma.`,
  ],

  'figma-8': [ // Feedback
    `Overall: Clean layout. Consider adding more whitespace in hero section.`,

    `DESIGN CRITIQUE:

\u2714\uFE0F Strengths:
  - Clean typography hierarchy
  - Consistent color usage
  - Good use of whitespace in cards

\u26A0\uFE0F Improvements:
  - Hero section feels cramped \u2014 add 40px more padding
  - CTA competes with navigation \u2014 increase size
  - Feature icons lack visual weight
  - Footer feels disconnected from the rest`,

    `COMPREHENSIVE DESIGN REVIEW

OVERALL SCORE: 7.8 / 10

VISUAL HIERARCHY (8/10)
\u2714\uFE0F Clear heading hierarchy (H1 \u2192 H2 \u2192 H3)
\u2714\uFE0F CTA is the most prominent element
\u26A0\uFE0F Secondary actions compete for attention
\u26A0\uFE0F Feature section lacks a clear focal point

LAYOUT & SPACING (7/10)
\u2714\uFE0F Consistent grid usage
\u2714\uFE0F Good card component structure
\u26A0\uFE0F Hero section needs more vertical breathing room
\u26A0\uFE0F Uneven section spacing (48px, 64px, 52px)
\u274C Footer margins are inconsistent

COLOR & CONTRAST (9/10)
\u2714\uFE0F Cohesive palette with clear hierarchy
\u2714\uFE0F Good use of accent color for CTAs
\u26A0\uFE0F Consider a warmer neutral for less sterile feel

TYPOGRAPHY (8/10)
\u2714\uFE0F Clean, readable body text
\u2714\uFE0F Good use of font weights for hierarchy
\u26A0\uFE0F Line length exceeds 75ch in some areas

TOP 3 RECOMMENDATIONS:
1. Add 40px padding above hero headline
2. Reduce feature section to 3 key items
3. Unify section spacing to 64px

This design is 80% production-ready.
Estimated fixes: 2-3 hours of polish.`,
  ],

  // ═══════════════════════════════════════
  // SLACK — 9 buttons
  // ═══════════════════════════════════════

  'slack-0': [ // Tone Shift
    `yo team \u2014 shipped the auth fix, lmk if anything looks weird \u{1F680}`,

    `Hey team, just pushed the authentication fix to staging.
Please review when you get a chance and flag any issues.
The main changes are in the token refresh logic.`,

    `Team \u2014 I've deployed the authentication service patch
(v2.4.1) to the staging environment.

Summary of Changes:
\u2022 Resolved token refresh vulnerability (SEC-2024-089)
\u2022 Updated JWT expiration handling
\u2022 Added retry logic for failed refresh attempts (max 3)

Action Required:
Please complete your review by EOD Thursday, Feb 12.
QA sign-off needed from @sarah and @mike before
production deployment scheduled for Friday AM.

Rollback plan documented in Confluence: AUTH-ROLLBACK-v2`,
  ],

  'slack-1': [ // Standup
    `Done: Auth fix. Today: Deploy to staging. No blockers.`,

    `\u{1F7E2} Yesterday: Completed auth token refresh fix
\u{1F535} Today: Deploy to staging, start QA
\u{1F534} Blockers: Waiting on DevOps for staging access
\u{1F4AC} Note: May need extra day for load testing`,

    `DAILY STANDUP \u2014 Feb 10, 2026

COMPLETED (Yesterday):
\u2022 Resolved SEC-2024-089: Token refresh vulnerability
\u2022 Added comprehensive test suite (14 new tests, all passing)
\u2022 Updated API documentation for auth endpoints
\u2022 Code review for PR #847 (Maria's caching update)

IN PROGRESS (Today):
\u2022 Deploy auth patch v2.4.1 to staging
\u2022 Run integration tests against staging environment
\u2022 Begin load testing with simulated 10K concurrent users
\u2022 Prep rollback runbook for production deployment

BLOCKED:
\u2022 Staging deploy: Need DevOps to approve security group change
  Owner: @david | ETA: This morning
\u2022 Load test infra: Waiting on AWS quota increase
  Owner: @infra-team | ETA: Tomorrow

NOTES:
\u2022 Production deploy targeting Friday 6AM EST
\u2022 Will need @sarah and @mike for QA sign-off by Thursday
\u2022 Risk: If load tests reveal issues, may push to Monday`,
  ],

  'slack-2': [ // Thread Sum
    `Thread summary: Team decided to use JWT with 15-min expiry.`,

    `THREAD SUMMARY (23 messages, 6 participants):

Decision: Use JWT tokens with 15-minute expiry
and refresh tokens with 7-day expiry.

Key points discussed:
\u2022 @alex proposed session-based auth (rejected \u2014 doesn't scale)
\u2022 @sarah flagged security concern with long-lived tokens
\u2022 @mike suggested 15-min window (team agreed)
\u2022 @david will handle the Redis session store setup

Action: @alex to implement by Friday`,

    `THREAD SUMMARY
23 messages \u2022 6 participants \u2022 2h 14m duration

CONTEXT:
Discussion about authentication architecture for the
new microservices platform. Started by @alex asking
for input on token strategy.

DISCUSSION FLOW:
1. @alex: Proposed session-based auth using Redis
   \u2192 @sarah: Concerned about horizontal scaling
   \u2192 @mike: Agreed, suggested JWT instead

2. @sarah: Raised security concerns about JWT
   \u2192 Long-lived tokens are a risk if compromised
   \u2192 @david: Suggested short expiry + refresh tokens

3. @mike: Proposed 15-min access / 7-day refresh
   \u2192 Team consensus reached
   \u2192 @alex: Agreed, will implement

4. @david: Volunteered to set up Redis for refresh
   token storage and revocation list

DECISIONS MADE:
\u2705 JWT with 15-minute access token expiry
\u2705 Refresh tokens with 7-day expiry, stored in Redis
\u2705 Token revocation list for security incidents
\u2717 Session-based auth (rejected \u2014 scaling concerns)

ACTION ITEMS:
\u2610 @alex: Implement JWT auth service (Due: Friday)
\u2610 @david: Set up Redis cluster (Due: Thursday)
\u2610 @sarah: Write security test cases (Due: Friday)
\u2610 @mike: Update API gateway config (Due: Thursday)

UNRESOLVED:
\u2022 Rate limiting strategy for token refresh endpoint
\u2022 Mobile app token storage approach`,
  ],

  'slack-3': [ // Actions
    `Action: @alex to deploy fix by Friday.`,

    `ACTION ITEMS EXTRACTED:

\u2610 @alex \u2014 Deploy auth fix to staging (Due: Wed)
\u2610 @sarah \u2014 QA sign-off on auth changes (Due: Thu)
\u2610 @mike \u2014 Update monitoring dashboards (Due: Thu)
\u2610 @david \u2014 Approve staging security group (Due: Today)

Priority: \u{1F534} @david is blocking the rest`,

    `ACTION ITEMS \u2014 Extracted from 3 threads

HIGH PRIORITY (Blocking):
\u2610 @david: Approve staging security group change
  Source: #deploy-requests, Today
  Blocks: Staging deployment, QA, production release

\u2610 @alex: Deploy auth patch v2.4.1 to staging
  Source: #engineering, Feb 10
  Due: Wednesday | Blocked by: @david

MEDIUM PRIORITY:
\u2610 @sarah: Complete QA sign-off on auth changes
  Source: #engineering, Feb 10
  Due: Thursday | Depends on: staging deploy

\u2610 @mike: Update Datadog monitoring dashboards
  Source: #engineering, Feb 10
  Due: Thursday | Independent

\u2610 @alex: Prepare rollback runbook
  Source: #deploy-requests, Feb 9
  Due: Thursday | Independent

LOW PRIORITY:
\u2610 @maria: Update API docs for auth endpoints
  Source: #documentation, Feb 8
  Due: Next week | Independent

DEPENDENCY CHAIN:
@david (today) \u2192 @alex (Wed) \u2192 @sarah (Thu) \u2192 DEPLOY (Fri)

\u26A0\uFE0F RISK: If @david's approval slips, the entire
Friday production deployment is at risk.`,
  ],

  'slack-4': [ // React
    `Suggested: \u{1F680} (shipped)`,

    `Suggested Reactions:

\u{1F680} \u2014 Great, shipped!
\u{1F44D} \u2014 Acknowledged
\u{1F440} \u2014 I'll take a look
\u{1F3AF} \u2014 Spot on / good catch

Context: deployment announcement \u2192 \u{1F680} is most appropriate`,

    `EMOJI REACTION SUGGESTIONS

Based on message context (deployment announcement):

BEST MATCH:
\u{1F680} :rocket: \u2014 "Shipped! Nice work" (92% fit)

ALTERNATIVES:
\u{1F389} :tada: \u2014 "Celebration / milestone" (85% fit)
\u{1F44F} :clap: \u2014 "Well done, team" (80% fit)
\u2705 :white_check_mark: \u2014 "Acknowledged" (75% fit)
\u{1F4AA} :muscle: \u2014 "Strong work" (70% fit)

AVOID:
\u{1F440} :eyes: \u2014 Could imply skepticism here
\u{1F914} :thinking: \u2014 Wrong tone for celebration

TEAM PATTERNS:
Your team typically uses \u{1F680} for deploys (used 47 times)
and \u{1F389} for milestones (used 23 times).

Auto-react with \u{1F680}?`,
  ],

  'slack-5': [ // Schedule
    `Best time: Tomorrow 10:15 AM (most team members online)`,

    `SMART SCHEDULE SUGGESTION:

Message: Auth deployment announcement
Recipients: #engineering (12 members)

\u2192 Best time: Tuesday 10:15 AM EST
  \u2022 11/12 members typically online
  \u2022 After standup, before deep work blocks
  \u2022 Avoids Monday inbox overload

Alternative: Tuesday 2:00 PM EST (10/12 online)
Avoid: Before 9 AM or after 5 PM (low engagement)`,

    `SMART SCHEDULING ANALYSIS

Message Type: Important announcement (deployment)
Channel: #engineering (12 members)
Urgency: High (needs action before Friday)

RECOMMENDED TIMES (ranked by team availability):

1. \u2B50 Tue 10:15 AM EST \u2014 Score: 94/100
   Online: 11/12 members
   Reason: Post-standup, high engagement window
   Response time prediction: <15 min avg

2. Tue 2:00 PM EST \u2014 Score: 82/100
   Online: 10/12 members
   Reason: Post-lunch, second attention peak

3. Wed 10:00 AM EST \u2014 Score: 78/100
   Online: 10/12 members
   Reason: Midweek, good but delays action items

AVOID THESE TIMES:
\u274C Mon 9 AM \u2014 Inbox overload, low read rate
\u274C Fri 4 PM \u2014 Weekend mode, 40% lower engagement
\u274C Any time after 6 PM \u2014 Only 3/12 active

TEAM ACTIVITY PATTERNS:
Peak hours: 10-11 AM, 2-3 PM
Slowest: 12-1 PM (lunch), after 5 PM
@david (blocker): Most active 9-11 AM

Schedule for Tue 10:15 AM?`,
  ],

  'slack-6': [ // Translate
    `[ES] Equipo, acabo de desplegar el parche de autenticaci\u00F3n.`,

    `TRANSLATION (Spanish):

Equipo \u2014 He desplegado el parche del servicio de
autenticaci\u00F3n (v2.4.1) en el entorno de staging.

Cambios principales:
\u2022 Vulnerabilidad de actualizaci\u00F3n de tokens resuelta
\u2022 L\u00F3gica de reintento a\u00F1adida (m\u00E1ximo 3 intentos)

Acci\u00F3n requerida: Revisi\u00F3n antes del jueves.`,

    `MULTI-LANGUAGE TRANSLATION

[Spanish]
Equipo \u2014 He desplegado el parche del servicio de
autenticaci\u00F3n (v2.4.1) en el entorno de staging.
Se requiere revisi\u00F3n antes del jueves.

[Portuguese]
Equipe \u2014 Implantei o patch do servi\u00E7o de autentica\u00E7\u00E3o
(v2.4.1) no ambiente de staging. Revis\u00E3o necess\u00E1ria
at\u00E9 quinta-feira.

[Japanese]
\u30C1\u30FC\u30E0 \u2014 \u8A8D\u8A3C\u30B5\u30FC\u30D3\u30B9\u30D1\u30C3\u30C1(v2.4.1)\u3092\u30B9\u30C6\u30FC\u30B8\u30F3\u30B0
\u74B0\u5883\u306B\u30C7\u30D7\u30ED\u30A4\u3057\u307E\u3057\u305F\u3002\u6728\u66DC\u65E5\u307E\u3067\u306B\u30EC\u30D3\u30E5\u30FC
\u3092\u304A\u9858\u3044\u3057\u307E\u3059\u3002

Tone preserved: Professional / Direct
Technical terms kept in English: staging, QA, JWT
Confidence: 96%`,
  ],

  'slack-7': [ // Template
    `[Deployment] Auth fix v2.4.1 shipped to staging.`,

    `\u{1F4E6} DEPLOYMENT NOTICE

Service: Authentication Service
Version: v2.4.1
Environment: Staging
Status: \u2705 Deployed

Changes: Token refresh vulnerability fix
Rollback: AUTH-ROLLBACK-v2
Owner: @alex
QA needed: @sarah @mike`,

    `\u{1F4E6} DEPLOYMENT NOTICE \u2014 AUTH SERVICE

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
Service:     Authentication Service
Version:     v2.4.1 (prev: v2.4.0)
Environment: Staging
Deployed by: @alex
Timestamp:   2026-02-10 14:32 EST
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

CHANGES:
\u2022 [SEC-2024-089] Token refresh vulnerability fix
\u2022 JWT expiration race condition resolved
\u2022 Retry logic added (max 3 attempts)

TESTING:
\u2022 Unit tests: 147/147 passing \u2705
\u2022 Integration: 23/23 passing \u2705
\u2022 Load test: Pending

ACTION REQUIRED:
\u2610 @sarah \u2014 QA sign-off (Due: Thu)
\u2610 @mike \u2014 QA sign-off (Due: Thu)

ROLLBACK:
Plan: AUTH-ROLLBACK-v2 (Confluence)
Command: deploy auth-service v2.4.0 --env staging

PRODUCTION TARGET: Friday Feb 13, 6:00 AM EST
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
  ],

  'slack-8': [ // Announce
    `Hey team! Auth fix is live on staging. Please test when you can.`,

    `\u{1F4E2} Team Announcement

The authentication service patch is now live on staging.

What changed:
\u2022 Fixed the token refresh bug reported last week
\u2022 Added automatic retry for failed refreshes

What we need from you:
\u2022 Test your usual workflows on staging today
\u2022 Report any auth issues in #bugs
\u2022 QA team: formal sign-off needed by Thursday

Thanks everyone! \u{1F64F}`,

    `\u{1F4E2} TEAM ANNOUNCEMENT \u2014 Authentication Update

Hi everyone,

I'm pleased to share that the authentication service
patch (v2.4.1) has been successfully deployed to our
staging environment.

BACKGROUND:
Last week, our security team identified a vulnerability
in the token refresh mechanism (SEC-2024-089) that could
allow expired tokens to remain valid. This patch resolves
that issue.

WHAT'S CHANGED:
\u2022 Token refresh is now atomic and race-condition free
\u2022 Failed refresh attempts automatically retry (up to 3x)
\u2022 Refresh tokens are now stored in Redis with revocation
\u2022 All auth endpoints have updated rate limiting

WHAT WE NEED FROM YOU:
1. Please test your normal workflows on staging
2. Report any authentication issues in #bugs immediately
3. QA team (@sarah, @mike): Formal sign-off by Thursday

TIMELINE:
\u2022 Now: Staging testing
\u2022 Thursday: QA sign-off deadline
\u2022 Friday 6 AM: Production deployment

If you have questions or concerns, please reach out in
#engineering or DM me directly.

Thank you for your patience while we addressed this.
The team did excellent work turning this around quickly.

\u2014 Alex`,
  ],

  // ═══════════════════════════════════════
  // EXCEL — 9 buttons
  // ═══════════════════════════════════════

  'excel-0': [ // Formula
    `=AVERAGE(B2:B100)

Result: $42,350`,

    `Revenue Analysis \u2014 Column B (B2:B100)

=AVERAGE(B2:B100)     \u2192 $42,350 (mean)
=MEDIAN(B2:B100)      \u2192 $38,200 (median)
=STDEV(B2:B100)       \u2192 $12,450 (std dev)
=MAX(B2:B100)         \u2192 $89,400 (peak: Row 34)
=MIN(B2:B100)         \u2192 $8,200  (low: Row 71)

\u26A0\uFE0F High variance detected \u2014 consider segmented analysis`,

    `Comprehensive Revenue Analysis \u2014 Q4 Dataset

DESCRIPTIVE STATISTICS
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Mean:     $42,350  \u2502 Median:  $38,200 \u2502
\u2502 Std Dev:  $12,450  \u2502 CV:      29.4%   \u2502
\u2502 Skewness: 0.82     \u2502 Kurtosis: 2.1    \u2502
\u2502 Range:    $81,200  \u2502 IQR:     $15,800 \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

REGRESSION MODEL
Revenue = 1.2\u00D7AdSpend + 0.8\u00D7HeadCount - 15,200
R\u00B2 = 0.84 | p < 0.001

ANOMALIES DETECTED (3 entries)
\u2192 Row 23: $89,400 (3.8\u03C3 above mean)
\u2192 Row 71: $8,200 (2.7\u03C3 below mean)
\u2192 Row 45: $0 (likely data entry error)

FORMULAS GENERATED:
=AVERAGE(B2:B100)
=MEDIAN(B2:B100)
=STDEV(B2:B100)
=PERCENTILE(B2:B100, 0.25)
=PERCENTILE(B2:B100, 0.75)`,
  ],

  'excel-1': [ // Chart
    `Recommended: Bar chart for revenue comparison.`,

    `CHART RECOMMENDATION:

Best fit: Grouped Bar Chart
\u2022 X-axis: Month (Jan\u2013Dec)
\u2022 Y-axis: Revenue ($)
\u2022 Series: By Region (NE, SW, MW, SE)

Alternative: Line chart if showing trend over time
Avoid: Pie chart (too many categories)

Colors: Use sequential blue palette for regions`,

    `SMART CHART ANALYSIS

DATA PROFILE:
\u2022 Type: Time series + categorical
\u2022 Rows: 99 data points
\u2022 Columns: Date, Revenue, Region, Category

RECOMMENDED CHARTS (ranked):

1. \u2B50 GROUPED BAR CHART (Score: 95)
   Best for comparing revenue across regions
   X: Month | Y: Revenue | Color: Region

2. LINE CHART WITH MARKERS (Score: 88)
   Best for showing revenue trend over time
   X: Date | Y: Revenue | Lines: Region

3. STACKED AREA CHART (Score: 75)
   Shows cumulative and individual contributions
   Good for seeing total + breakdown

AVOID:
\u274C Pie chart \u2014 Too many categories (4 regions)
\u274C 3D charts \u2014 Distorts perception
\u274C Dual axis \u2014 Misleading scale differences

FORMATTING SPEC:
\u2022 Title: "Q4 Revenue by Region"
\u2022 Palette: #2563EB, #7C3AED, #059669, #D97706
\u2022 Grid: Horizontal only, #F0F0F0
\u2022 Legend: Bottom, horizontal
\u2022 Axis labels: $0K \u2014 $100K
\u2022 Annotations: Mark anomalies at Row 23, 71

Chart generated and inserted at Sheet1!D2.`,
  ],

  'excel-2': [ // Clean
    `Cleaned: Removed 3 duplicates, trimmed whitespace in column A.`,

    `DATA CLEANING REPORT:

\u2714\uFE0F Removed 3 duplicate rows (rows 15, 42, 88)
\u2714\uFE0F Trimmed whitespace in Column A (12 cells)
\u2714\uFE0F Standardized date format to YYYY-MM-DD
\u26A0\uFE0F Found 2 empty cells in Column B (rows 45, 71)
\u26A0\uFE0F Currency formatting inconsistent (fixed)

Before: 102 rows | After: 99 rows (3 removed)`,

    `DATA CLEANING \u2014 COMPREHENSIVE REPORT

ORIGINAL DATA: 102 rows \u00D7 8 columns
CLEANED DATA:  99 rows \u00D7 8 columns

ISSUES FOUND & FIXED:

DUPLICATES (3 removed):
\u2714\uFE0F Row 15: Exact duplicate of Row 14
\u2714\uFE0F Row 42: Exact duplicate of Row 41
\u2714\uFE0F Row 88: Duplicate ID with different date

FORMATTING (47 fixes):
\u2714\uFE0F Column A: Trimmed leading/trailing spaces (12 cells)
\u2714\uFE0F Column C: Standardized dates to YYYY-MM-DD (22 cells)
\u2714\uFE0F Column B: Unified currency format $#,##0 (8 cells)
\u2714\uFE0F Column D: Title case for region names (5 cells)

MISSING DATA (3 flagged):
\u26A0\uFE0F B45: Empty revenue cell \u2014 filled with AVERAGE of B44:B46
\u26A0\uFE0F B71: Value $0 \u2014 likely error, flagged yellow
\u26A0\uFE0F E23: Missing category \u2014 inferred "Enterprise" from pattern

DATA TYPES CORRECTED:
\u2714\uFE0F Column B: Text \u2192 Currency (was stored as string)
\u2714\uFE0F Column C: Text \u2192 Date
\u2714\uFE0F Column F: Mixed \u2192 Number

VALIDATION RULES ADDED:
\u2022 Column B: Must be > 0 and < 200000
\u2022 Column C: Must be valid date in 2024-2026
\u2022 Column D: Must match region list

Data quality score: 64% \u2192 97%`,
  ],

  'excel-3': [ // Analyze
    `Average: $42,350 | Median: $38,200 | Std Dev: $12,450`,

    `STATISTICAL ANALYSIS \u2014 Revenue Data

Central Tendency:
  Mean:   $42,350
  Median: $38,200 (right-skewed)
  Mode:   $35,000 (appeared 4 times)

Dispersion:
  Std Dev: $12,450
  Range:   $81,200
  IQR:     $15,800

Distribution: Right-skewed (skewness = 0.82)
Correlation with Ad Spend: r = 0.87 (strong positive)`,

    `COMPREHENSIVE STATISTICAL ANALYSIS

DATASET: Revenue (B2:B100) \u2014 99 observations

DESCRIPTIVE STATISTICS:
  Mean:      $42,350    Median:    $38,200
  Std Dev:   $12,450    Variance:  155,002,500
  Skewness:  0.82       Kurtosis:  2.1
  Range:     $81,200    IQR:       $15,800
  CV:        29.4%      SE Mean:   $1,251

DISTRIBUTION ANALYSIS:
  Shape: Right-skewed, platykurtic
  Normality test (Shapiro-Wilk): p = 0.023 \u274C
  \u2192 Data is NOT normally distributed
  \u2192 Use non-parametric tests for inference

CORRELATION MATRIX:
              Revenue  AdSpend  HeadCount
  Revenue     1.000    0.872    0.645
  AdSpend     0.872    1.000    0.523
  HeadCount   0.645    0.523    1.000

REGRESSION:
  Revenue = 1.2\u00D7AdSpend + 0.8\u00D7HeadCount - 15,200
  R\u00B2 = 0.84 | Adj R\u00B2 = 0.83 | p < 0.001
  F-statistic: 248.3 (df: 2, 96)

SEGMENTED ANALYSIS:
  NE Region: $67,200 avg (+58% above mean)
  SW Region: $52,100 avg (+23%)
  MW Region: $31,400 avg (-26%)
  SE Region: $28,700 avg (-32%)

OUTLIERS (Z-score > 2):
  Row 23: $89,400 (z = 3.78)
  Row 71: $8,200 (z = -2.74)`,
  ],

  'excel-4': [ // Pivot
    `Pivot table created: Revenue by Region (sum).`,

    `PIVOT TABLE GENERATED:

         | Q1      | Q2      | Q3      | Q4      | Total
---------|---------|---------|---------|---------|--------
NE       | $48,200 | $52,100 | $67,200 | $71,300 | $238,800
SW       | $38,900 | $42,300 | $52,100 | $48,700 | $182,000
MW       | $28,100 | $31,400 | $29,800 | $33,200 | $122,500
SE       | $24,500 | $28,700 | $26,900 | $30,100 | $110,200

Insight: NE region leads all quarters (+58% above avg)`,

    `PIVOT TABLE ANALYSIS

REVENUE BY REGION \u00D7 QUARTER
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Region \u2502 Q1      \u2502 Q2      \u2502 Q3      \u2502 Q4      \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 NE     \u2502 $48,200 \u2502 $52,100 \u2502 $67,200 \u2502 $71,300 \u2502
\u2502 SW     \u2502 $38,900 \u2502 $42,300 \u2502 $52,100 \u2502 $48,700 \u2502
\u2502 MW     \u2502 $28,100 \u2502 $31,400 \u2502 $29,800 \u2502 $33,200 \u2502
\u2502 SE     \u2502 $24,500 \u2502 $28,700 \u2502 $26,900 \u2502 $30,100 \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

ADDITIONAL PIVOTS GENERATED:

2. Revenue by Category (avg):
   Enterprise: $58,400 | SMB: $32,100 | Startup: $24,800

3. Revenue by Month (trend):
   Upward trend: +2.3% MoM average growth

KEY INSIGHTS:
\u2022 NE dominates every quarter (36% of total revenue)
\u2022 Q3\u2192Q4 growth strongest in NE (+6.1%) and SE (+11.9%)
\u2022 MW shows flat performance (needs investigation)
\u2022 Seasonal pattern: Q1 dip, Q3-Q4 surge

CALCULATED FIELDS ADDED:
\u2022 YoY Growth %
\u2022 Running Total
\u2022 % of Grand Total
\u2022 Rank by Quarter`,
  ],

  'excel-5': [ // Predict
    `Forecast: $45,200 next month (+6.7% from current).`,

    `TREND FORECAST:

Current: $42,350/month
Next 3 months:
  Month +1: $45,200 (+6.7%)
  Month +2: $47,800 (+5.8%)
  Month +3: $49,100 (+2.7%)

Model: Linear regression (R\u00B2 = 0.84)
Confidence interval: \u00B1$4,200 (95%)

\u26A0\uFE0F Assumes current growth rate continues`,

    `PREDICTIVE ANALYSIS \u2014 Revenue Forecast

MODEL: ARIMA(1,1,1) with seasonal decomposition
Training data: 24 months | Test accuracy: 91.2%

12-MONTH FORECAST:
  Month 1:  $45,200  [\u00B1$3,800]
  Month 2:  $47,800  [\u00B1$4,200]
  Month 3:  $49,100  [\u00B1$4,800]
  Month 4:  $46,200  [\u00B1$5,100]  (seasonal dip)
  Month 5:  $48,900  [\u00B1$5,500]
  Month 6:  $52,300  [\u00B1$5,900]
  Month 7:  $54,100  [\u00B1$6,200]
  Month 8:  $56,800  [\u00B1$6,800]
  Month 9:  $59,200  [\u00B1$7,100]
  Month 10: $57,400  [\u00B1$7,500]  (seasonal dip)
  Month 11: $61,300  [\u00B1$7,900]
  Month 12: $64,700  [\u00B1$8,200]

ANNUAL PROJECTION: $643,000 (+18.4% YoY)

SCENARIOS:
  Optimistic (+1\u03C3): $712,000 (+31%)
  Base case:        $643,000 (+18%)
  Pessimistic (-1\u03C3): $574,000 (+5.7%)

KEY DRIVERS:
  Ad spend: 42% of variance explained
  Seasonality: Q3-Q4 peak, Q1 trough
  Headcount: Moderate positive effect

RISK FACTORS:
\u26A0\uFE0F Model assumes no market disruption
\u26A0\uFE0F Confidence intervals widen over time
\u26A0\uFE0F MW region stagnation may worsen`,
  ],

  'excel-6': [ // Anomaly
    `\u26A0\uFE0F 1 anomaly: Row 23 ($89,400) is 3.8\u03C3 above mean.`,

    `ANOMALY DETECTION:

\u{1F534} HIGH (>3\u03C3):
  Row 23: $89,400 (3.8\u03C3 above mean) \u2014 verify this entry

\u{1F7E1} MEDIUM (>2\u03C3):
  Row 71: $8,200 (2.7\u03C3 below mean) \u2014 unusually low

\u{1F7E2} LOW:
  Row 45: $0 (likely data entry error)

3 anomalies found in 99 data points (3.0%)`,

    `ANOMALY DETECTION REPORT

Method: Z-score + IQR + Isolation Forest ensemble
Dataset: 99 revenue entries

CRITICAL ANOMALIES (action required):
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\u{1F534} Row 45: $0.00 | Score: 99/100
   Type: Data entry error (zero value)
   Evidence: All other entries > $5,000
   Suggestion: Check source system, likely missing data

\u{1F534} Row 23: $89,400 | Score: 92/100
   Type: Statistical outlier (z = 3.78)
   Evidence: 3.8\u03C3 above mean, highest in dataset
   Suggestion: Verify \u2014 could be one-time large deal

\u{1F7E1} Row 71: $8,200 | Score: 78/100
   Type: Statistical outlier (z = -2.74)
   Evidence: 2.7\u03C3 below mean, Region SE
   Suggestion: Check for partial month or refund

\u{1F7E1} Row 34: $82,100 | Score: 65/100
   Type: Moderate outlier (z = 3.19)
   Evidence: NE Region, could be legitimate

\u{1F7E2} Row 12: $67,500 | Score: 45/100
   Type: Borderline (z = 2.02)
   Evidence: Within Q1 seasonal range \u2014 likely OK

SUMMARY:
  Total anomalies: 5 of 99 entries (5.1%)
  Critical: 2 (need immediate review)
  Moderate: 2 (verify when convenient)
  Borderline: 1 (likely legitimate)

Impact on analysis:
  With anomalies:    Mean = $42,350
  Without anomalies: Mean = $41,820 (\u0394 -1.3%)
  Recommendation: Remove Row 45 before analysis`,
  ],

  'excel-7': [ // Merge
    `Merged: 2 sheets joined on Column A (ID). 99 matched rows.`,

    `DATA MERGE REPORT:

Source 1: Revenue.xlsx (99 rows, 5 columns)
Source 2: Customers.xlsx (112 rows, 4 columns)

Join: LEFT JOIN on Column A (CustomerID)
Matched: 99/99 rows (100%)
New columns added: Company, Segment, Region

\u26A0\uFE0F 13 customer records had no matching revenue
(orphan records kept in separate tab)`,

    `COMPREHENSIVE DATA MERGE

SOURCES:
  1. Revenue.xlsx \u2014 99 rows \u00D7 5 cols
  2. Customers.xlsx \u2014 112 rows \u00D7 4 cols
  3. AdSpend.xlsx \u2014 89 rows \u00D7 3 cols

MERGE STRATEGY: Multi-join on CustomerID

RESULTS:
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502            \u2502 Source \u2502 Matched \u2502 Orphans \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Revenue    \u2502 99     \u2502 99      \u2502 0       \u2502
\u2502 Customers  \u2502 112    \u2502 99      \u2502 13      \u2502
\u2502 AdSpend    \u2502 89     \u2502 85      \u2502 4       \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

OUTPUT: Merged.xlsx
  Rows: 99 | Columns: 10 (was 5+4+3 minus keys)

DATA QUALITY:
  \u2714\uFE0F ID format consistent across sources
  \u2714\uFE0F No duplicate IDs in merged output
  \u26A0\uFE0F 14 rows have NULL in AdSpend columns
  \u26A0\uFE0F 13 customer records have no revenue

ORPHAN RECORDS (separate tab):
  Customers without revenue: 13 (new/inactive)
  Revenue without ad data: 14 (organic/referral)

COLUMNS IN OUTPUT:
  A: CustomerID | B: Revenue | C: Date
  D: Company | E: Segment | F: Region
  G: AdSpend | H: Campaign | I: Channel
  J: Match_Quality (0-100)`,
  ],

  'excel-8': [ // Report
    `Q4 Revenue: $653,500. Top region: NE ($238,800).`,

    `Q4 REVENUE REPORT

Total Revenue: $653,500
YoY Growth: +14.2%

By Region:
  NE: $238,800 (36.5%) \u2191 +18%
  SW: $182,000 (27.9%) \u2191 +12%
  MW: $122,500 (18.7%) \u2192  +2%
  SE: $110,200 (16.9%) \u2191  +8%

Top performer: NE Region (+$36,200 vs Q3)
Concern: MW Region showing flat growth`,

    `QUARTERLY REVENUE REPORT \u2014 Q4 2025

EXECUTIVE SUMMARY
Total Revenue: $653,500
vs Q3: +$72,400 (+12.5%)
vs Q4 2024: +$81,200 (+14.2%)
Annual Revenue: $2,341,000

REGIONAL BREAKDOWN
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Region \u2502 Revenue  \u2502 Share \u2502 QoQ    \u2502 YoY     \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 NE     \u2502 $238,800 \u2502 36.5% \u2502 +6.1%  \u2502 +18.2%  \u2502
\u2502 SW     \u2502 $182,000 \u2502 27.9% \u2502 -6.5%  \u2502 +12.1%  \u2502
\u2502 MW     \u2502 $122,500 \u2502 18.7% \u2502 +11.4% \u2502 +2.3%   \u2502
\u2502 SE     \u2502 $110,200 \u2502 16.9% \u2502 +11.9% \u2502 +8.4%   \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

KEY METRICS:
  Average deal size: $42,350
  Largest deal: $89,400 (NE, Enterprise)
  Customer count: 99 active accounts
  New customers (Q4): 12

HIGHLIGHTS:
\u2705 NE Region exceeded target by 18%
\u2705 SE Region showing strong acceleration
\u26A0\uFE0F MW Region growth stalled (2.3% YoY)
\u26A0\uFE0F SW Region QoQ decline needs attention

RECOMMENDATIONS:
1. Investigate MW stagnation \u2014 sales team review
2. Double down on NE strategy (working)
3. Address SW Q4 dip \u2014 seasonal or structural?
4. Plan SE expansion (high growth trajectory)

Report auto-generated from Sheet1 data.
Charts inserted in Sheet2.`,
  ],
};

export function getDialLevel(value: number): string {
  if (value <= 33) return 'Minimal';
  if (value <= 66) return 'Balanced';
  return 'Maximum';
}

export function getOutput(appId: string, buttonIndex: number, dialValue: number): string {
  const key = `${appId}-${buttonIndex}`;
  const buttonOutputs = outputs[key];
  if (!buttonOutputs) return '';
  if (dialValue <= 33) return buttonOutputs[0];
  if (dialValue <= 66) return buttonOutputs[1];
  return buttonOutputs[2];
}
