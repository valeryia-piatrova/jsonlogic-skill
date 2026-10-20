---
description: "JsonLogic engines and libraries for JavaScript (npm, TypeScript), Python, Java, Ruby, .NET/C#, Go, PHP and Rust, with install commands."
---

# JsonLogic Libraries and Engines by Language

JsonLogic is a format, not one library: every language has its own engine. The rule JSON stays the same, so one rule can run in your frontend and your backend.

| Language | Library | Install |
|---|---|---|
| JavaScript | [json-logic-js](https://github.com/jwadhams/json-logic-js) (the reference implementation) | `npm i json-logic-js` |
| JavaScript / TypeScript | [json-logic-engine](https://github.com/json-logic/json-logic-engine): faster, async support, ships its own types | `npm i json-logic-engine` |
| TypeScript types for json-logic-js | [@types/json-logic-js](https://www.npmjs.com/package/@types/json-logic-js) | `npm i -D @types/json-logic-js` |
| Python | [panzi-json-logic](https://github.com/panzi/panzi-json-logic), see [JsonLogic in Python](jsonlogic-python.md) | `pip install panzi-json-logic` |
| Java | [json-logic-java](https://github.com/jamsesso/json-logic-java), see [JsonLogic Java example](jsonlogic-java.md) | `io.github.jamsesso:json-logic-java` |
| Ruby / Rails | [json-logic-rb](https://github.com/tavrelkate/json-logic-rb), see [JsonLogic in Ruby and Rails](jsonlogic-ruby-rails.md) | `gem install json-logic-rb` |
| .NET / C# | [JsonLogic](https://github.com/json-everything/json-everything) from json-everything | `dotnet add package JsonLogic` |
| Go | [diegoholiveira/jsonlogic](https://github.com/diegoholiveira/jsonlogic) | `go get github.com/diegoholiveira/jsonlogic/v3` |
| PHP | [json-logic-php](https://github.com/jwadhams/json-logic-php) | `composer require jwadhams/json-logic-php` |
| Rust (+ Node, Python, Go, Java, .NET bindings) | [datalogic-rs](https://github.com/GoPlasmatic/datalogic-rs) | `cargo add datalogic-rs` |

## Do all engines give the same result?

Mostly, but not always. Engines differ on edge cases: string-to-number coercion, division by zero, missing `var` paths, and operators added beyond the [jsonlogic.com](https://jsonlogic.com/operations.html) list. If the same rule runs in two languages, test it in both.

## Which one should I use?

- **One language:** the library for that language from the table.
- **JavaScript, new project:** json-logic-engine. It is a drop-in replacement for json-logic-js.
- **Same rules in several languages with identical results:** datalogic-rs, one core with bindings.

## Write rules once, run them anywhere

The [JsonLogic skill](https://github.com/valeryia-piatrova/jsonlogic-skill) knows which operators each library supports. Ask your AI assistant for a rule "in Go" or "in Python" and it checks that the rule runs there. It works in Claude Code, Cursor, GitHub Copilot, Codex and Gemini CLI.

## Related

- [JsonLogic alternatives](jsonlogic-alternatives.md)
- [JsonLogic examples](jsonlogic-examples.md)
