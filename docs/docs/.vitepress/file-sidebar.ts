import * as fs from 'fs'
import type { DefaultTheme } from 'vitepress'

export function generateFileSidebar(
  path: string,
  name?: string,
): DefaultTheme.SidebarGroup {
  const files = fs.readdirSync(path)

  if (!name)
    name = path.split('\\').at(-1)

  return {
    text: name,
    items: files.map((file) => {
      const filename = file.replace('.md', '')

      return {
        text: filename,
        link: `../${filename}`,
      }
    }),
  }
}
