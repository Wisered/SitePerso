import type { MDXComponents } from "mdx/types";

export function mdxComponents(components: MDXComponents = {}): MDXComponents {
  return {
    // Custom components for MDX can be added here
    ...components,
  };
}
