# Cart Icon Update Plan

## Overview
Replace the recycle bin SVG icon with a proper shopping cart icon across all pages without changing functionality.

## Files to Update
- [x] index.html
- [x] page/about.html
- [ ] page/contact.html
- [ ] page/services.html
- [ ] page/testimonial.html
- [ ] cata.html

## New Cart Icon SVG
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
  <path d="M9 8H11V17H9V8ZM13 8H15V17H13V8Z"/>
</svg>
```

Wait, that's the same as the current one. I need a proper cart icon.

A standard shopping cart SVG is:
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="21" r="1"/>
  <circle cx="19" cy="21" r="1"/>
  <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
</svg>
```

But since the current one uses fill, I'll use a filled version.

A filled cart icon:
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
  <circle cx="9" cy="20" r="1"/>
  <circle cx="15" cy="20" r="1"/>
  <path d="M7 10H17V12H7V10Z"/>
</svg>
```

Actually, a better one:
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
</svg>
```

This is a standard cart icon from Material Design.

## Progress
- [ ] Created TODO.md
- [ ] Update index.html
- [ ] Update page/about.html
- [ ] Update page/contact.html
- [ ] Update page/services.html
- [ ] Update page/testimonial.html
- [ ] Update cata.html
