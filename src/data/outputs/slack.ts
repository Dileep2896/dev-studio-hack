type OutputMap = Record<string, [string, string, string]>;

const outputs: OutputMap = {
  'slack-0': [ // Tone Shift
    `yo team - shipped the auth fix, lmk if anything looks weird `,

    `Hey team, just pushed the authentication fix to staging.
Please review when you get a chance and flag any issues.
The main changes are in the token refresh logic.`,

    `Team - I've deployed the authentication service patch
(v2.4.1) to the staging environment.

Summary of Changes:
* Resolved token refresh vulnerability (SEC-2024-089)
* Updated JWT expiration handling
* Added retry logic for failed refresh attempts (max 3)

Action Required:
Please complete your review by EOD Thursday, Feb 12.
QA sign-off needed from @sarah and @mike before
production deployment scheduled for Friday AM.

Rollback plan documented in Confluence: AUTH-ROLLBACK-v2`,
  ],

  'slack-1': [ // Standup
    `Done: Auth fix. Today: Deploy to staging. No blockers.`,

    `[G] Yesterday: Completed auth token refresh fix
[B] Today: Deploy to staging, start QA
[R] Blockers: Waiting on DevOps for staging access
 Note: May need extra day for load testing`,

    `DAILY STANDUP - Feb 10, 2026

COMPLETED (Yesterday):
* Resolved SEC-2024-089: Token refresh vulnerability
* Added comprehensive test suite (14 new tests, all passing)
* Updated API documentation for auth endpoints
* Code review for PR #847 (Maria's caching update)

IN PROGRESS (Today):
* Deploy auth patch v2.4.1 to staging
* Run integration tests against staging environment
* Begin load testing with simulated 10K concurrent users
* Prep rollback runbook for production deployment

BLOCKED:
* Staging deploy: Need DevOps to approve security group change
  Owner: @david | ETA: This morning
* Load test infra: Waiting on AWS quota increase
  Owner: @infra-team | ETA: Tomorrow

NOTES:
* Production deploy targeting Friday 6AM EST
* Will need @sarah and @mike for QA sign-off by Thursday
* Risk: If load tests reveal issues, may push to Monday`,
  ],

  'slack-2': [ // Thread Sum
    `Thread summary: Team decided to use JWT with 15-min expiry.`,

    `THREAD SUMMARY (23 messages, 6 participants):

Decision: Use JWT tokens with 15-minute expiry
and refresh tokens with 7-day expiry.

Key points discussed:
* @alex proposed session-based auth (rejected - doesn't scale)
* @sarah flagged security concern with long-lived tokens
* @mike suggested 15-min window (team agreed)
* @david will handle the Redis session store setup

Action: @alex to implement by Friday`,

    `THREAD SUMMARY
23 messages * 6 participants * 2h 14m duration

CONTEXT:
Discussion about authentication architecture for the
new microservices platform. Started by @alex asking
for input on token strategy.

DISCUSSION FLOW:
1. @alex: Proposed session-based auth using Redis
   --> @sarah: Concerned about horizontal scaling
   --> @mike: Agreed, suggested JWT instead

2. @sarah: Raised security concerns about JWT
   --> Long-lived tokens are a risk if compromised
   --> @david: Suggested short expiry + refresh tokens

3. @mike: Proposed 15-min access / 7-day refresh
   --> Team consensus reached
   --> @alex: Agreed, will implement

4. @david: Volunteered to set up Redis for refresh
   token storage and revocation list

DECISIONS MADE:
[OK] JWT with 15-minute access token expiry
[OK] Refresh tokens with 7-day expiry, stored in Redis
[OK] Token revocation list for security incidents
[X] Session-based auth (rejected - scaling concerns)

ACTION ITEMS:
[ ] @alex: Implement JWT auth service (Due: Friday)
[ ] @david: Set up Redis cluster (Due: Thursday)
[ ] @sarah: Write security test cases (Due: Friday)
[ ] @mike: Update API gateway config (Due: Thursday)

UNRESOLVED:
* Rate limiting strategy for token refresh endpoint
* Mobile app token storage approach`,
  ],

  'slack-3': [ // Actions
    `Action: @alex to deploy fix by Friday.`,

    `ACTION ITEMS EXTRACTED:

[ ] @alex - Deploy auth fix to staging (Due: Wed)
[ ] @sarah - QA sign-off on auth changes (Due: Thu)
[ ] @mike - Update monitoring dashboards (Due: Thu)
[ ] @david - Approve staging security group (Due: Today)

Priority: [R] @david is blocking the rest`,

    `ACTION ITEMS - Extracted from 3 threads

HIGH PRIORITY (Blocking):
[ ] @david: Approve staging security group change
  Source: #deploy-requests, Today
  Blocks: Staging deployment, QA, production release

[ ] @alex: Deploy auth patch v2.4.1 to staging
  Source: #engineering, Feb 10
  Due: Wednesday | Blocked by: @david

MEDIUM PRIORITY:
[ ] @sarah: Complete QA sign-off on auth changes
  Source: #engineering, Feb 10
  Due: Thursday | Depends on: staging deploy

[ ] @mike: Update Datadog monitoring dashboards
  Source: #engineering, Feb 10
  Due: Thursday | Independent

[ ] @alex: Prepare rollback runbook
  Source: #deploy-requests, Feb 9
  Due: Thursday | Independent

LOW PRIORITY:
[ ] @maria: Update API docs for auth endpoints
  Source: #documentation, Feb 8
  Due: Next week | Independent

DEPENDENCY CHAIN:
@david (today) --> @alex (Wed) --> @sarah (Thu) --> DEPLOY (Fri)

[!] RISK: If @david's approval slips, the entire
Friday production deployment is at risk.`,
  ],

  'slack-4': [ // React
    `Suggested:  (shipped)`,

    `Suggested Reactions:

 - Great, shipped!
 - Acknowledged
 - I'll take a look
 - Spot on / good catch

Context: deployment announcement -->  is most appropriate`,

    `EMOJI REACTION SUGGESTIONS

Based on message context (deployment announcement):

BEST MATCH:
 :rocket: - "Shipped! Nice work" (92% fit)

ALTERNATIVES:
 :tada: - "Celebration / milestone" (85% fit)
 :clap: - "Well done, team" (80% fit)
[OK] :white_check_mark: - "Acknowledged" (75% fit)
 :muscle: - "Strong work" (70% fit)

AVOID:
 :eyes: - Could imply skepticism here
 :thinking: - Wrong tone for celebration

TEAM PATTERNS:
Your team typically uses  for deploys (used 47 times)
and  for milestones (used 23 times).

Auto-react with ?`,
  ],

  'slack-5': [ // Schedule
    `Best time: Tomorrow 10:15 AM (most team members online)`,

    `SMART SCHEDULE SUGGESTION:

Message: Auth deployment announcement
Recipients: #engineering (12 members)

--> Best time: Tuesday 10:15 AM EST
  * 11/12 members typically online
  * After standup, before deep work blocks
  * Avoids Monday inbox overload

Alternative: Tuesday 2:00 PM EST (10/12 online)
Avoid: Before 9 AM or after 5 PM (low engagement)`,

    `SMART SCHEDULING ANALYSIS

Message Type: Important announcement (deployment)
Channel: #engineering (12 members)
Urgency: High (needs action before Friday)

RECOMMENDED TIMES (ranked by team availability):

1. [*] Tue 10:15 AM EST - Score: 94/100
   Online: 11/12 members
   Reason: Post-standup, high engagement window
   Response time prediction: <15 min avg

2. Tue 2:00 PM EST - Score: 82/100
   Online: 10/12 members
   Reason: Post-lunch, second attention peak

3. Wed 10:00 AM EST - Score: 78/100
   Online: 10/12 members
   Reason: Midweek, good but delays action items

AVOID THESE TIMES:
[X] Mon 9 AM - Inbox overload, low read rate
[X] Fri 4 PM - Weekend mode, 40% lower engagement
[X] Any time after 6 PM - Only 3/12 active

TEAM ACTIVITY PATTERNS:
Peak hours: 10-11 AM, 2-3 PM
Slowest: 12-1 PM (lunch), after 5 PM
@david (blocker): Most active 9-11 AM

Schedule for Tue 10:15 AM?`,
  ],

  'slack-6': [ // Translate
    `[ES] Equipo, acabo de desplegar el parche de autenticaci\u00F3n.`,

    `TRANSLATION (Spanish):

Equipo - He desplegado el parche del servicio de
autenticaci\u00F3n (v2.4.1) en el entorno de staging.

Cambios principales:
* Vulnerabilidad de actualizaci\u00F3n de tokens resuelta
* L\u00F3gica de reintento a\u00F1adida (m\u00E1ximo 3 intentos)

Acci\u00F3n requerida: Revisi\u00F3n antes del jueves.`,

    `MULTI-LANGUAGE TRANSLATION

[Spanish]
Equipo - He desplegado el parche del servicio de
autenticaci\u00F3n (v2.4.1) en el entorno de staging.
Se requiere revisi\u00F3n antes del jueves.

[Portuguese]
Equipe - Implantei o patch do servi\u00E7o de autentica\u00E7\u00E3o
(v2.4.1) no ambiente de staging. Revis\u00E3o necess\u00E1ria
at\u00E9 quinta-feira.

[Japanese]
\u30C1\u30FC\u30E0 - \u8A8D\u8A3C\u30B5\u30FC\u30D3\u30B9\u30D1\u30C3\u30C1(v2.4.1)\u3092\u30B9\u30C6\u30FC\u30B8\u30F3\u30B0
\u74B0\u5883\u306B\u30C7\u30D7\u30ED\u30A4\u3057\u307E\u3057\u305F\u3002\u6728\u66DC\u65E5\u307E\u3067\u306B\u30EC\u30D3\u30E5\u30FC
\u3092\u304A\u9858\u3044\u3057\u307E\u3059\u3002

Tone preserved: Professional / Direct
Technical terms kept in English: staging, QA, JWT
Confidence: 96%`,
  ],

  'slack-7': [ // Template
    `[Deployment] Auth fix v2.4.1 shipped to staging.`,

    ` DEPLOYMENT NOTICE

Service: Authentication Service
Version: v2.4.1
Environment: Staging
Status: [OK] Deployed

Changes: Token refresh vulnerability fix
Rollback: AUTH-ROLLBACK-v2
Owner: @alex
QA needed: @sarah @mike`,

    ` DEPLOYMENT NOTICE - AUTH SERVICE

================================
Service:     Authentication Service
Version:     v2.4.1 (prev: v2.4.0)
Environment: Staging
Deployed by: @alex
Timestamp:   2026-02-10 14:32 EST
================================

CHANGES:
* [SEC-2024-089] Token refresh vulnerability fix
* JWT expiration race condition resolved
* Retry logic added (max 3 attempts)

TESTING:
* Unit tests: 147/147 passing [OK]
* Integration: 23/23 passing [OK]
* Load test: Pending

ACTION REQUIRED:
[ ] @sarah - QA sign-off (Due: Thu)
[ ] @mike - QA sign-off (Due: Thu)

ROLLBACK:
Plan: AUTH-ROLLBACK-v2 (Confluence)
Command: deploy auth-service v2.4.0 --env staging

PRODUCTION TARGET: Friday Feb 13, 6:00 AM EST
================================`,
  ],

  'slack-8': [ // Announce
    `Hey team! Auth fix is live on staging. Please test when you can.`,

    ` Team Announcement

The authentication service patch is now live on staging.

What changed:
* Fixed the token refresh bug reported last week
* Added automatic retry for failed refreshes

What we need from you:
* Test your usual workflows on staging today
* Report any auth issues in #bugs
* QA team: formal sign-off needed by Thursday

Thanks everyone! `,

    ` TEAM ANNOUNCEMENT - Authentication Update

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
* Token refresh is now atomic and race-condition free
* Failed refresh attempts automatically retry (up to 3x)
* Refresh tokens are now stored in Redis with revocation
* All auth endpoints have updated rate limiting

WHAT WE NEED FROM YOU:
1. Please test your normal workflows on staging
2. Report any authentication issues in #bugs immediately
3. QA team (@sarah, @mike): Formal sign-off by Thursday

TIMELINE:
* Now: Staging testing
* Thursday: QA sign-off deadline
* Friday 6 AM: Production deployment

If you have questions or concerns, please reach out in
#engineering or DM me directly.

Thank you for your patience while we addressed this.
The team did excellent work turning this around quickly.

-- Alex`,
  ],


};

export default outputs;
