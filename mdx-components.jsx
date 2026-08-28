import { mdxCustomComponents } from "@/components/docs/mdx-custom-components";

export function useMDXComponents(components) {
  return {
    ...mdxCustomComponents,
    ...components,
  };
}
