- [1. EmberNavarro](#1-embernavarro)
  - [1.1. Intro](#11-intro)
    - [1.1.1. Background](#111-background)
      - [1.1.1.1. Next.js](#1111-nextjs)
      - [1.1.1.2. Material UI](#1112-material-ui)
      - [1.1.1.3. Contentful CMS](#1113-contentful-cms)
  - [1.2. Features](#12-features)
  - [1.3. Future Additions](#13-future-additions)
  - [1.4. Set up](#14-set-up)
  - [1.5. Deployment URLs](#15-deployment-urls)

# 1. EmberNavarro

A Next.js portfolio website.

## 1.1. Intro

A portfolio website that features a UI/UX designer's projects and ideas built using Next.js with Contentful serving the content. The website is custom designed by the designer Ember Navarro.
[Sketch Design](https://sketch.cloud/s/dbb46be9-8092-409e-89d3-804a4ff86bfe)

### 1.1.1. Background

Here is the key list of goals/ideas that influenced the decision making on architecture and tech structure.
Fast load times, SEO considerations, revalidate stale data without interruptions or unnecessary builds, optimizing images and serving the correct size/dimensions for a device are the key factors used to determine the tech stack/libraries used.

#### 1.1.1.1. Next.js

Next.js offers many features out of the box that includes static site generation, incremental static regeneration, server side rendering, image optimization and many more. Most of these features are utilized in this project.

#### 1.1.1.2. Material UI

A fully featured UI library that includes pre-built components to start with. The styling solution extended from JSS comes packaged with the library.

#### 1.1.1.3. Contentful CMS

A headless CMS was the choice that improves ease of development to incorporate the custom design. Contentful was chosen due to prior experience and GraphQL can be utilized.

## 1.2. Features

1. Fully responsive website with desktop, tablet and mobile views.

2. Uses Material-UI for styling and components.

3. Built with Next.js 10.0.

4. Static site generation for fast page loads.

5. Incremental Static Regeneration (ISR) to revalidate data without triggering a rebuild.

6. Next.js image optimization.

7. Content served from Contentful CMS.

8. Preview page available prior to publish.

9. Contentful data query using GraphQL.

10. Desktop page speed score 90+/100.

## 1.3. Future Additions

1. Integrate Facebook messenger to website.

2. Methods of contact.

3. Upgrade to Material UI v5 when available.

4. Upgrade masonry component to native MUI component with customizations.

## 1.4. Set up

1. Duplicate .env.local.example and rename the duplicate to .env.local

2. For each env variable, enter in the appropriate values for the contentful environment.

   - Retrieve your API keys by going to Contentful settings > API keys > Add API key
   - The preview variable key can be retrieved from Contentful settings > Content preview

3. Run these commands

- `npm install`
- `npm run dev`

## 1.5. Deployment URLs

Deployment using Vercel.

[Production](https://embernavarro.com/)
