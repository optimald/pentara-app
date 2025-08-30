# Calendly Integration Guide

## Overview

Pentara uses [Calendly](https://calendly.com/optimaldev/pentara-onboarding) for booking $150 one-time onboarding sessions. This document outlines the integration approach.

## Booking Flow

### 1. Landing Page CTA
- **Primary CTA**: "Book your onboarding" button
- **Link**: https://calendly.com/optimaldev/pentara-onboarding
- **Price**: $150 (handled by Calendly + Stripe integration)

### 2. Calendly Configuration
The Calendly event should be configured with:
- **Duration**: 45 minutes
- **Price**: $150 (via Calendly's Stripe integration)
- **Questions**: Collect email for activation code delivery
- **Confirmation**: Custom message with next steps

### 3. Post-Booking Workflow
After successful booking:
1. User receives Calendly confirmation email
2. Coach receives booking notification
3. Coach prepares for session using `ONBOARDING_QUESTIONS.md`
4. During session: Coach uses console to generate profile
5. Post-session: Email sent with Manual PDF + Activation Code

## Implementation Options

### Option 1: Direct Link (Current)
- Simple button/link to Calendly URL
- Calendly handles all payment processing
- Minimal integration complexity

### Option 2: Embedded Widget
```html
<!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/optimaldev/pentara-onboarding" 
     style="min-width:320px;height:630px;"></div>
<script type="text/javascript" 
        src="https://assets.calendly.com/assets/external/widget.js" 
        async></script>
<!-- Calendly inline widget end -->
```

### Option 3: Popup Widget
```javascript
// Calendly popup widget
window.Calendly.initPopupWidget({
  url: 'https://calendly.com/optimaldev/pentara-onboarding'
});
```

## Environment Variables

```env
# Web package (.env.local)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/optimaldev/pentara-onboarding
```

## Landing Page Integration

### Hero Section CTA
```jsx
<button 
  onClick={() => window.open(process.env.NEXT_PUBLIC_CALENDLY_URL, '_blank')}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg"
>
  Book your onboarding ($150)
</button>
```

### How It Works Section
1. **Book a 45-minute onboarding** → Links to Calendly
2. **We craft your Personal Manual** → Coach console workflow
3. **Use Pentara anytime** → Mobile app download

## Coach Console Integration

The coach console should:
1. **List upcoming appointments** (via Calendly API or manual)
2. **Run questionnaire during session** (ONBOARDING_QUESTIONS.md)
3. **Generate profile artifacts**:
   - Personal Manual (PDF)
   - Five-Voice Profile (JSON)
   - Activation Code
4. **Send post-session email** with attachments

## Calendly Webhook Integration (Optional)

For automated workflows, set up webhooks:

```javascript
// Webhook endpoint: /api/calendly-webhook
export default function handler(req, res) {
  const { event, payload } = req.body;
  
  if (event === 'invitee.created') {
    // New booking confirmed
    // - Add to coach dashboard
    // - Send preparation email
  }
  
  if (event === 'invitee.canceled') {
    // Booking canceled
    // - Remove from dashboard
    // - Handle refund if needed
  }
}
```

## Testing

### Development
- Use Calendly's test mode or separate test event
- Test booking flow end-to-end
- Verify email delivery and activation codes

### Production
- Monitor booking completion rates
- Track no-shows and reschedules
- Measure conversion from landing page to booking

## Compliance & Legal

- **Not therapy disclaimer** on booking page
- **Clear pricing** ($150 one-time)
- **Refund policy** in Calendly settings
- **Privacy policy** link in booking flow

---

This integration supports the SPEC requirement for simple monetization without in-app purchases, keeping the app free while monetizing the live onboarding service.
