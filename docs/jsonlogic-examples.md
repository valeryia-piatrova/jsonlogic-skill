---
description: "Copy-paste JsonLogic examples: if/else, in and not in, contains, array length, reduce, all/some/none, null checks and date comparison."
---

# JsonLogic Examples: Real-World Rules

Copy-paste JsonLogic rules for common business logic. Each example shows the requirement in plain language, the rule, and sample data. All rules follow the official JsonLogic specification at [jsonlogic.com](https://jsonlogic.com).

## Discount tiers

Requirement: orders over $200 get 20% off, over $100 get 10% off, otherwise no discount.

```json
{
  "if": [
    { ">": [{ "var": "total" }, 200] }, 0.20,
    { ">": [{ "var": "total" }, 100] }, 0.10,
    0
  ]
}
```

Data: `{"total": 150}` returns `0.10`.

## Age gating

Requirement: allow access only to users 18 or older.

```json
{ ">=": [{ "var": "age" }, 18] }
```

Data: `{"age": 21}` returns `true`.

## Role-based access control

Requirement: admins always pass; editors pass during business hours.

```json
{
  "or": [
    { "==": [{ "var": "role" }, "admin"] },
    {
      "and": [
        { "==": [{ "var": "role" }, "editor"] },
        { ">=": [{ "var": "hour" }, 9] },
        { "<": [{ "var": "hour" }, 18] }
      ]
    }
  ]
}
```

## Required form fields

Requirement: the signup form is submittable only when name and email are present.

```json
{
  "and": [
    { "!": [{ "missing": ["name"] }] },
    { "!": [{ "missing": ["email"] }] }
  ]
}
```

The `missing` operator returns the names of absent fields, so wrapping it in `!` means "nothing is missing".

## Shipping cost

Requirement: free shipping over $50, otherwise $4.99.

```json
{
  "if": [
    { ">=": [{ "var": "total" }, 50] }, 0,
    4.99
  ]
}
```

## Feature flag by percentage

Requirement: enable the new checkout for 10% of users, keyed by user id hash.

```json
{ "<": [{ "%": [{ "var": "user_id" }, 100] }, 10] }
```

## Filter a list

Requirement: from a list of orders, keep only the paid ones.

```json
{
  "filter": [
    { "var": "orders" },
    { "==": [{ "var": "status" }, "paid"] }
  ]
}
```

Data: `{"orders": [{"status": "paid"}, {"status": "draft"}]}` returns the paid order only.

## Grade classification

Requirement: turn a numeric score into a letter grade.

```json
{
  "if": [
    { ">=": [{ "var": "score" }, 90] }, "A",
    { ">=": [{ "var": "score" }, 80] }, "B",
    { ">=": [{ "var": "score" }, 70] }, "C",
    "F"
  ]
}
```

## Null-safe greeting

Requirement: greet by name, or fall back to "Guest".

```json
{ "cat": ["Hello, ", { "var": ["user.name", "Guest"] }, "!"] }
```

The second element of the `var` array is the default when the path is missing.

## Date comparison

Requirement: the subscription is active when today is before the expiry date. (Dates compare as strings in `YYYY-MM-DD` format.)

```json
{ "<": [{ "var": "today" }, { "var": "expires_at" }] }
```

## In and not in a list

Requirement: ship only to Germany, France and Italy.

```json
{ "in": [{ "var": "country" }, ["DE", "FR", "IT"]] }
```

"Not in" is the same rule wrapped in `!`:

```json
{ "!": { "in": [{ "var": "country" }, ["DE", "FR", "IT"]] } }
```

## String contains

Requirement: the email field contains `@`.

```json
{ "in": ["@", { "var": "email" }] }
```

With a string as the second argument, `in` checks for a substring.

## Array length

JsonLogic has no `length` operator. Count with `reduce`:

```json
{ ">=": [
  { "reduce": [{ "var": "items" }, { "+": [{ "var": "accumulator" }, 1] }, 0] },
  3
] }
```

Data: `{"items": ["a", "b", "c"]}` returns `true`.

## Cart total

Requirement: sum price times quantity over all cart lines.

```json
{
  "reduce": [
    { "var": "cart" },
    { "+": [
      { "var": "accumulator" },
      { "*": [{ "var": "current.price" }, { "var": "current.qty" }] }
    ] },
    0
  ]
}
```

Data: `{"cart": [{"price": 10, "qty": 2}, {"price": 5, "qty": 1}]}` returns `25`.

## All, some and none

Requirement: every item is in stock.

```json
{ "all": [{ "var": "items" }, { ">": [{ "var": "stock" }, 0] }] }
```

Requirement: no item is blocked.

```json
{ "none": [{ "var": "items" }, { "==": [{ "var": "status" }, "blocked"] }] }
```

Inside `all`, `some`, `none`, `map` and `filter`, `var` refers to the current item, not the top-level data.

## Pick a field from each item

```json
{ "map": [{ "var": "items" }, { "var": "sku" }] }
```

Data: `{"items": [{"sku": "A1"}, {"sku": "B2"}]}` returns `["A1", "B2"]`.

## At least one contact field

Requirement: the user gave an email or a phone number.

```json
{ "!": { "missing_some": [1, ["email", "phone"]] } }
```

`missing_some` returns an empty list when at least 1 of the fields is present.

## Null and missing values

A missing `var` resolves to `null`, so this is `true` when there is no coupon:

```json
{ "==": [{ "var": "coupon" }, null] }
```

## Date in a range

Requirement: the date falls in 2026. `<=` with three arguments checks "between", and `YYYY-MM-DD` strings compare in date order.

```json
{ "<=": ["2026-01-01", { "var": "date" }, "2026-12-31"] }
```

## Generate rules from plain language

Writing these by hand works until the rules get nested three levels deep. The [jsonlogic-skill](https://github.com/valeryia-piatrova/jsonlogic-skill) generates, validates and debugs JsonLogic rules inside your AI coding assistant (Claude Code, Cursor, GitHub Copilot, Codex, Gemini CLI). Describe the requirement in words; get back a rule that has already been run against your data.

## Related

- [JsonLogic tutorial: write your first rule in 5 minutes](jsonlogic-tutorial.md)
- [How to validate a JsonLogic rule](jsonlogic-validator.md)
- [JsonLogic libraries by language](jsonlogic-libraries.md)
- [JsonLogic Playground & Editor](../playground.html)
