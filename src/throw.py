data = ["login", "id", "avatar_url", "gravatar_id", "url", "html_url", "followers_url", "following_url", "gists_url", "starred_url", "subscriptions_url", "organizations_url", "repos_url", "events_url", "received_events_url", "type", "site_admin", "name", "company", "blog", "location", "email", "hireable", "bio", "public_repos", "public_gists", "followers", "following", "created_at", "updated_at"]
data2 = ["id", "type", "actor", "repo", "payload", "public", "created_at"]

for i in data2:
    print("<p>{this.state.data." + i + "}</p>")