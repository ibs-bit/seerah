# Production Deployment Audit Prompt

## Instructions for the Auditing Agent

You are tasked with conducting a comprehensive, objective audit of this project's readiness for production deployment. Your role is to **assess facts, identify gaps, and provide actionable recommendations** without bias or unnecessary argumentation.

### Audit Principles

1. **Fact-Based Assessment**: Base all evaluations on verifiable evidence found in the codebase, configuration files, and project structure.
2. **Objective Criteria**: Use industry-standard production readiness criteria. Do not make assumptions about what "should" exist—verify what actually exists.
3. **Logical Prioritization**: Categorize findings by severity (Critical, High, Medium, Low) and impact on production stability, security, and user experience.
4. **Actionable Output**: For each gap identified, provide:
   - What is missing or insufficient
   - Why it matters for production
   - Specific steps to address it
   - Where applicable, reference relevant files or code locations

---

## Audit Checklist

### 1. Environment Configuration & Secrets Management

**Objective**: Verify secure and proper environment variable handling.

**Checks**:

- [ ] `.env.example` or `.env.template` exists with all required variables documented (without sensitive values)
- [ ] `.env` is properly gitignored (verify `.gitignore` includes `.env*` patterns)
- [ ] All environment variables are accessed via `process.env` with proper fallbacks
- [ ] No hardcoded secrets, API keys, or database credentials in source code
- [ ] Production environment variables are documented (DATABASE_URL, API keys, etc.)
- [ ] Environment-specific configurations are properly separated (dev/staging/prod)

**Verification Method**:

- Search codebase for hardcoded credentials
- Check `.gitignore` for environment file patterns
- Review all `process.env` usages for proper handling

---

### 2. Database Configuration & Production Readiness

**Objective**: Ensure database is production-ready and properly configured.

**Checks**:

- [ ] Database provider is appropriate for production (currently SQLite in schema—verify if this is intentional)
- [ ] Database connection pooling is configured (if applicable)
- [ ] Migration strategy is defined and tested
- [ ] Database backup strategy is documented
- [ ] Connection string uses environment variables, not hardcoded values
- [ ] Database indexes are optimized for query patterns (verify Prisma schema indexes)
- [ ] Seed data strategy is documented (production vs. development seeds)

**Verification Method**:

- Review `prisma/schema.prisma` for database provider and configuration
- Check `lib/db.ts` for connection handling
- Verify migration commands in `package.json`

---

### 3. API Security & Validation

**Objective**: Ensure API endpoints are secure and properly validated.

**Checks**:

- [ ] All API routes validate input parameters (check for Zod or similar validation)
- [ ] SQL injection prevention verified (Prisma parameterized queries)
- [ ] Rate limiting is implemented (if applicable)
- [ ] CORS is properly configured for production domains
- [ ] Error messages don't expose sensitive information (database errors, stack traces)
- [ ] API routes handle edge cases (invalid IDs, missing data, etc.)
- [ ] Request size limits are configured

**Verification Method**:

- Review all files in `app/api/` directory
- Check for input validation libraries (Zod usage)
- Verify error handling patterns

---

### 4. Error Handling & Logging

**Objective**: Ensure proper error handling and observability.

**Checks**:

- [ ] Global error boundaries are implemented (`error.tsx`, `not-found.tsx`)
- [ ] API errors return appropriate HTTP status codes
- [ ] Error logging mechanism is in place (console.log is not sufficient for production)
- [ ] Unhandled promise rejections are caught
- [ ] Database errors are handled gracefully
- [ ] User-facing error messages are user-friendly (no technical details exposed)

**Verification Method**:

- Check for `error.tsx` and `not-found.tsx` in app directory
- Review API route error handling
- Search for error handling patterns

---

### 5. Performance & Optimization

**Objective**: Verify performance optimizations are in place.

**Checks**:

- [ ] Images are optimized (Next.js Image component usage)
- [ ] Code splitting is implemented (dynamic imports where appropriate)
- [ ] Database queries are optimized (no N+1 queries, proper indexing)
- [ ] Static assets are properly cached
- [ ] Bundle size is reasonable (check build output)
- [ ] Lazy loading is implemented for heavy components
- [ ] API responses are cached where appropriate

**Verification Method**:

- Run `npm run build` and analyze output
- Review component imports for dynamic loading
- Check database query patterns in API routes

---

### 6. Build & Deployment Configuration

**Objective**: Ensure build process is production-ready.

**Checks**:

- [ ] `next.config.ts` has production-appropriate settings
- [ ] Build succeeds without errors or warnings
- [ ] TypeScript compilation passes (`tsc --noEmit`)
- [ ] ESLint passes without critical errors
- [ ] Environment variables are properly configured for build process
- [ ] Output directory structure is correct
- [ ] Static file serving is configured (if applicable)

**Verification Method**:

- Run `npm run build`
- Run `npm run lint`
- Review `next.config.ts` configuration

