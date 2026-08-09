package stirling.software.SPDF.controller.api.misc;

import stirling.software.common.service.LoginAgreementService;

/**
 * Restores LoginDisclaimerController expected by tests.
 */
public class LoginDisclaimerController {

    public static record LoginDisclaimerResponse(boolean enabled, String content, boolean showInAnonymousMode, String format) {}

    private final LoginAgreementService loginAgreementService;

    public LoginDisclaimerController(LoginAgreementService loginAgreementService) {
        this.loginAgreementService = loginAgreementService;
    }

    public LoginDisclaimerResponse getLoginDisclaimer(String locale) {
        boolean enabled = loginAgreementService.isEnabled();
        boolean showInAnonymous = loginAgreementService.isShowInAnonymousMode();
        if (!enabled) {
            return new LoginDisclaimerResponse(false, "", showInAnonymous, "markdown");
        }
        String content = loginAgreementService.resolveContent(locale);
        if (content == null || content.trim().isEmpty()) {
            return new LoginDisclaimerResponse(false, "", showInAnonymous, "markdown");
        }
        return new LoginDisclaimerResponse(true, content, showInAnonymous, "markdown");
    }
}
