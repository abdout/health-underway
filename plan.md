# Paediatric Doctor On-Boarding & Membership Flow – Implementation Plan

> Goal: Provide a clear view of what is already working and what is still missing to achieve the end-to-end flow described below.

---

## Target Flow (high-level)
1. Doctor opens **/paediatric** and submits the onboarding form.
2. Submission persists data in the database.
3. Doctor sees a confirmation that the application is **under review**.
4. Admin receives a notification (in-app & Telegram).
5. Admin reviews the application in **/dashboard/membership** and can approve/reject it.
6. Approved doctors appear in the doctors table **/dashboard/member**.
7. Each doctor has a public/internal profile page **/dashboard/profile/[id]**.
8. Doctor can later edit the same profile using the **/paediatric** form (update mode).

---

## Current Status vs TODO

| Step | Status | Existing Artifacts | Gaps / TODO |
|------|--------|--------------------|-------------|
| 1    | ✅  | `src/app/paediatric/page.tsx` → renders `<PaediatricForm type="create" />`.<br>`src/components/paediatric/form.tsx` handles client-side form logic/validation. | • UX polish (multi-step, autosave, etc.) – optional. |
| 2    | ✅  | `createPaediatricDoctor` & `updatePaediatricDoctor` server actions (`src/components/paediatric/action.ts`) write to `db.paediatricDoctor`. **`applicationStatus` field added via Prisma enum.** | *Done* |
| 3    | ✅  | `src/app/paediatric/review/page.tsx` & `submitPaediatricDoctorProfile` now updates `applicationStatus` to `SUBMITTED` and triggers `notifyOnboardingSubmission()`. |
| 4    | ✅  | `notifyOnboardingSubmission()` is invoked inside `submitPaediatricDoctorProfile` after successful submission. |
| 5    | ✅  | Admin UI in `src/app/(platform)/dashboard/membership`.<br>`approveApplication`, `rejectApplication`, `redoApplication` in `src/components/membership/action.ts` + `ReviewActions` component. | • Confirm these actions update **both** `User` and `PaediatricDoctor` status.<br>• Fire notification back to applicant on status change. |
| 6    | ✅  | Doctors table exists – link to profile added. Needs *Approved only* filter & extra UX polish. |
| 7    | ✅  | Dynamic profile route `/dashboard/profile/[id]` implemented; membership table now links to it. Public variant still optional. |
| 8    | ✅  | `/paediatric/edit` route added, loading existing data in update mode (edit restriction still pending). |

Legend: ✅ Done • 🟡 Partially done • ⛔ Not started

---

## Detailed Roadmap (updated)

### 1. Database & Prisma
- [x] Add `applicationStatus` enum (`PENDING` | `SUBMITTED` | `APPROVED` | `REJECTED`).
- [ ] (Optional) Add `reviewedBy`, `reviewedAt` fields.
- [ ] Run `pnpm prisma migrate dev` after updating `schema.prisma`.

### 2. Server Actions / APIs
- [x] `submitPaediatricDoctorProfile` sets `applicationStatus = 'SUBMITTED'` and calls `notifyOnboardingSubmission()`.
- [ ] In `approveApplication` / `rejectApplication` update status on `PaediatricDoctor` table too (already handled) **and mirror on `User` if we decide to add field**.
- [ ] Send Telegram/WhatsApp messages on approval/rejection (in-app done).

### 3. Doctor-side UX
- [x] Redirect to `/paediatric/review` implemented after submission (thank-you polish pending).
- [ ] Add banner component that reads `applicationStatus` so doctor can see real-time status in dashboard.
- [x] Implement `/paediatric/edit` that pre-fills form.

### 4. Admin Dashboard
- [x] Application status columns already present; added dedicated approved view.
- [ ] Filter buttons remain.
- [x] ReviewActions now trigger in-app notifications (Telegram TODO).

### 5. Profiles
- [x] `[id]/page.tsx` route implemented.
- [x] Membership table rows route to doctor profile.
- [x] `/dashboard/profile/me` redirect route implemented.

### 6. Notifications
- [ ] Badge component in navbar showing unread count (use `getUnreadNotificationsCount`).
- [ ] Real-time updates via Pusher, Ably, or Next.js `server-actions` + `cache` revalidation (phase-2).

### 7. Testing
- [ ] Add Cypress/E2E flow: create → submit → admin approves → doctor profile appears approved.
- [ ] Unit tests for server actions (vitest).

---

## Next Steps (TL;DR)
1. **Prisma migration** – add `applicationStatus` field.
2. **Wire notifications** – call `notifyOnboardingSubmission` after submission.
3. **Admin action updates** – ensure status change reflected on `PaediatricDoctor`.
4. **Dynamic profile route** – build `/dashboard/profile/[id]`.
5. **Edit profile** – route `/paediatric/edit` reading existing data.
6. Polish UI & add testing.

Once the above are complete the described flow will be fully operational. 