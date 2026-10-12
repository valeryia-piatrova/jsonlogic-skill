---
description: "JsonLogic in Ruby and Ruby on Rails with the json-logic-rb gem. Store rules in a jsonb column, validate them, and evaluate against model data."
---

# JsonLogic in Ruby and Rails

Use the [json-logic-rb](https://github.com/tavrelkate/json-logic-rb) gem and call `JsonLogic.apply(rule, data)`.

```ruby
# Gemfile
gem "json-logic-rb"
```

```ruby
require "json_logic"

rule = { "and" => [
  { ">=" => [{ "var" => "total" }, 100] },
  { "in" => [{ "var" => "country" }, ["DE", "FR"]] }
] }

JsonLogic.apply(rule, { "total" => 150, "country" => "DE" }) # => true
```

Use string keys in both the rule and the data. That is what `JSON.parse` and a `jsonb` column give you.

## Rules as data in Rails

The point of JsonLogic is that rules live in the database, not in code. Store them in a `jsonb` column:

```ruby
class AddRuleToPromotions < ActiveRecord::Migration[7.1]
  def change
    add_column :promotions, :rule, :jsonb, null: false, default: {}
  end
end
```

```ruby
class Promotion < ApplicationRecord
  validate :rule_must_be_an_object

  def applies_to?(order)
    JsonLogic.apply(rule, order.as_json(only: %i[total country]))
  end

  private

  def rule_must_be_an_object
    errors.add(:rule, "must be a JsonLogic object") unless rule.is_a?(Hash)
  end
end
```

- Pass only the attributes the rule needs (`as_json(only: ...)`), not the whole record.
- Rules come from admins or an API, so treat them as input: validate on save, and test each stored rule against sample data before enabling it.
- On MySQL or SQLite use a `json` column. The model code stays the same.

## Generate and debug rules with AI

The [JsonLogic skill](https://github.com/valeryia-piatrova/jsonlogic-skill) runs rules with json-logic-rb by default. Describe the business rule in words and get a JsonLogic rule that has already been run against your data. It works in Claude Code, Cursor, GitHub Copilot, Codex and Gemini CLI.

## Related

- [JsonLogic examples](jsonlogic-examples.md)
- [JsonLogic libraries by language](jsonlogic-libraries.md)
