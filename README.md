# Heading Splitter – Installation and Usage Guide

`Heading Splitter` is a minimal Obsidian plugin that splits the current note into multiple new notes based on H1, H2, or H3 headings.

## Features

The plugin currently provides three commands: `Split note by headings - H1`, `Split note by headings - H2`, and `Split note by headings - H3`, corresponding to splitting the active note by level 1, 2, or 3 headings.

After splitting, it behaves as follows:

- The original note remains unchanged.  
- Each heading section becomes a new note, and the original heading line is preserved.  
- New notes are saved in a **subfolder under the original note’s folder, named after the original note’s title**.  
- Each new note’s filename defaults to the corresponding heading text; if a filename already exists, `-2`, `-3`, etc. are appended automatically.

## Installing into Obsidian

When manually installing a local plugin, you normally only need to place `main.js` and `manifest.json` in the vault’s plugin folder.

The target directory structure should look like this:

```text
YourVault/
  .obsidian/
    plugins/
      heading-splitter/
        main.js
        manifest.json
```

Installation steps:

1. Locate the `.obsidian/plugins/` folder under the root of your Obsidian vault. If there is no `plugins` folder, create it manually.  
2. Inside `plugins`, create a new folder. It is recommended to use the same name as the `id` in `manifest.json`, i.e. `heading-splitter`.  
3. Copy `main.js` and `manifest.json` into this folder.

## Enabling the Plugin

After copying the files, open Obsidian and go to **Settings → Community plugins**, and make sure community plugins are enabled.

Then, in the **Installed plugins** list, find **Heading Splitter** and toggle it on.

If the plugin does not appear immediately, you can try:

- Closing and reopening Obsidian.  
- Re-opening or refreshing the Community plugins page.  
- Confirming that `main.js` and `manifest.json` really exist in the plugin folder.

## How to Use

Once the plugin is enabled:

1. Open a note you want to split.  
2. Press `Ctrl + P` (on macOS, `Cmd + P`) to open the Command Palette.  
3. Type `Split note by headings` and you should see the following commands:

   - `Split note by headings - H1`  
   - `Split note by headings - H2`  
   - `Split note by headings - H3`  

4. Choose one of the commands, and the plugin will split the current note according to the selected heading level.

For example, if your current note is organized with `##` headings, then after running `Split note by headings - H2`:

- The original note remains unchanged.  
- A subfolder with the same name as the original note is created under the original note’s folder.  
- Each H2 heading and its following content become a new note.  
- Each new note keeps that H2 heading line as the first line of its content.

## Hotkey Setup

If you need to use a command frequently, you can go to **Settings → Hotkeys**, search for the corresponding command name, and assign a custom hotkey.

For example, you can bind a shortcut to `Split note by headings - H2` to speed up splitting long notes in daily use.

## FAQ

### 1. The commands don’t appear in the Command Palette

First, make sure the plugin is enabled under **Community plugins**, and verify that both `main.js` and `manifest.json` exist in the `heading-splitter` plugin folder.
