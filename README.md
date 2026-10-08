# HomeServe - home services marketplace (front-end prototype)

Open the folder in VS Code, install the **Live Server** extension, right-click `index.html` > Open with Live Server.
Or run: `npx serve .`

## Structure
- `index.html` page shell
- `css/styles.css` design tokens and styles
- `js/data.js` categories, services, packages, coupons, seed providers
- `js/state.js` state, persistence (localStorage), notifications, provider eligibility, totals
- `js/customer.js` shop, cart, checkout, bookings, cancellation, ratings
- `js/provider.js` requests, job workflow, earnings, availability
- `js/admin.js` dashboard, provider verification, booking assignment, commission
- `js/app.js` navigation and render loop

## Next steps toward production
Backend (Node/Express + PostgreSQL + JWT), real auth and roles, payment gateway (Razorpay), invoices, chat (Socket.IO), support tickets, coupon and service management.
