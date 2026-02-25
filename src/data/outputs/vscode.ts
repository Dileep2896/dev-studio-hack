type OutputMap = Record<string, [string, string, string]>;

const outputs: OutputMap = {
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
--> Line 1: fetchUser(id) - Makes a synchronous API call
   to retrieve user data. Returns a RawUser object.
--> Line 2: Template literal concatenates first + last name
   with a space separator.
--> Line 3-4: Returns a plain object (not a class instance)
   containing the formatted name and raw email.

Potential Issues:
* No error handling if fetchUser fails or returns null
* Synchronous API call blocks execution
* No input validation on the id parameter
* No TypeScript types - any values possible

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

1. [!] Line 3: fetchUser may return null
   Fix: Add guard clause
   if (!userData) throw new Error('User not found');

2. [!] Line 5: No error boundary for API failures
   Fix: Wrap in try/catch block

Suggested fix applied --> 2 issues resolved`,

    `DEBUG ANALYSIS - getUserProfile()

=== ISSUES FOUND: 4 ===

[X] CRITICAL: Null reference (Line 3)
   fetchUser() can return null when user is deleted.
   Impact: Uncaught TypeError crashes the app.
   Fix: Add early return with error.

[X] CRITICAL: Unhandled promise rejection (Line 1)
   If the API is unreachable, the error propagates
   unhandled through the call stack.
   Fix: Wrap in try/catch, return fallback.

[!] WARNING: No input validation (Line 1)
   Empty string or non-string IDs pass silently.
   Fix: Validate id is non-empty string.

[!] WARNING: Memory leak potential (Line 2)
   Template literal creates new string every call.
   Low impact but fix with memoization for hot paths.

Auto-fix applied: 4/4 issues patched.
Run tests to verify: npm test - --grep "getUserProfile"`,
  ],

  'vscode-4': [ // Optimize
    `[>>] Suggestion: Cache fetchUser result to avoid repeat calls.`,

    `[>>] Performance Suggestions:

1. Cache API responses (saves ~200ms per call)
   const cache = new Map();
   if (cache.has(id)) return cache.get(id);

2. Use string concatenation instead of template literal
   for hot paths (5% faster in V8)

3. Lazy-load the email field if not always needed

Estimated improvement: 35% faster execution`,

    `[>>] PERFORMANCE AUDIT

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

PROJECTED RESULT: 245ms --> 8ms (97% improvement)
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

    `# Python equivalent - full conversion
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
    `[OK] Code looks clean. Minor: consider adding null check on line 3.`,

    `CODE REVIEW - getUserProfile()

[OK] Good: Clear function name and purpose
[OK] Good: Simple return structure
[!] Suggestion: Add null check for fetchUser result
[!] Suggestion: Add error handling for API calls
[X] Issue: No TypeScript types on parameters

Overall: Approve with minor changes`,

    `CODE REVIEW - Full Analysis

Reviewer: AI Code Assistant
Verdict: REQUEST CHANGES (2 blocking, 3 suggestions)

BLOCKING ISSUES:
[X] No error handling for API failures
  The function will throw an unhandled rejection.
  Suggestion: Add try/catch with meaningful error.

[X] Missing input validation
  Passing undefined crashes without useful error.
  Suggestion: Validate id parameter at entry.

SUGGESTIONS:
[!] Add return type annotation
  function getUserProfile(id: string): UserProfile

[!] Consider making async
  fetchUser likely hits a network - should be awaited.

[!] Add JSDoc for public API
  This is used in 3+ files - worth documenting.

METRICS:
  Complexity: 2 (low [OK])
  Test coverage: 0% (needs tests [X])
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

    `// Context-aware completion - inferred from codebase patterns
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

};

export default outputs;
