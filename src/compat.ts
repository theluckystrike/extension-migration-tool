/**
 * Compat Checker — Check MV3 compatibility of an extension
 */
export class CompatChecker {
    /** Check manifest for MV3 issues */
    static check(manifest: Record<string, unknown>): Array<{ severity: 'error' | 'warning' | 'info'; message: string }> {
        const issues: Array<{ severity: 'error' | 'warning' | 'info'; message: string }> = [];
        if (manifest.manifest_version !== 3) issues.push({ severity: 'error', message: 'manifest_version must be 3' });
        if ((manifest.background as any)?.scripts) issues.push({ severity: 'error', message: 'background.scripts must be replaced with background.service_worker' });
        if ((manifest.background as any)?.persistent) issues.push({ severity: 'error', message: 'persistent background pages are not supported in MV3' });
        if (manifest.browser_action) issues.push({ severity: 'error', message: 'browser_action must be renamed to action' });
        if (manifest.page_action) issues.push({ severity: 'error', message: 'page_action must be renamed to action' });
        const perms = manifest.permissions as string[] || [];
        if (perms.includes('webRequestBlocking')) issues.push({ severity: 'error', message: 'webRequestBlocking not available in MV3, use declarativeNetRequest' });
        if (typeof manifest.content_security_policy === 'string') issues.push({ severity: 'warning', message: 'content_security_policy must be an object in MV3' });
        if (Array.isArray(manifest.web_accessible_resources) && manifest.web_accessible_resources.length > 0 && typeof manifest.web_accessible_resources[0] === 'string') {
            issues.push({ severity: 'warning', message: 'web_accessible_resources must use object format in MV3' });
        }
        const hostPerms = perms.filter((p) => p.includes('://') || p === '<all_urls>');
        if (hostPerms.length) issues.push({ severity: 'info', message: `${hostPerms.length} host permission(s) should be moved to host_permissions` });
        return issues;
    }
}
