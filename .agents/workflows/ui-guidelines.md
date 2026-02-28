---
description: ui-guidelines
---

# UI Guidelines for VoltKenya

## Reusable Components

1. **Toast Notifications**: We use `sonner` for all toast notifications.
   - DO NOT create custom alert states or dummy toasts.
   - Always import the toast function from `sonner`: `import { toast } from 'sonner';`
   - Use `toast.success('Message')` or `toast.error('Error')` for consistent UI states.
   - Toaster is already mounted in `app/layout.tsx`.

2. **Form Validation**:
   - Always wrap actionable buttons with state and prevent progressing until valid.
   - Show inline error messages or `toast.error()` when a user tries to proceed with invalid data.
   - E.g M-Pesa Paybill is exactly 6 digits, Phone Number should have 9 digits (after +254).

3. **Links & Navigation**:
   - Ensure all links use `next/link` `<Link>` tags with actual href paths, not dummy `#` links.

When building or updating features, ALWAYS adhere to these reusable patterns.
