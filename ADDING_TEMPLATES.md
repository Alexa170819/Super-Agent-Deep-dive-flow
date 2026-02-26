# Adding New Templates: AI-First Guide

This is a **discovery-based guide** for AI agents. It teaches you HOW to explore the codebase to implement new templates, rather than providing fixed instructions that may become outdated.

**⚠️ CRITICAL RULE**: If anything in this document conflicts with actual code, the CODE is always correct. This document teaches you how to discover patterns, not what they must be.

---

## 1. First: Understand What You're Building

### Modal vs Main Screen?

**Ask yourself**: Where will this appear?

**To find out, explore**:
```bash
# Look at modal examples
Read src/templates/TRTAssessmentTemplate.jsx
Read src/templates/GetMoneyTemplate.jsx

# Look at main screen examples  
Read src/templates/MetricsTemplate.jsx
Read src/templates/DecisionTemplate.jsx
```

**Key differences to observe**:
- 🔍 What imports do they have? (Look for differences in header components)
- 🔍 Do they have a gradient background or use the default?
- 🔍 What's their outer container structure?
- 🔍 Do they use `currentPage`/`totalPages` props?

### Fixed Dimensions Context

⚠️ This is a **fixed-size demo** (375px × 812px iPhone format). 

**Verify current approach**:
```bash
# Check how other templates handle dimensions
Grep "width.*375" src/templates/
Grep "height.*812" src/templates/
```

---

## 2. Design Analysis: Separate Platform from Content

You'll receive a design (JSX/HTML from design tool). **Your job**: identify what's platform vs. what's specific.

### Step 2.1: Identify Platform Components

**🔍 Search for existing components in the design**:

Look for patterns in the design HTML like:
- Status bars, headers with close/share buttons
- Modal headers with titles
- Navigation dots
- Background containers

**Then verify in code**:
```bash
# Find all available header components
Glob "*Header*.jsx" src/components/

# Read each one to understand what they do
Read src/components/AgentHeader.jsx
Read src/components/ModalHeader.jsx

# See them in action
Grep "AgentHeader" src/templates/ --output_mode files_with_matches
Grep "ModalHeader" src/templates/ --output_mode files_with_matches
```

### Step 2.2: Compare Design with Existing Templates

**🔍 Find the closest existing template**:

1. **Visual similarity**: Does it have cards? Progress bars? A list?
2. **Layout similarity**: Vertical list? Grid? Single focus?

```bash
# Quick scan of all templates
LS src/templates/

# Read candidates that look similar
Read src/templates/[ClosestMatch].jsx
```

**What to extract from comparison**:
- ✅ Header structure (do they ALL use the same header component?)
- ✅ Content container padding patterns
- ✅ How they handle scrolling
- ✅ Footer/navigation structure
- ❌ Don't copy blindly - understand the pattern

### Step 2.3: Identify What's Unique

After comparing, you'll know:
- **Reusable**: Headers, footers, layout containers (use existing components)
- **Custom**: Your specific cards, charts, lists (implement from design)

---

## 3. The 4-Layer Architecture

Every template integration touches 4 layers. **Explore each**:

### Layer 1: Template Component

**📁 Location**: `src/templates/YourTemplate.jsx`

**🔍 Learn the pattern**:
```bash
# For modals - read 2 examples
Read src/templates/GetMoneyTemplate.jsx
Read src/templates/TRTAssessmentTemplate.jsx

# For main screens - read 2 examples
Read src/templates/MetricsTemplate.jsx
Read src/templates/IRInteractiveDecisionTemplate.jsx
```

**🎯 What to observe**:
1. **Imports**: What do they import? (headers, nav, assets, css)
2. **Props**: What props do they accept? (`data`, `currentPage`, `totalPages`, `onAction`?)
3. **Structure**: Container → Header → Content → Footer pattern?
4. **Padding strategy**: Where are paddings applied? (check multiple to find pattern)
5. **Fixed widths**: Do they use '375px' or '100%' or flex?