---

### 7. Testing & Quality Assurance

**Objective**: Verify code quality and test coverage.

**Checks**:

- [ ] Unit tests exist for critical functions
- [ ] Integration tests exist for API routes
- [ ] E2E tests exist for critical user flows (if applicable)
- [ ] Test coverage meets minimum threshold (if defined)
- [ ] Tests pass in CI/CD environment
- [ ] Manual testing checklist exists for key features

**Verification Method**:

- Check for test files (`*.test.ts`, `*.spec.ts`)
- Review test configuration in `package.json`
- Verify test scripts exist and run successfully

---

### 8. Security Vulnerabilities

**Objective**: Identify and document security vulnerabilities.

**Checks**:

- [ ] Dependencies are up-to-date (no known CVEs)
- [ ] Security scanning has been performed (Snyk, npm audit)
- [ ] Authentication/authorization is implemented (if user accounts exist)
- [ ] XSS prevention verified (React's built-in escaping, sanitization)
- [ ] CSRF protection is in place (if applicable)
- [ ] Content Security Policy headers are configured
- [ ] Sensitive data is not logged or exposed

**Verification Method**:

- Run `npm audit` or security scanning tool
- Review authentication implementation (if exists)
- Check for security headers in Next.js config

---

### 9. Documentation & Runbooks

**Objective**: Ensure deployment and operations documentation exists.

**Checks**:

- [ ] README.md includes production deployment instructions
- [ ] Environment setup is documented
- [ ] Database migration process is documented
- [ ] Rollback procedure is documented
- [ ] Monitoring and alerting setup is documented (if applicable)
- [ ] Troubleshooting guide exists for common issues

**Verification Method**:

- Review README.md completeness
- Check for deployment documentation
- Verify operational runbooks exist

---

### 10. Monitoring & Observability

**Objective**: Verify production monitoring capabilities.

**Checks**:

- [ ] Application monitoring is configured (error tracking, performance monitoring)
- [ ] Health check endpoint exists (`/api/health` or similar)
- [ ] Logging aggregation is configured (if applicable)
- [ ] Metrics collection is set up (if applicable)
- [ ] Alerting thresholds are defined

**Verification Method**:

- Check for health check endpoints
- Review monitoring tool integration
- Verify logging configuration

---

### 11. Scalability & Infrastructure

**Objective**: Assess scalability considerations.

**Checks**:

- [ ] Database can handle expected load (connection limits, query performance)
- [ ] Caching strategy is implemented (if applicable)
- [ ] CDN configuration is in place (if applicable)
- [ ] Horizontal scaling considerations are addressed
- [ ] File storage strategy is defined (if applicable)

**Verification Method**:

- Review database configuration
- Check for caching implementations
- Assess infrastructure requirements

---

### 12. Legal & Compliance

**Objective**: Verify compliance requirements are met.

**Checks**:

- [ ] Privacy policy exists (if user data is collected)
- [ ] Terms of service exist (if applicable)
- [ ] GDPR compliance is addressed (if applicable)
- [ ] Data retention policies are defined
- [ ] Cookie consent is implemented (if applicable)

**Verification Method**:

- Check for legal documents
- Review data collection practices
- Verify compliance implementations

---

## Audit Report Format

After completing the audit, provide a structured report:

### Executive Summary

- Overall production readiness score (0-100%)
- Critical blockers (must fix before deployment)
- High-priority items (should fix before deployment)
- Medium-priority items (can fix post-deployment)
- Low-priority items (nice to have)

### Detailed Findings

For each category, provide:

1. **Status**: ✅ Complete | ⚠️ Partial | ❌ Missing
2. **Findings**: Specific items checked and their status
3. **Gaps Identified**: What is missing or insufficient
4. **Recommendations**: Specific, actionable steps to address gaps
5. **File References**: Relevant files and line numbers where applicable

### Priority Action Items

List items in order of priority with:

- Item description
- Priority level (Critical/High/Medium/Low)
- Estimated effort
- Dependencies
- Specific implementation steps

---

## Notes for the Auditor

- **Be thorough but efficient**: Focus on verifiable facts, not speculation
- **Provide context**: Explain why each gap matters for production
- **Be constructive**: Frame gaps as opportunities for improvement, not failures
- **Stay objective**: Base assessments on evidence, not assumptions
- **Prioritize logically**: Critical security and stability issues first
- **Reference code**: Point to specific files, functions, or configurations when possible

---

## Audit Execution

To execute this audit:

1. Read through the entire codebase systematically
2. Check each category methodically
3. Document findings with evidence (file paths, code snippets)
4. Generate the structured report
5. Provide actionable recommendations prioritized by impact

**Remember**: The goal is to provide a clear, objective assessment that helps the team understand what needs to be addressed before production deployment. Avoid unnecessary criticism or argumentation—focus on facts and actionable improvements.
