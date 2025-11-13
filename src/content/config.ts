import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

/**
 * Blog posts (já existia no AstroWind)
 */
const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

/**
 * Páginas institucionais (Home, Sobre, Frentes, Projetos, Governança, Contato, etc.)
 */
const pageCollection = defineCollection({
  loader: glob({ pattern: ['*.md'], base: 'src/data/page' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    layout: z.string().optional(), // se quiser usar um layout específico
    metadata: metadataDefinition(),
  }),
});

/**
 * Projetos do portfólio institucional
 */
const projectCollection = defineCollection({
  loader: glob({ pattern: ['*.md'], base: 'src/data/project' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    year: z.number(),
    location: z.string().optional(),
    partners: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    metadata: metadataDefinition(),
  }),
});

/**
 * Equipe (diretoria, conselheiros, etc.)
 */
const teamCollection = defineCollection({
  loader: glob({ pattern: ['*.md'], base: 'src/data/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    order: z.number().optional(),
    metadata: metadataDefinition(),
  }),
});

export const collections = {
  post: postCollection,
  page: pageCollection,
  project: projectCollection,
  team: teamCollection,
};