**Common pitfalls to avoid**:
- ❌ Duplicating padding (if parent has 16px, don't add more)
- ❌ Fixed widths on inner elements (use flex/100%)
- ❌ Adding navigation dots manually (check if parent adds them)

### Layer 2: Registry

**📁 Location**: `src/templates/registry.js`

**🔍 Understand the pattern**:
```bash
Read src/templates/registry.js
```

**🎯 Two things to do**:
1. Import and add to `templateRegistry` object
2. Add description to `templateDocs` object

**Pattern is stable** - just follow existing entries.

### Layer 3: Integration Point

**Different for modals vs screens**:

#### For Modals:
**📁 Location**: `src/components/ScenarioModal.jsx`

**🔍 Critical exploration**:
```bash
Read src/components/ScenarioModal.jsx

# Focus on these sections:
# 1. All imports at top
# 2. The "pages" array construction (around line 50-100)
# 3. The rendering section with all the "page.type === 'X'" conditions
```

**🎯 Detection Logic Strategy**:

The `pages` array maps data → page types. **Study the pattern**:

```javascript
// Example pattern you'll find:
if (impl.specificProperty) {
  return { type: 'templateType', data: impl };
}
```

**Your job**:
1. Find a UNIQUE property in your data structure to detect
2. Add your check BEFORE generic checks (more specific first)
3. Add rendering case in JSX

**⚠️ Order matters**: More specific checks go first!

#### For Main Screens:
**📁 Location**: `src/agents/cfo/config.js` (or your agent's config)

**🔍 Understand the flow array**:
```bash
Read src/agents/cfo/config.js
```

**🎯 What to observe**:
- Array of screen objects with `id`, `template`, `dataPath`
- Optional `modals` array for screens that open modals
- Order determines navigation sequence

**Pattern for new screen**:
```javascript
{
  id: 'uniqueId',
  template: 'YourTemplateName',
  dataPath: 'dataKey'  // Must match key in data.js
}
```

### Layer 4: Test Data

**📁 Location**: `src/agents/cfo/data.js`

**🔍 Study data structures**:
```bash
# See how data is organized
Read src/agents/cfo/data.js --limit 100

# Find similar data structures
Grep "items:" src/agents/cfo/data.js -A 5
```

**🎯 Data structure principles**:
1. **Flat & simple**: Easy to detect, easy to iterate
2. **Unique identifiers**: Use property names that won't clash
3. **Boolean flags**: For conditional rendering (e.g., `positive: true/false`)

**Placement**:
- **Modals**: Add to `strategy.implementation` array (appears in modal flow)
- **Screens**: Add as top-level property, reference in config.js

---

## 4. The Discovery Process (Step-by-Step)

### ✅ Step 1: Classify & Research

```bash
# Is it modal or main screen?
# Read examples of the same type
Read src/templates/[SimilarTemplate].jsx
```

### ✅ Step 2: Identify Platform Components

```bash
# What headers/footers exist?
LS src/components/
Grep "Header" src/components/ --output_mode files_with_matches

# How are they used?
Grep "import.*Header" src/templates/ -B 1 -A 1
```

### ✅ Step 3: Extract Design Content

- Remove platform elements (headers, navs, modal containers)
- Keep unique styling and content structure
- Note colors, spacing, typography

### ✅ Step 4: Implement Template

```bash
# While implementing, constantly reference:
Read src/templates/[ClosestExample].jsx

# Check padding patterns:
Grep "padding.*:" src/templates/MetricsTemplate.jsx
```

### ✅ Step 5: Register

```bash
# Simple - just follow the pattern in:
Read src/templates/registry.js
```

### ✅ Step 6: Wire Up Detection/Config

For modals:
```bash
# Study existing detection logic thoroughly
Read src/components/ScenarioModal.jsx --offset 40 --limit 80
```

For screens:
```bash
# Add to flow array
Read src/agents/cfo/config.js
```

### ✅ Step 7: Add Test Data

```bash
# Study similar data structures first
Grep "title:" src/agents/cfo/data.js -A 10 | head -50
```

### ✅ Step 8: Verify Placement

**For screens**: Added at end of main flow → inform user and ask for confirmation

**For modals**: Added at end of existing modal flow → inform user where it appears

---

## 5. Common Patterns (Verify Before Using)

These are patterns observed in the current codebase. **Always verify they're still valid**:

### Headers

**Check current approach**:
```bash
# Modals
Grep "ModalHeader" src/templates/ -A 2

# Main screens  
Grep "AgentHeader\|MobileStatusHeader" src/templates/ -A 2
```

### Padding

**Discover the pattern**:
```bash
# Check multiple templates for consistency
Grep "padding.*24" src/templates/ | head -20
```

### Navigation Dots

**Who adds them?**
```bash
Grep "NavigationDots" src/templates/
Grep "NavigationDots" src/components/
```

### Color Conventions

**Verify current colors**:
```bash
Grep "#48FF9B\|#FF3469\|#A6A6A6" src/templates/ -A 1 -B 1
```

---

## 6. Pitfalls & How to Avoid Them

### ❌ Pitfall: Assuming Fixed Patterns

**Problem**: You assume headers are always implemented a certain way

**Solution**:
```bash
# ALWAYS check current usage before implementing
Grep "import.*Header" src/templates/ 
Read [latest template file]
```

### ❌ Pitfall: Duplicating Padding

**Problem**: Design shows spacing, you add padding, but parent already has it

**Solution**:
```bash
# Check parent containers in similar templates
Read src/templates/MetricsTemplate.jsx
# Look for nested padding applications
```

### ❌ Pitfall: Wrong Detection Logic

**Problem**: Your template doesn't appear, or wrong template appears

**Solution**:
```bash
# Study detection logic order and uniqueness
Read src/components/ScenarioModal.jsx
# Ensure your property is truly unique
```

---

## 7. Verification Checklist

Before finishing:

- [ ] **Explored** 2+ similar templates for patterns
- [ ] **Verified** which header component to use (not assumed)
- [ ] **Checked** padding strategy in parent containers
- [ ] **Confirmed** navigation dots handling (auto or manual?)
- [ ] **Tested** detection logic (for modals) or config entry (for screens)
- [ ] **Added** test data in correct location
- [ ] **Informed** user of placement
- [ ] **No overlapping** content with navigation area (bottom 60-80px)

---

## 8. When In Doubt

**Golden Rule**: When documentation conflicts with code, trust the code.

**Exploration sequence**:
1. Find 2-3 similar templates → read them
2. Find the components they use → read those
3. Find where they're registered/wired → read that
4. Implement following the patterns YOU discovered

**This documentation teaches you to fish, not what fish to catch.**

---

## Quick Reference Commands

```bash
# Discover all templates
LS src/templates/

# Find modal templates
Grep "ModalHeader" src/templates/ --output_mode files_with_matches

# Find main screen templates  
Grep "AgentHeader" src/templates/ --output_mode files_with_matches

# Understand detection logic
Read src/components/ScenarioModal.jsx

# Understand main flow
Read src/agents/cfo/config.js

# See data structures
Read src/agents/cfo/data.js --limit 100

# Find component usage
Grep "ComponentName" src/templates/ -B 2 -A 2
```

---

**Remember**: This codebase evolves. Your job is to explore, discover patterns, and follow what EXISTS, not what this doc says should exist.
