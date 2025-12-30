**Goal**
We are intentionally *not* a seller, not a bank, not an escrow.
The platform’s role is **Curator + Judge**. Trust must be built through reputation, public commitments, and visible consequences — not payments.

**Core Principle (must reflect in code & UI)**
Money never touches us.
Trust is created via **selection, transparency, and accountability**.

---

## What to implement (V0)

### 1. Seller (Farmer) is *curated*, not open

* No public sign-ups.
* Sellers are **invite-only**.
* Profile must show:

  * Real name
  * Region / farm location
  * Product type
  * Short history (e.g. “Harvested rice for 12 years”)
* UI copy must explicitly say:

  > “Sellers on this platform are selected and monitored.”

---

### 2. Public Commitment Object (critical)

Each listing is not just a product — it’s a **public commitment**.

For every listing store + display:

* Quantity promised
* Expected delivery window
* Commitment timestamp
* Seller identity

This commitment must be:

* Public
* Linkable
* Immutable after confirmation

If delivery fails, the *commitment remains visible*.

---

### 3. Order tracking without payments

For each reservation:

* Unique order ID
* Status:

  * Reserved
  * Delivered
  * Not delivered
* Buyer can mark delivery result
* Seller cannot delete or hide failed orders

Failed delivery = permanent reputational mark.

---

### 4. Dispute handling = reputational, not financial

No refunds. No mediation language.

If buyer reports failure:

* Status changes to “Delivery failed”
* Seller is automatically:

  * Flagged
  * Potentially suspended
* History remains public

UI language:

> “We do not handle payments.
> We maintain public records of commitments and outcomes.”

---

### 5. Language & positioning (important)

Avoid:

* “Guarantee”
* “Secure payment”
* “We ensure delivery”

Use:

* “Selected sellers”
* “Public commitments”
* “Track record”
* “Accountability”

---

## Why this matters

If even one failed delivery is hidden or softened, **platform trust collapses**.
Transparency > protection.

Build the system assuming **trust is earned, not promised**.

---

If you need, I can also provide:

* Exact UI copy
* Data model (tables)
* Seller profile wireframe
* Terms wording aligned with this role

Tell me what you want next.
