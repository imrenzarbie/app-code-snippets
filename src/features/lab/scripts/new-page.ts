import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = process.argv[2];
if (!input) {
    console.error("❌ Usage: pnpm lab:page agent-setup");
    process.exit(1);
}

// Convert to PascalCase for component (agent-setup -> AgentSetup)
const pascalName = input
    .replace(/[-_]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^\w/, (c) => c.toUpperCase());

// Keep kebab-case for filename (AgentSetup -> agent-setup)
const kebabName = input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

const componentName = `${pascalName}Page`;
const fileName = `${kebabName}.tsx`;

// Paths
const rootDir = resolve(__dirname, "../../..");
const pagesDir = resolve(__dirname, "../pages");
const navbarPath = resolve(rootDir, "components", "navbar.tsx");
const routerPath = resolve(rootDir, "routes", "index.tsx");

// 1. CREATE PAGE FILE
const content = `const ${componentName} = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* PASTE COMPONENT HERE */}
      <div className="p-8">
        <h1 className="text-2xl font-bold">${pascalName}</h1>
      </div>
    </div>
  )
}

export default ${componentName}
`;

if (!existsSync(pagesDir)) {
    mkdirSync(pagesDir, { recursive: true });
}

const filePath = resolve(pagesDir, fileName);
writeFileSync(filePath, content);
console.log(`✅ Created: src/features/lab/pages/${fileName}`);

// 2. UPDATE NAVBAR
if (existsSync(navbarPath)) {
    let navbarContent = readFileSync(navbarPath, "utf8");

    // Check if route link already exists
    const linkPattern = new RegExp(`to="/lab/${kebabName}"`);
    if (!linkPattern.test(navbarContent)) {
        const navLink = `                    <Link
                        to="/lab/${kebabName}"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        ${pascalName}
                    </Link>`;

        // Check if nav section exists
        if (navbarContent.includes("</nav>")) {
            // Nav exists, insert link before closing tag
            navbarContent = navbarContent.replace(
                /<\/nav>/,
                `${navLink}\n                </nav>`,
            );
        } else {
            // Nav doesn't exist, create it with the link
            const logoPattern =
                /<div className="flex items-center gap-2 font-semibold">\s*<span>Logo<\/span>\s*<\/div>/;
            navbarContent = navbarContent.replace(
                logoPattern,
                `<div className="flex items-center gap-2 font-semibold">
                    <span>Logo</span>
                </div>
                <nav className="ml-auto flex items-center gap-4">
${navLink}
                </nav>`,
            );
        }
        writeFileSync(navbarPath, navbarContent);
        console.log(`🔗 Updated: Navbar with link to /lab/${kebabName}`);
    }
}

// 3. UPDATE ROUTER
if (existsSync(routerPath)) {
    let routerContent = readFileSync(routerPath, "utf8");

    // Add import for the new component
    const importLine = `import ${componentName} from "@/features/lab/pages/${kebabName}";\n`;

    if (!routerContent.includes(importLine.trim())) {
        // Find last import and insert after it
        const lines = routerContent.split("\n");
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith("import ")) {
                lastImportIndex = i;
            }
        }
        if (lastImportIndex !== -1) {
            lines.splice(lastImportIndex + 1, 0, importLine.trimEnd());
            routerContent = lines.join("\n");
        }
    }

    // Add route to children array
    const routeEntry = `            {
                path: "/lab/${kebabName}",
                element: <${componentName} />,
            },`;

    // Check if route already exists
    if (!routerContent.includes(`path: "/lab/${kebabName}"`)) {
        // Find the closing bracket of children array and insert before it
        routerContent = routerContent.replace(
            /(children: \[\s*)([\s\S]*?)(\s*\],)/,
            (match, prefix, children, suffix) => {
                return `${prefix}${children}${routeEntry}\n        ${suffix}`;
            },
        );
    }

    writeFileSync(routerPath, routerContent);
    console.log(`🛣️  Updated: Router with route /lab/${kebabName}`);
}

console.log(`\n🌐 http://localhost:3000/lab/${kebabName}`);
console.log(`📝 Component: ${componentName}`);
