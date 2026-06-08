var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => HeadingSplitterPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var HeadingSplitterPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.addCommand({
      id: "split-note-by-h1",
      name: "Split note by headings - H1",
      callback: () => this.splitActiveNoteByHeadingLevel(1)
    });
    this.addCommand({
      id: "split-note-by-h2",
      name: "Split note by headings - H2",
      callback: () => this.splitActiveNoteByHeadingLevel(2)
    });
    this.addCommand({
      id: "split-note-by-h3",
      name: "Split note by headings - H3",
      callback: () => this.splitActiveNoteByHeadingLevel(3)
    });
  }
  async splitActiveNoteByHeadingLevel(level) {
    const file = this.app.workspace.getActiveFile();
    if (!file) {
      new import_obsidian.Notice("No active file.");
      return;
    }
    if (file.extension !== "md") {
      new import_obsidian.Notice("Active file is not a Markdown note.");
      return;
    }
    const content = await this.app.vault.read(file);
    const sections = this.extractSections(content, level);
    if (sections.length === 0) {
      new import_obsidian.Notice(`No H${level} headings found.`);
      return;
    }
    const targetFolderPath = await this.ensureTargetFolder(file);
    let createdCount = 0;
    for (const section of sections) {
      const safeBaseName = this.sanitizeFileName(section.title);
      if (!safeBaseName) continue;
      const uniquePath = await this.getUniqueNotePath(targetFolderPath, safeBaseName);
      await this.app.vault.create(uniquePath, section.content.trimEnd() + "\n");
      createdCount += 1;
    }
    new import_obsidian.Notice(`Created ${createdCount} note${createdCount === 1 ? "" : "s"} from H${level} headings.`);
  }
  extractSections(content, level) {
    const lines = content.split(/\r?\n/);
    const headingPattern = new RegExp(`^#{${level}}\\s+(.+?)\\s*$`);
    const sections = [];
    let currentTitle = null;
    let currentLines = [];
    for (const line of lines) {
      const match = line.match(headingPattern);
      if (match) {
        if (currentTitle !== null) {
          sections.push({
            title: currentTitle,
            content: currentLines.join("\n")
          });
        }
        currentTitle = this.cleanHeadingTitle(match[1]);
        currentLines = [line];
      } else if (currentTitle !== null) {
        currentLines.push(line);
      }
    }
    if (currentTitle !== null) {
      sections.push({
        title: currentTitle,
        content: currentLines.join("\n")
      });
    }
    return sections;
  }
  cleanHeadingTitle(raw) {
    return raw.replace(/\s+#+\s*$/, "").replace(/\[\[([^\]]+)\]\]/g, "$1").replace(/[*_`~]/g, "").trim();
  }
  sanitizeFileName(name) {
    return name.replace(/[\\/:*?"<>|#^\[\]]/g, " ").replace(/\s+/g, " ").replace(/^\.+/, "").trim();
  }
  async ensureTargetFolder(file) {
    var _a, _b;
    const parentPath = (_b = (_a = file.parent) == null ? void 0 : _a.path) != null ? _b : "";
    const folderName = this.sanitizeFileName(file.basename) || file.basename;
    const targetFolderPath = (0, import_obsidian.normalizePath)(parentPath ? `${parentPath}/${folderName}` : folderName);
    const existing = this.app.vault.getAbstractFileByPath(targetFolderPath);
    if (!existing) {
      await this.createFolderRecursive(targetFolderPath);
    } else if (!(existing instanceof import_obsidian.TFolder)) {
      throw new Error(`Target path exists and is not a folder: ${targetFolderPath}`);
    }
    return targetFolderPath;
  }
  async createFolderRecursive(path) {
    const parts = (0, import_obsidian.normalizePath)(path).split("/");
    let currentPath = "";
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const existing = this.app.vault.getAbstractFileByPath(currentPath);
      if (!existing) {
        await this.app.vault.createFolder(currentPath);
      }
    }
  }
  async getUniqueNotePath(folderPath, baseName) {
    let attempt = 1;
    while (true) {
      const suffix = attempt === 1 ? "" : `-${attempt}`;
      const candidate = (0, import_obsidian.normalizePath)(`${folderPath}/${baseName}${suffix}.md`);
      const exists = this.app.vault.getAbstractFileByPath(candidate);
      if (!exists) return candidate;
      attempt += 1;
    }
  }
};
