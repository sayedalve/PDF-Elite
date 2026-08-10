*** Begin Patch
*** Update File: app/proprietary/src/main/java/stirling/software/proprietary/mcp/security/McpSecurityConfig.java
@@
-    private SecurityFilterChain apiKeyFilterChain(HttpSecurity http) throws Exception {
-        applyCors(http);
-        http.securityMatcher(BASE_PATH, BASE_PATH + "/**")
+    private SecurityFilterChain apiKeyFilterChain(HttpSecurity http) throws Exception {
+        applyCors(http);
+        // Ensure the RFC 9728 protected-resource metadata path is also covered by the API-key chain
+        String metadataPath = "/.well-known/oauth-protected-resource";
+        http.securityMatcher(BASE_PATH, BASE_PATH + "/**", metadataPath, metadataPath + "/**")
                 // CSRF intentionally disabled: /mcp is a stateless JSON-RPC API authenticated by an
                 // out-of-band X-API-KEY header (or Authorization: Bearer <key>). No cookies, no
                 // session, no form submissions; a browser cannot trick a victim into sending the
                 // header cross-origin, so the CSRF attack model does not apply. CodeQL flags this
                 // generically; the SessionCreationPolicy.STATELESS below is the relevant guarantee.
                 .csrf(csrf -> csrf.disable())
*** End Patch