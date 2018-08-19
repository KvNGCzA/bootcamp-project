module.exports = {
    "extends": ["eslint:recommended", "airbnb"],
        "env": {
            "browser": true,
            "commonjs": true,
            "es6": true
        },
        "parserOptions": {
            "ecmaVersion": 2015,
            "sourceType": "module"
        },
        "rules": {
            "indent": [
                "error",
                "tab"
            ],
            "linebreak-style": [
                "error",
                "windows"
            ],
            "quotes": [
                "error",
                "single"
            ],
            "semi": [
                "error",
                "always"
            ]
    }
    
};