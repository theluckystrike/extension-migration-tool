/**
 * Manifest Converter — Convert MV2 manifest to MV3
 */
export class ManifestConverter {
    /** Convert MV2 manifest.json to MV3 */
    static convert(mv2: Record<string, unknown>): Record<string, unknown> {
        const mv3: Record<string, unknown> = { ...mv2, manifest_version: 3 };

        // background.scripts → background.service_worker
        if ((mv2.background as any)?.scripts) {
            mv3.background = { service_worker: (mv2.background as any).scripts[0] || 'background.js' };
        }

        // browser_action → action
        if (mv2.browser_action) { mv3.action = mv2.browser_action; delete mv3.browser_action; }
        if (mv2.page_action) { mv3.action = mv2.page_action; delete mv3.page_action; }

        // web_accessible_resources → array format
        if (Array.isArray(mv2.web_accessible_resources) && typeof mv2.web_accessible_resources[0] === 'string') {
            mv3.web_accessible_resources = [{ resources: mv2.web_accessible_resources as string[], matches: ['<all_urls>'] }];
        }

        // content_security_policy → object
        if (typeof mv2.content_security_policy === 'string') {
            mv3.content_security_policy = { extension_pages: mv2.content_security_policy as string };
        }

        // host_permissions from permissions
        if (Array.isArray(mv2.permissions)) {
            const hostPerms = (mv2.permissions as string[]).filter((p) => p.includes('://') || p === '<all_urls>');
            const apiPerms = (mv2.permissions as string[]).filter((p) => !p.includes('://') && p !== '<all_urls>');
            if (hostPerms.length) mv3.host_permissions = hostPerms;
            mv3.permissions = apiPerms;
        }

        return mv3;
    }

    /** Get migration warnings */
    static getWarnings(mv2: Record<string, unknown>): string[] {
        const warnings: string[] = [];
        if ((mv2.background as any)?.scripts?.length > 1) warnings.push('Multiple background scripts must be merged into one service worker');
        if ((mv2.background as any)?.persistent === true) warnings.push('Persistent background pages are not supported in MV3');
        const perms = mv2.permissions as string[] || [];
        if (perms.includes('webRequestBlocking')) warnings.push('webRequestBlocking replaced by declarativeNetRequest in MV3');
        if (perms.includes('tabs')) warnings.push('Consider using activeTab instead of tabs permission');
        return warnings;
    }
}
