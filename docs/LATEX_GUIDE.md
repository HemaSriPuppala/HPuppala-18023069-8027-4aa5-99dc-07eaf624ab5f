# LaTeX Documentation Compilation Guide

## 📄 Document Location

The LaTeX documentation is located at:

```
docs/documentation.tex
```

## 🔧 Prerequisites

To compile the LaTeX document, you need:

1. **LaTeX Distribution** (choose one):
   - **Windows**: [MiKTeX](https://miktex.org/download) or [TeX Live](https://www.tug.org/texlive/)
   - **macOS**: [MacTeX](https://www.tug.org/mactex/)
   - **Linux**: TeX Live (install via package manager)

2. **PDF Viewer**: Any PDF reader (Adobe Reader, SumatraPDF, Preview, etc.)

## 📦 Required LaTeX Packages

The document uses the following packages (auto-installed by most distributions):

- `geometry` - Page layout
- `graphicx` - Image handling
- `hyperref` - Hyperlinks and PDF metadata
- `listings` - Code syntax highlighting
- `xcolor` - Color support
- `fancyhdr` - Headers and footers
- `titlesec` - Section formatting
- `tcolorbox` - Colored boxes
- `enumitem` - List formatting
- `booktabs` - Professional tables
- `longtable` - Multi-page tables
- `float` - Float positioning

## 🚀 Compilation Methods

### Method 1: Using Command Line (Recommended)

Navigate to the docs directory and run:

```bash
cd docs
pdflatex documentation.tex
pdflatex documentation.tex  # Run twice for proper references
```

**Why twice?** LaTeX needs two passes to resolve cross-references and table of contents.

### Method 2: Using TeXworks (GUI)

1. Open `documentation.tex` in TeXworks
2. Select "pdfLaTeX" from the dropdown
3. Click the green "Typeset" button
4. Run it twice for proper formatting

### Method 3: Using Overleaf (Online)

1. Go to [Overleaf](https://www.overleaf.com/)
2. Create a new project
3. Upload `documentation.tex`
4. It will compile automatically

### Method 4: Using VS Code with LaTeX Workshop

1. Install [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop) extension
2. Open `documentation.tex`
3. Press `Ctrl+Alt+B` to build
4. PDF will auto-generate

## 📋 Compilation Commands

### Full Compilation (with bibliography if added later)

```bash
pdflatex documentation.tex
bibtex documentation
pdflatex documentation.tex
pdflatex documentation.tex
```

### Quick Compilation (for drafts)

```bash
pdflatex -interaction=nonstopmode documentation.tex
```

### Clean Build Files

```bash
# Windows (PowerShell)
Remove-Item *.aux, *.log, *.out, *.toc, *.lof, *.lot

# Linux/Mac
rm -f *.aux *.log *.out *.toc *.lof *.lot
```

## 📊 Output Files

After compilation, you'll get:

- `documentation.pdf` - **The final PDF document** ✅
- `documentation.aux` - Auxiliary file (can delete)
- `documentation.log` - Compilation log (can delete)
- `documentation.out` - Hyperref output (can delete)
- `documentation.toc` - Table of contents (can delete)

**Keep only the PDF file for submission!**

## 🎨 Customization

### Change Colors

Edit the color definitions in the preamble:

```latex
\definecolor{primaryblue}{RGB}{0,102,204}  % Change RGB values
```

### Add Your Logo

1. Place your logo image in the `docs/` folder
2. Add to title page:

```latex
\includegraphics[width=3cm]{logo.png}
```

### Modify Page Layout

Adjust margins in the geometry package:

```latex
\geometry{
    left=2.5cm,    % Change these values
    right=2.5cm,
    top=3cm,
    bottom=3cm
}
```

## 🐛 Troubleshooting

### Error: "Package not found"

**Solution**: Install missing packages via your LaTeX distribution's package manager.

**MiKTeX**: Packages auto-install on first use
**TeX Live**: Run `tlmgr install <package-name>`

### Error: "Undefined control sequence"

**Solution**: Make sure all packages are loaded in the preamble.

### PDF not updating

**Solution**:

1. Close the PDF viewer
2. Delete `.aux` files
3. Recompile twice

### Table of Contents not showing

**Solution**: Run pdflatex **twice** - first pass creates TOC, second pass includes it.

## 📝 Document Structure

The documentation includes:

1. **Title Page** - Professional cover page
2. **Table of Contents** - Auto-generated navigation
3. **Abstract** - Project overview
4. **Introduction** - Objectives and scope
5. **Technology Stack** - All technologies used
6. **System Architecture** - Design and structure
7. **Database Design** - Schema and relationships
8. **Authentication** - Security implementation
9. **Features** - Detailed feature descriptions
10. **Security** - Security measures
11. **API Documentation** - Complete API reference
12. **Installation** - Setup instructions
13. **Testing** - Test procedures
14. **Conclusion** - Summary and future work
15. **References** - External resources
16. **Appendices** - Additional information

## 💡 Tips

- **Always compile twice** for proper cross-references
- **Use a good PDF viewer** that auto-refreshes (SumatraPDF on Windows)
- **Keep source files organized** in the docs folder
- **Add screenshots** by placing images in `docs/screenshots/` and referencing them
- **Version control** - commit the `.tex` file, not the `.pdf`

## 🎯 Quick Start

**Fastest way to get a PDF:**

```bash
cd docs
pdflatex documentation.tex && pdflatex documentation.tex
```

Done! Your `documentation.pdf` is ready! 🎉

---

## 📧 Need Help?

If you encounter issues:

1. Check the `.log` file for error messages
2. Ensure all packages are installed
3. Try compiling on [Overleaf](https://www.overleaf.com/) as a fallback
