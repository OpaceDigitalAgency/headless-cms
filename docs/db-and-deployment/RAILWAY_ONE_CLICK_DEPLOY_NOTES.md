# Railway One-Click Deployment Notes  
## Next.js + Payload (Fork) – Templates, Domains, and Scaling Reality

This document captures the full reasoning, problems encountered, and conclusions reached while attempting to deploy a **Next.js Payload fork** to Railway with the aim of achieving a **true one-click install** suitable for hundreds or thousands of instances.

It documents why the initial Railway template approach was abandoned, what Railway templates actually are, where the friction comes from, and what *can* and *cannot* be automated today.

---

## 1. Original Goal

The objective was to create a **one-click install** for an app so that:

- Hundreds or thousands of **separate instances** could be deployed
- Each instance would be isolated (project/service level)
- Manual setup steps would be eliminated
- Templates would remove repetition

Railway templates appeared to be the natural fit for this requirement.

---

## 2. Initial Attempt: Railway Template Deployment

The project was initially deployed using a **Railway template**.

However, this immediately introduced friction:

- Deployments were based on **snapshots**, not Git
- Redeploying from Git was awkward or impossible
- Docker changes were not cleanly reproducible
- Debugging build and runtime issues became harder
- Accessing the **public URL** required manual intervention
- Some config could only be resolved *after* deployment

Because of this, the template was abandoned temporarily in favour of getting a **single, normal Git-based deployment working first**.

This decision was correct.

---

## 3. Clarifying What Railway Templates Actually Are

A key point of confusion is that Railway templates **are not saved from the UI** in the way you might expect.

Important clarifications:

- There is no reliable “Save deployment as template” mental model
- A template is essentially:
  - A **Git repository**
  - With stable Docker/build config
  - With environment variables defined
  - Optionally with `railway.json`
- The *repository* is the template — not the live deployment

So when someone says:

> “Get one project working, then turn it into a template”

What they really mean is:

> “Get one Git-based deployment completely stable, then use that same repo as the template source for future installs.”

---

## 4. Why the Template Approach Failed Early

Templates assume that:

- Docker is already correct
- Ports are correct
- Build steps are deterministic
- The app can boot without manual fixes
- No interactive troubleshooting is needed

In this case, the project was still discovering:

- Docker quirks
- Build vs runtime environment differences
- Payload + Next.js expectations
- Railway-specific behaviour

Using a template too early amplified problems instead of solving them.

Abandoning the template **was the right move** at that stage.

---

## 5. The Core Concern: “Won’t These Issues Reappear for Every Instance?”

This is the critical question — and it’s valid.

### The short answer:
Some differences **must exist per instance**, but they *should not* require manual intervention if designed correctly.

### The longer answer:
A Railway “one-click install” really means:

- One click to create:
  - The project
  - The service(s)
  - Baseline configuration
- Per-instance differences are handled **dynamically**, not manually

The biggest pain point here was the **public URL**.

---

## 6. The Public URL Problem (Chicken-and-Egg)

### What happened

- The app relied on `RAILWAY_PUBLIC_DOMAIN`
- That variable was empty
- The domain didn’t exist yet
- Railway required a **manual click**:
  - “Generate Domain” in the UI
- Only after that click:
  - The domain was created
  - The env var was populated
- A redeploy was often needed to pick it up

This breaks the promise of one-click installs.

### Why this happens

Railway **does not automatically provision a public domain** for services.

Even when:
- The service is running
- The port is detected correctly

You must still explicitly generate the domain.

This is currently a **platform limitation**, not user error.

---

## 7. Why Dynamic URL Variables Alone Don’t Solve It

Using `RAILWAY_PUBLIC_DOMAIN` is correct **in principle**.

However:

- The variable only exists *after* a domain is created
- Domain creation is manual by default
- If your app needs the URL at:
  - build time, or
  - initial boot
- You hit a loop:
  1. deploy
  2. click generate domain
  3. redeploy

That’s exactly what happened here.

---

## 8. What “One-Click” Can Actually Mean on Railway

### Important reality check

With Railway **templates + UI only**, you cannot currently guarantee:

- automatic domain creation
- zero manual steps
- domain-dependent env vars existing on first boot

So a *true* zero-touch install is **not achievable purely via templates** today.

