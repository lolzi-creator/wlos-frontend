# WLOS Frontend Cleanup Recommendations

This document outlines recommended steps to clean up the codebase and eliminate duplicate files.

## Current Issues

1. Duplicated components between `src/features` and `src/components`
2. Duplicated contexts between `src/features` and `src/context`
3. Many TypeScript lint errors (over 200)
4. Inefficient code organization

## Cleanup Strategy

### 1. Folder Structure

- **src/components**: UI components only
- **src/context**: All context providers
- **src/features**: Feature-specific pages and business logic
- **src/pages**: Main page components that compose features and components
- **src/shared**: Shared utilities, types, and constants
- **src/hooks**: Custom React hooks
- **src/services**: API services and external integrations

### 2. Files to Delete (Duplicates)

The following files should be removed as they are duplicated:

```
src/features/farmers/FarmerContext.tsx
src/features/heroes/HeroContext.tsx 
src/features/marketplace/MarketplaceContext.tsx
src/features/token/StakingContext.tsx
src/features/wallet/WalletConnectionProvider.tsx
src/features/wallet/WalletContext.tsx
src/components/staking/StakingIcons.tsx (already removed)
```

### 3. Update Import Statements

After removing duplicated files, update import statements throughout the codebase:

- Use `import { ... } from '../../context/SomeContext'` instead of duplicated contexts
- Use `import { ... } from '../../shared'` for shared utilities, types, and icons
- Update component imports to point to the correct location

### 4. Fix TypeScript Errors

Common patterns to fix:

1. Replace `any` with proper types using the shared types
2. Fix unused variables (remove or use them)
3. Add proper dependencies to useEffect hooks
4. Fix React component export patterns

### 5. Implementation Plan

#### Phase 1: Shared Code and Utilities
- [x] Create shared utilities in `src/shared`
- [x] Move duplicate types to `src/shared/types.ts`
- [x] Move constants to `src/shared/constants.ts`
- [x] Move icons to `src/shared/components/`

#### Phase 2: Consolidate Contexts
- [ ] Keep contexts only in `src/context/`
- [ ] Remove duplicated contexts from `src/features/`
- [ ] Update imports throughout the app

#### Phase 3: Consolidate Components
- [ ] Remove duplicated components
- [ ] Ensure all components are imported from the correct location

#### Phase 4: Cleanup Pages
- [ ] Use `PageLayout` component for consistent page structure
- [ ] Ensure pages import from the correct locations

## Testing After Changes

After each phase:
1. Run `npm run build` to verify the build succeeds
2. Run `npm run lint` to check for remaining lint errors
3. Test the application functionality

## Long-term Recommendations

1. **Convert to CSS Modules**: To avoid CSS conflicts and make styling more maintainable
2. **Add Unit Tests**: Especially for shared utilities and components
3. **Implement Strict TypeScript**: Enable strict mode in tsconfig.json
4. **Documentation**: Add JSDoc comments to shared components and utilities 