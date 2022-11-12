export const featureFlags = {
  /**
   *
   */
  enable_console_finance_panel: "enable_console_finance_panel",
  /**
   *
   */
  enable_console_member_panel: "enable_console_member_panel",
  /**
   *
   */
  enable_console_reminders_panel: "enable_console_reminders_panel",
  /**
   *
   */
  enable_darkmode_toggle: "enable_darkmode_toggle",
  /**
   *
   */
  enable_alternative_email_backup: "enable_alternative_email_backup",
  /**
   *
   */
  enable_mfa: "enable_mfa",
  /**
   *
   */
  enable_mobile_auth: "enable_mobile_auth",
  /**
   *
   */
  enable_module_account_setting: "enable_module_account_setting",
  /**
   *
   */
  enable_module_chat: "enable_module_chat",
  /**
   *
   */
  enable_module_members: "enable_module_members",
  /**
   *
   */
  enable_module_profile: "enable_module_profile",
  /**
   *
   */
  enable_password_change: "enable_password_change",
  /**
   *
   */
  enable_search_omnibar: "enable_search_omnibar",
  /**
   *
   */
  enable_self_registration: "enable_self_registration",
  /**
   *
   */
  show_navbar_notification_dropdown: "show_navbar_notification_dropdown",
  /**
   *
   */
  show_navbar_services_dropdown: "show_navbar_services_dropdown",
  /**
   *
   */
  show_navbar_messages_dropdown: "show_navbar_messages_dropdown",
  /**
   *
   */
  enable_edit_avatar: "enable_edit_avatar",
  /**
   *
   */
  enable_module_finance: "enable_module_finance",
  /**
   *
   */
  enable_module_event_calendar: "enable_module_event_calendar",
  /**
   *
   */
  enable_module_travel_planner: "enable_module_travel_planner",
  /**
   *
   */
  enable_module_biteform: "enable_module_biteform",
  /**
   *
   */
  enable_module_document: "enable_module_document",
};

/**
 * Create a local featureFlags config based on Growthbook and
 * turn all features on for local development (ONLY)
 * @returns
 */
export const getFeatureFlags = (excepts?: string[]) => {
  const values = Object.values(featureFlags);
  const features = {} as { [k: string]: { defaultValue: boolean } };

  values.forEach((feature: string) => {
    if (excepts && excepts.length > 0) {
      features[feature] = {
        defaultValue: excepts.indexOf(feature) === -1,
      };
    } else {
      features[feature] = {
        defaultValue: true,
      };
    }
  });
  return features;
};
