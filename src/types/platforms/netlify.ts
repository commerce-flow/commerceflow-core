export interface NetlifySite {
  id: 'string';
  state: 'string';
  plan: 'string';
  name: 'string';
  custom_domain: 'string';
  domain_aliases: ['string'];
  branch_deploy_custom_domain: 'string';
  deploy_preview_custom_domain: 'string';
  password: 'string';
  notification_email: 'string';
  url: 'string';
  ssl_url: 'string';
  admin_url: 'string';
  screenshot_url: 'string';
  created_at: 'string';
  updated_at: 'string';
  user_id: 'string';
  session_id: 'string';
  ssl: true;
  force_ssl: true;
  managed_dns: true;
  deploy_url: 'string';
  published_deploy: {
    id: 'string';
    site_id: 'string';
    user_id: 'string';
    build_id: 'string';
    state: 'string';
    name: 'string';
    url: 'string';
    ssl_url: 'string';
    admin_url: 'string';
    deploy_url: 'string';
    deploy_ssl_url: 'string';
    screenshot_url: 'string';
    review_id: 0;
    draft: true;
    required: ['string'];
    required_functions: ['string'];
    error_message: 'string';
    branch: 'string';
    commit_ref: 'string';
    commit_url: 'string';
    skipped: true;
    created_at: 'string';
    updated_at: 'string';
    published_at: 'string';
    title: 'string';
    context: 'string';
    locked: true;
    review_url: 'string';
    site_capabilities: {
      large_media_enabled: true;
    };
    framework: 'string';
    function_schedules: [
      {
        name: 'string';
        cron: 'string';
      }
    ];
  };
  account_name: 'string';
  account_slug: 'string';
  git_provider: 'string';
  deploy_hook: 'string';
  capabilities: {
    property1: {};
    property2: {};
  };
  processing_settings: {
    skip: true;
    css: {
      bundle: true;
      minify: true;
    };
    js: {
      bundle: true;
      minify: true;
    };
    images: {
      optimize: true;
    };
    html: {
      pretty_urls: true;
    };
  };
  build_settings: {
    id: 0;
    provider: 'string';
    deploy_key_id: 'string';
    repo_path: 'string';
    repo_branch: 'string';
    dir: 'string';
    functions_dir: 'string';
    cmd: 'string';
    allowed_branches: ['string'];
    public_repo: true;
    private_logs: true;
    repo_url: 'string';
    env: {
      property1: 'string';
      property2: 'string';
    };
    installation_id: 0;
    stop_builds: true;
  };
  id_domain: 'string';
  default_hooks_data: {
    access_token: 'string';
  };
  build_image: 'string';
  prerender: 'string';
}

export interface NetlifyEnvVar {
  key: 'string';
  scopes: ['builds'];
  values: [
    {
      id: 'string';
      value: 'string';
      context: 'all';
      context_parameter: 'string';
    }
  ];
  updated_at: '2019-08-24T14:15:22Z';
  updated_by: {
    id: 'string';
    full_name: 'string';
    email: 'string';
    avatar_url: 'string';
  };
}

export interface NetlifyAccount {
  id: 'string';
  name: 'string';
  slug: 'string';
  type: 'string';
  capabilities: {
    sites: {
      included: 0;
      used: 0;
    };
    collaborators: {
      included: 0;
      used: 0;
    };
  };
  billing_name: 'string';
  billing_email: 'string';
  billing_details: 'string';
  billing_period: 'string';
  payment_method_id: 'string';
  type_name: 'string';
  type_id: 'string';
  owner_ids: ['string'];
  roles_allowed: ['string'];
  created_at: 'string';
  updated_at: 'string';
}

export interface NetlifyUser {
  id: 'string';
  uid: 'string';
  full_name: 'string';
  avatar_url: 'string';
  email: 'string';
  affiliate_id: 'string';
  site_count: 0;
  created_at: 'string';
  last_login: 'string';
  login_providers: ['string'];
  onboarding_progress: {
    slides: 'string';
  };
}
