# Autera Sites Framework

Production-ready web design boilerplate. Clone it, run the intake, build a premium site.

## Setup (one time)

### 1. Install global Claude Code skills

These only need to be installed once on your machine:

# Frontend Design (Anthropic official)
claude install-skill anthropics/claude-code --skill frontend-design

# UI UX Pro Max
npm install -g uipro-cli
uipro init --ai claude

# UI Skills pack
npx ui-skills add baseline-ui
npx ui-skills add fixing-accessibility
npx ui-skills add fixing-motion-performance

# Web Design Guidelines (Vercel)
claude install-skill vercel-labs/agent-skills --skill web-design-guidelines

### 2. Put this framework in your Obsidian vault

Move or clone this folder into your Obsidian vault directory. For example:

~/Documents/Obsidian/Autera/autera-sites-framework/

This is your master template. Never build directly in this folder.

### 3. Exclude node_modules from Obsidian

Open Obsidian Settings > Files and Links > Excluded files. Add:
- **/node_modules/**
- **/dist/**

### 4. Add the shell alias (recommended)

Add this to your ~/.zshrc:

newsite() {
  local name=$1
  if [ -z "$name" ]; then
    echo "Usage: newsite client-name"
    return 1
  fi
  local template=~/Documents/Obsidian/Autera/autera-sites-framework
  local dest=~/Documents/Obsidian/Autera/clients/$name
  cp -r "$template" "$dest"
  cd "$dest"
  rm -rf node_modules
  npm install
  echo "Ready. Run 'claude' to start the intake."
}

Then run: source ~/.zshrc

## New Client Workflow

### Option A - With shell alias (fastest)

newsite client-name
claude
> new client

Three commands. Claude asks the intake questions, builds the site.

### Option B - Manual

cp -r ~/Documents/Obsidian/Autera/autera-sites-framework ~/Documents/Obsidian/Autera/clients/client-name
cd ~/Documents/Obsidian/Autera/clients/client-name
npm install
claude
> new client

### Option C - Pre-fill in Obsidian first

1. Duplicate the template folder into clients/ in Obsidian
2. Pre-fill parts of client-brief.md in Obsidian (colors, business info)
3. Open terminal to that folder
4. Run npm install then claude
5. Claude detects the partially filled brief and asks remaining questions

## Deploy

npm run build
netlify deploy --prod

## Design Principles

- Every site looks custom. Never generic AI aesthetics.
- Near-black backgrounds are never pure #000000. Always tinted.
- Off-white text is never pure #FFFFFF. Always warm.
- Opacity ladders (8+ levels) create depth without extra colors.
- Single accent color used sparingly.
- Typography contrast: serif and sans-serif pairing, never same category.
- Generous whitespace: 96-160px section padding.
- Animations are intentional, not decorative.
- Every footer includes "Powered by Autera" linking to https://autera.us.
