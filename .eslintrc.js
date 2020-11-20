module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    globals: {
        "HtmlService": "readonly",
        "LockService": "readonly",
        "SpreadsheetApp": "readonly",
        "PropertiesService": "readonly",
        "Logger": "readonly",
        "Session": "readonly",
        "MailApp": "readonly",
        "ReactBootstrap": "readonly",
        "ReactDOM": "readonly",
        "React": "readonly",
        "context": "readonly",
        "BSON": "readonly"
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 11
    },
    rules: {
        "eqeqeq": "error",
        "strict": "error",
        "no-var": "error",
        "prefer-const": "error",
        "no-console": "off",
        "indent": [
            "error", 4,
            { "SwitchCase": 1 }           
        ],
        "no-multi-spaces": [
            "error", { 
                exceptions: { 
                    "VariableDeclarator": true,
                    "Property": true
                } 
        }],
        "key-spacing": [
            "error", { "align": { } }
        ],
        "switch-colon-spacing": [
            "error", {
                "after": true,
                "before": true
            }
        ],
        "quotes": [
            "error", "single", "avoid-escape"
        ],
        "semi": [
            "error", "always"
        ]
    }
}