---

## 9. Practical Ways Forward

There are three realistic patterns.

### Option A: Avoid Depending on the Domain to Boot (Recommended Where Possible)

For Next.js + Payload:

- Do **not** require the public URL at build or boot if you can avoid it
- Derive origin dynamically from:
  - request headers
  - `Host`
  - `X-Forwarded-Proto`
- Only require a fixed base URL for:
  - OAuth callbacks
  - third-party webhooks
  - external integrations

This allows the app to:
- deploy
- boot
- run
even before a domain exists

The domain can be added later without breaking the instance.

---

### Option B: Script Provisioning (True Automation)

If you truly need:

- project creation
- deployment
- domain generation
- env var wiring
- redeploy

…with **no human clicks**, then templates alone are insufficient.

You need automation via:

- Railway CLI
- Railway GraphQL API
- Your own installer workflow

Typical flow:

1. Create project/service
2. Deploy from Git
3. Programmatically generate domain
4. Inject domain-dependent variables
5. Trigger redeploy

From the user’s perspective, this is still “one click” — just not via the Railway UI.

---

### Option C: Re-evaluate Architecture at Scale

If you genuinely expect **hundreds or thousands** of instances, it’s worth questioning:

- Do these need to be separate Railway projects?
- Could this be multi-tenant instead?
- Could routing happen at the app level?
- Could isolation be handled via DB + auth instead of infrastructure?

Railway works well, but managing thousands of projects/domains/services can become operationally heavy and expensive.

---

## 10. Final Conclusions

- Your reasoning throughout was sound
- The problems encountered were real, not misunderstandings
- Railway templates are **repo-based**, not deployment-based
- Public domain creation is the main blocker to true one-click installs
- That step cannot currently be eliminated via the UI alone
- Full automation requires scripting or architectural adjustment

### Key takeaway

> A Railway template is not a deployment.  
> It’s a promise that a fresh deployment will succeed — **assuming the platform fills in the gaps it currently doesn’t automate**.

You didn’t defeat the purpose of one-click installs — you uncovered where the platform’s promise ends.

---

## 11. Open Questions (Next Steps)

Depending on priorities, the next decisions usually are:

- Should the app be redesigned to avoid fixed base URLs?
- Is scripting acceptable for provisioning?
- Is Railway the right platform for the intended scale?
- Should instances really be infra-isolated?

Those answers shape the final deployment strategy.

---

## 12. January 2026 Status Update: Ready for Scale

As of **January 23, 2026**, we have successfully resolved the major blockers identified in this document.

### What Changed?
1.  **Robust "Zero-Touch" Database Init**: We implemented a direct SQL injection script `run-migration-direct.sh` that bypasses Railway's transaction limits.
    -   *Result*: New instances automatically provision their database on first boot without crashing.
    -   *Why it matters*: You no longer need to manually SSH/exec into a container to fix the DB.
2.  **Relaxed Boot Dependencies**: We removed the hard dependency on `PAYLOAD_PUBLIC_SERVER_URL` for migration steps.
    -   *Result*: The app boots, connects to the DB, and runs migrations *before* having a public domain.
    -   *Why it matters*: This breaks the "chicken-and-egg" loop. You can deploy, *then* assign a domain, making automation possible.

### Answer: Can we deploy 100s of instances?
**YES.**

The current architecture is now "Template Ready".

#### How to achieve 100s of instances:
You have two robust paths:

1.  **Railway Template (Manual Click)**:
    -   Host this repo as a public template.
    -   Users click "Deploy".
    -   Railway provisions DB + App.
    -   **Migration runs automatically**. App comes online.
    -   *Constraint*: The user still needs to click "Generate Domain" in the Railway UI if they want a public URL.

2.  **Railway API/CLI (Automated Scale)**:
    -   Since the build & boot process is now fully automated and robust, you can script the creation of 100s of projects using the Railway CLI or GraphQL API.
    -   Script Logic:
        1. `railway init`
        2. `railway up`
        3. `railway domain` (Provision domain programmatically)
        4. Set env vars
    -   **No manual intervention is required inside the container.**

### Conclusion
The "One-Click" goal is now technically achieved. The platform limitations (domain generation) still exist in the UI, but the **Application Architecture** no longer blocks automation. You are ready to scale.