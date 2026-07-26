# NorthPeak Digital Optimization Changelog

This is the changelog for Task B, where I optimized the site I built in Task A to get better Lighthouse scores for Performance and Accessibility.

Before I started, I want to be honest that the site was already in a decent starting position because there are no images anywhere on the page (I used inline SVG for the little mountain graphics), so I didn't have to deal with image compression which is usually the biggest performance issue. So most of what I did below is smaller fixes, not a huge rebuild.

## Performance changes

### Removed font weights I wasn't actually using

When I looked back at my Google Fonts link, I was importing a bunch of font weights that I never actually used in my CSS. For example I was importing Fraunces in weight 600 but when I checked my CSS I only use Fraunces at 400 and 500. Same thing with IBM Plex Mono, I was importing weight 500 but every place I use that font in my CSS it's just the default 400 weight. I also went back a second time and found I was still requesting Inter at weight 500 even though I never use that one either, my body text uses 400, 600, and 700.

So I removed every weight I don't use from the font link. This means the browser has to download fewer font files before it can show the text properly.

What this bought me: fewer files to download means the fonts load a bit faster, which helps with First Contentful Paint (basically how fast something useful shows up on screen).

### Made the font stylesheet non blocking

This was the bigger fix. My font link was render blocking, meaning the browser had to stop and wait for that Google Fonts stylesheet to finish loading before it could paint anything on the page at all. I changed it to load with `media="print"` and then switch to `media="all"` once it's done loading, which is a common trick to stop a stylesheet from blocking the page. I also added a `<noscript>` fallback so it still loads normally if someone has JavaScript disabled.

What this bought me: the page can start painting content immediately using a fallback font instead of sitting blank while it waits on an external font file, which is what actually brought my performance score back up.

### Kept font-display swap

I already had this from Task A but wanted to mention it here because it matters for performance. Instead of the browser hiding all my text until the custom fonts finish loading, it shows the text in a normal fallback font first and then swaps it once the real font is ready.

What this bought me: the page doesn't look empty or blank while fonts are loading.

### No images to optimize

Since I used SVG for the graphics instead of actual image files, there was nothing to compress or lazy load here. I'm mentioning this because it's honestly a big part of why my performance score wasn't bad to begin with, it's more of a decision I made in Task A than something I fixed in Task B.

## Accessibility changes

### Fixed a text color that was too light

This was the biggest accessibility issue I found. I had a lighter gray color (slate dim) that I was using for smaller text like the footer text and the little captions under testimonials. When I actually checked the contrast ratio against my dark background, it was around 3.4:1, but you're supposed to have at least 4.5:1 for normal sized text to pass accessibility standards.

I changed the color to be a bit brighter so now it's around 5.1:1, which passes, and it still looks slightly dimmer than my main text color so the design still looks the same, just readable now.

What this bought me: this was actually flagged as a failing check, and it also just genuinely helps people who have trouble reading low contrast text, not only a scoring thing.

### Added a visible focus outline on the form

Before this, when you clicked into a form field with your keyboard (like pressing Tab) the only sign that you were focused on that input was the border color changing slightly, which is pretty hard to notice. I added a soft glow or outline effect around the input when it's focused so it's much more obvious which field you're currently on.

What this bought me: this helps people who navigate with a keyboard instead of a mouse, which Lighthouse doesn't always catch automatically but is still something real that needed fixing.

### Added a skip to content link

I added a hidden link at the very top of the page that only shows up if you tab into it with your keyboard, and it lets you jump straight past the navbar into the main content.

What this bought me: someone using a keyboard or screen reader doesn't have to go through every single nav link every time before reaching the actual page content.

### Labeled my navigation

I added an aria label to my nav bar so screen readers announce it properly instead of just saying navigation with no context.

## Things I didn't need to change

My HTML was already using proper semantic tags from Task A like header, main, section, footer, and my headings went in order (h1 then h2 then h3, no skipping levels), so I didn't have to fix anything there. All my form inputs already had labels connected to them too.

I also didn't minify my CSS or JS files. I looked into this but my files are pretty small already (around 14kb and 4kb) so it wasn't flagged as a real problem. If the project was bigger I would look into a build tool for that, but for a project this size it felt like an unnecessary step.

## Live URL

https://northpeaks-agency.netlify.app/