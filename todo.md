# Art Auction Platform — TODO.md

> Scope: artist-facing dashboard + public auctions + bidding + admin + notifications + email. Keep MVP tight, ship fast, then iterate.

## 0) Project Setup

- [X] Monorepo / single app decided (e.g., Next.js App Router)
- [X] DB schema drafted (Users, Roles, Artworks, Auctions, Bids, Likes, Plans, Invoices, Notifications)
- [X] Auth provider chosen (email/password + OAuth optional)
- [X] Role-based access control (artist, bidder, admin)
- [X] UI kit + design tokens set (shadcn/ui or similar)

## 1) Authentication & Roles

- [ ] Sign up / login / logout
- [ ] Email verification & password reset
- [ ] Roles + permissions middleware/guards
- [ ] Profile page (name, avatar, bio, payout details if artist)

## 2) Artist Dashboard

### 2.1 Create / Edit / Delete Art

- [ ] Art form: title, description, categories/tags
- [ ] Media upload (images/video), cropping, cover select
- [ ] Draft vs published states
- [ ] Edit & soft-delete (restore) support

### 2.2 Put Artwork on Auction

- [ ] Auction create: select artwork
- [ ] Fields: starting price, bid increment, reserve price (optional)
- [ ] Schedule: start time, end time, timezone
- [ ] Quantity (1 of 1) — simple for MVP
- [ ] Preview auction page before publishing
- [ ] Publish / unpublish controls

### 2.3 Manage My Auctions

- [ ] View list with statuses: Draft / Scheduled / Live / Ended / Sold / Unsold
- [ ] Real-time highest bid + bidder display
- [ ] Close early / cancel (with policy)
- [ ] Post-auction actions: mark as paid/shipped; upload proof of shipment

## 3) Auctions Engine (Core)

- [ ] Real-time channel (WebSocket) for live updates
- [ ] Place bid endpoint + validations:

  - [ ] Authenticated, not owner, auction is Live
  - [ ] Amount >= current + increment, meets reserve (if any)
  - [ ] Balance/hold check if using wallet; otherwise allow but require payment on win

- [ ] Anti-sniping: auto-extend end time (e.g., +2 min if bid <2 min left)
- [ ] State machine: Scheduled → Live → Ended → Settled
- [ ] Winner selection + lock-in at end time
- [ ] Bid history (public read-only)
- [ ] Like/Favorite ("❤️") on auction

## 4) Logged-in Bidders (UX)

- [ ] Browse & search auctions (filters: status, category, price range)
- [ ] Auction detail page: gallery, description, timer, current bid, bid form
- [ ] Place bid (inline), quick-bid (current + increment)
- [ ] Watchlist/Follow auction
- [ ] See status of **my bidded auctions**: Outbid / Leading / Won / Lost
- [ ] Personal bid history

## 5) Notifications

- [ ] In-app notifications center (unread badge)
- [ ] Realtime toasts for: outbid, auction won, auction starting soon, auction ending soon
- [ ] Email notifications mirror key events (see §7)
- [ ] Notification preferences per user (toggle channels)

## 6) Admin Panel

- [ ] Dashboard metrics (active auctions, bids today, GMV)
- [ ] Manage users: list, search, view, suspend/ban, role change
- [ ] Manage artworks (flag/remove), audit logs
- [ ] Manage auctions: force end/cancel, resolve disputes
- [ ] Manage subscription plans (see §8)
- [ ] Reports: sales by artist, top bidders, fees

## 7) Email

- [ ] Transactional templates:

  - [ ] Welcome / verify email
  - [ ] Password reset
  - [ ] Outbid notification
  - [ ] Auction won (with pay instructions)
  - [ ] Auction starting/ending soon
  - [ ] Payout/settlement confirmation to artist

- [ ] Sender domain + DKIM/SPF
- [ ] Test sends & preview
- [ ] Unsubscribe/preferences footer (where applicable)

## 8) Subscriptions & Plans (for Artists)

- [ ] Plan tiers (Free / Pro / Studio) with quotas: max active auctions, media storage, featured slots
- [ ] Payment integration (e.g., Stripe) — recurring billing
- [ ] Webhooks to update plan status on payment events
- [ ] Enforcement middleware: block action if over quota
- [ ] Plan management UI: upgrade/downgrade, cancel, invoices

## 9) Payments & Settlement (Post-Auction)

- [ ] Winner checkout flow (pay now within N hours)
- [ ] Capture funds & fees, invoice generation
- [ ] Artist payout flow (manual/automatic)
- [ ] Refund/dispute flow (admin assisted)

## 10) Public Site

- [ ] Home: featured/live auctions, categories
- [ ] Artist profile pages
- [ ] SEO (meta tags, OG images, sitemaps)
- [ ] Responsive, accessible components

## 11) Security & Compliance

- [ ] Rate limiting on bids & auth
- [ ] Input validation & server-side checks
- [ ] Access logs & admin actions audit
- [ ] GDPR basics: delete account/data export
- [ ] Terms of Service & Privacy Policy pages

## 12) Observability

- [ ] Structured logging
- [ ] Error tracking (server/client)
- [ ] Performance monitoring (Core Web Vitals, API latency)
- [ ] Cron/queues health dashboard

## 13) Data Model (MVP sketch)

- [ ] User(id, role, email, name, avatar, status)
- [ ] Artwork(id, userId, title, desc, media\[], stat
