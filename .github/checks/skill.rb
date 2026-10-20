# frozen_string_literal: true

# Checks what the agent and the plugin installer read: SKILL.md frontmatter,
# plugin manifests, and that every example returns its stated result in json-logic-rb.

require "json"
require "yaml"
require "json_logic"

Encoding.default_external = Encoding::UTF_8

errors = []

frontmatter = File.read("SKILL.md")[/\A---\n(.*?)\n---\n/m, 1]
abort "SKILL.md: missing frontmatter" unless frontmatter
meta = YAML.safe_load(frontmatter)
errors << "SKILL.md: name must be lowercase letters, digits, hyphens (max 64)" unless meta["name"].to_s.match?(/\A[a-z0-9-]{1,64}\z/)
description = meta["description"].to_s
errors << "SKILL.md: description is missing" if description.empty?
errors << "SKILL.md: description is #{description.length} chars (max 1024)" if description.length > 1024

Dir[".claude-plugin/*.json"].each do |path|
  manifest = JSON.parse(File.read(path))
  errors << "#{path}: name is missing" if manifest["name"].to_s.empty?
rescue JSON::ParserError => e
  errors << "#{path}: #{e.message}"
end

Dir["examples/*.json"].each do |path|
  JSON.parse(File.read(path)).fetch("examples").each do |example|
    got = begin
      JsonLogic.apply(example["rule"], example["data"])
    rescue StandardError => e
      e
    end
    next if got == example["expected"]

    errors << "#{path} \"#{example["name"]}\": expected #{example["expected"].inspect}, got #{got.inspect}"
  end
end

abort errors.join("\n") unless errors.empty?
puts "SKILL.md, plugin manifests and examples OK"
