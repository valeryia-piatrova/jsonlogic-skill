---
description: "JsonLogic Java example with json-logic-java. Maven and Gradle setup, evaluating a rule against a Map, and truthiness."
---

# JsonLogic Java Example: Evaluate Rules in Java

The most used JsonLogic library for Java is [json-logic-java](https://github.com/jamsesso/json-logic-java). It takes the rule as a JSON string and the data as a `Map` or POJO.

## Maven

```xml
<dependency>
  <groupId>io.github.jamsesso</groupId>
  <artifactId>json-logic-java</artifactId>
  <version>1.1.0</version>
</dependency>
```

## Gradle

```groovy
implementation "io.github.jamsesso:json-logic-java:1.1.0"
```

## Example

```java
import io.github.jamsesso.jsonlogic.JsonLogic;
import java.util.Map;

public class Discount {
    public static void main(String[] args) throws Exception {
        JsonLogic jsonLogic = new JsonLogic();

        String rule = """
            {"if": [{">": [{"var": "total"}, 200]}, 0.2,
                    {">": [{"var": "total"}, 100]}, 0.1, 0]}
            """;

        Object discount = jsonLogic.apply(rule, Map.of("total", 150));
        System.out.println(discount); // 0.1
    }
}
```

`apply` returns `Object`. For yes/no rules, use JsonLogic truthiness instead of casting:

```java
Object result = jsonLogic.apply("{\">=\": [{\"var\": \"age\"}, 18]}", Map.of("age", 21));
boolean allowed = JsonLogic.truthy(result); // true
```

Create one `JsonLogic` instance and reuse it across requests.

## Other JVM options

- [json-logic-kmp](https://github.com/KTGypsy/json-logic-kmp): Kotlin Multiplatform (JVM and Swift).
- [datalogic-rs](https://github.com/GoPlasmatic/datalogic-rs): Rust core with Java bindings, if you need identical results across several languages.

## Generate and debug rules with AI

The [JsonLogic skill](https://github.com/valeryia-piatrova/jsonlogic-skill) writes the rule from a plain-language requirement, runs it, and explains wrong results. It works in Claude Code, Cursor, GitHub Copilot, Codex and Gemini CLI.

## Related

- [JsonLogic examples](jsonlogic-examples.md)
- [JsonLogic libraries by language](jsonlogic-libraries.md)
