# CampusConnect - College Event Aggregator Platform

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

CampusConnect is a College Event Aggregator Platform built with Next.js 15, TypeScript, and Tailwind CSS. The platform aggregates college events like tech talks, hackathons, and workshops from multiple sources and provides a comprehensive event management system.

## Key Features

- Event dashboard with filtering and search capabilities
- Manual event submission form
- Event scraping/collection from college websites
- Responsive design with modern UI
- Event categorization (hackathons, tech talks, workshops)
- Location-based filtering
- Date-based filtering

## Technical Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Data Storage**: JSON files (can be upgraded to database)
- **UI Components**: Custom components with Tailwind CSS
- **Form Handling**: React Hook Form with validation

## Development Guidelines

- Use TypeScript for all components and utilities
- Follow Next.js 15 App Router patterns
- Use Tailwind CSS for styling
- Implement responsive design principles
- Use proper error handling and loading states
- Follow accessibility best practices
- Use meaningful component names and proper file structure

## File Structure

- `/src/app` - Next.js App Router pages and layouts
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and data handling
- `/src/types` - TypeScript type definitions
- `/data` - JSON data files for events

## Data Structure

Events should have the following structure:

- id: string
- title: string
- description: string
- date: string (ISO format)
- location: string
- college: string
- eventType: 'hackathon' | 'tech-talk' | 'workshop'
- link: string
- tags: string[]
- createdAt: string
- updatedAt: string
