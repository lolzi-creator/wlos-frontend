# Code Duplication Cleanup Guide

This document outlines the strategy for cleaning up duplicate code between the `src/features` and `src/components` directories.

## Current Problem

We have duplicated files in both directories:
- UI components in both `src/components` and `src/features`
- Context providers in both directories
- CSS files duplicated
- Similar components with slight variations

## Cleanup Strategy

### 1. Project Structure Guidelines

**Components (`src/components`)**
- Reusable UI components with no business logic
- Layout components
- Common UI elements
- Shared sections that can be used in multiple features

**Features (`src/features`)**
- Feature-specific business logic
- Feature contexts and providers
- Feature-specific components that are not shared
- Page components that compose shared components

**Shared (`src/shared`)**
- Types, interfaces, and constants used across the application
- Utility functions
- Shared icons and other visual elements
- API service definitions

### 2. Specific Duplications to Resolve

#### Contexts and Providers
- Keep all context providers in `src/context/`
- Remove duplicated providers from `src/features/`

#### Component Duplication
- Keep UI components in `src/components/`
- Remove duplicated UI components from `src/features/`
- Feature-specific pages should remain in `src/features/` but use components from `src/components/`

#### CSS Files
- Consolidate duplicated CSS files
- Consider using CSS modules or styled-components to avoid global CSS conflicts

### 3. Implementation Plan

1. **Phase 1: Consolidate Shared Code**
   - Move all duplicated types and utilities to `src/shared/`
   - Create shared icons and constants

2. **Phase 2: Context Consolidation**
   - Keep all contexts in one location (src/context)
   - Update imports throughout the app

3. **Phase 3: Component Consolidation**
   - Keep the better implementation of each component
   - Update all imports to reference the single implementation
   - Remove duplicated files

4. **Phase 4: Page Component Cleanup**
   - Ensure page components import from the correct locations
   - Fix any broken functionality

## File Mapping

Below is a mapping of duplicate files and which ones to keep:

| Duplicate Files | Keep | Remove |
|-----------------|------|--------|
| `src/features/*/Context.tsx` and `src/context/*.tsx` | `src/context/*.tsx` | `src/features/*/Context.tsx` |
| UI components in both directories | `src/components/` | `src/features/` duplicates |
| CSS files | Merge into `src/components/` | Remove duplicates |

## Testing

After each phase:
1. Verify the application builds without errors
2. Test each affected feature to ensure functionality is preserved
3. Check for visual regressions 