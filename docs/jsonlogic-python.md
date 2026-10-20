---
description: "How to run JsonLogic in Python. Which pip package works on Python 3, install, evaluate a rule, and common pitfalls."
---

# JsonLogic in Python: Library, Install and Examples

To run JsonLogic in Python, install `panzi-json-logic` and call `jsonLogic(rule, data)`. It follows the [jsonlogic.com](https://jsonlogic.com) spec and works on current Python 3.

```bash
pip install panzi-json-logic
```

```python
from json_logic import jsonLogic

rule = {
    "if": [
        {">": [{"var": "total"}, 200]}, 0.2,
        {">": [{"var": "total"}, 100]}, 0.1,
        0,
    ]
}

jsonLogic(rule, {"total": 150})  # 0.1
```

Rules are plain dicts, so you can load them from JSON, a database column or an API:

```python
import json

rule = json.loads(rule_json)
jsonLogic(rule, {"role": "admin"})
```

## Which Python JsonLogic library to pick

| PyPI package | Import | Status |
|---|---|---|
| [`panzi-json-logic`](https://github.com/panzi/panzi-json-logic) | `from json_logic import jsonLogic` | Works on Python 3. Recommended for plain evaluation. |
| [`python-jsonlogic`](https://github.com/Viicos/jsonlogic) | `from jsonlogic import JSONLogicExpression` | Typed, extensible, can type-check rules against a JSON Schema. `var` paths use JSON Pointer style (`"/total"`) by default, not dots. |
| [`json-logic`](https://pypi.org/project/json-logic/) | `from json_logic import jsonLogic` | The oldest port and often the first search result. Version 0.6.3 fails on Python 3 with `TypeError: 'dict_keys' object is not subscriptable`. |

`panzi-json-logic` and `json-logic` both install a module named `json_logic`. Install only one of them.

## Common pitfalls

- **`'dict_keys' object is not subscriptable`**: you installed `json-logic`. Switch to `panzi-json-logic`.
- **`Unresolvable` with `python-jsonlogic`**: write `{"var": "/total"}`, or pass `DotReferenceParser` in the evaluation settings.
- **`"true"` is not `True`**: data from forms or query strings arrives as strings. Convert before evaluating, or `{"==": [{"var": "vip"}, true]}` stays `False`.

## Generate and debug rules with AI

The [JsonLogic skill](https://github.com/valeryia-piatrova/jsonlogic-skill) turns a plain-language requirement into a JsonLogic rule, runs it against your data, and explains why a rule returns the wrong result. It works in Claude Code, Cursor, GitHub Copilot, Codex and Gemini CLI.

## Related

- [JsonLogic examples](jsonlogic-examples.md)
- [How to validate a JsonLogic rule](jsonlogic-validator.md)
- [JsonLogic libraries by language](jsonlogic-libraries.md)
