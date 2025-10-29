/*
Language: IEC 61131-3 Structured Text (ST)
Description: IEC 61131-3 Structured Text (ST) is a high-level programming language for PLCs.
Author: Goodwill Mzumala <fisothemes@gmail.com>
Website: https://content.helpme-codesys.com/en/CODESYS%20Development%20System/_cds_f_reference_programming.html
Category: common, industrial, plc
*/

export default function (hljs) {
  const KEYWORDS = [
    "PROGRAM",
    "END_PROGRAM",
    "FUNCTION",
    "END_FUNCTION",
    "FUNCTION_BLOCK",
    "END_FUNCTION_BLOCK",
    "INTERFACE",
    "END_INTERFACE",
    "PROPERTY",
    "END_PROPERTY",
    "GET",
    "END_GET",
    "SET",
    "END_SET",
    "METHOD",
    "END_METHOD",
    "ACTION",
    "END_ACTION",
    "TYPE",
    "END_TYPE",
    "STRUCT",
    "END_STRUCT",
    "UNION",
    "END_UNION",
    "VAR",
    "END_VAR",
    "VAR_INPUT",
    "VAR_OUTPUT",
    "VAR_IN_OUT",
    "VAR_GLOBAL",
    "VAR_TEMP",
    "VAR_EXTERNAL",
    "VAR_STAT",
    "VAR_INST",
    "VAR_ACCESS",
    "VAR_CONFIG",
    "PARAMS",
    "PERSISTENT",
    "RETAIN",
    "READ_ONLY",
    "READ_WRITE",
    "CONSTANT",
    "EXTENDS",
    "IMPLEMENTS",
    "OF",
    "IF",
    "THEN",
    "ELSE",
    "END_IF",
    "FOR",
    "DO",
    "END_FOR",
    "WHILE",
    "END_WHILE",
    "REPEAT",
    "UNTIL",
    "END_REPEAT",
    "CASE",
    "END_CASE",
    "RETURN",
    "CONTINUE",
    "EXIT",
    "JMP",
    "JMPC",
    "JMPCN",
    "AND",
    "OR",
    "ORN",
    "AND_THEN",
    "OR_ELSE",
    "XOR",
    "XORN",
    "NOT",
    "R",
    "S",
    "THIS",
    "SUPER",
    "__SYSTEM",
  ];

  const TYPES = [
    "BOOL",
    "BIT",
    "SINT",
    "INT",
    "DINT",
    "LINT",
    "USINT",
    "UINT",
    "UDINT",
    "ULINT",
    "__XINT",
    "__UXINT",
    "REAL",
    "LREAL",
    "TIME",
    "LTIME",
    "DATE",
    "DATE_AND_TIME",
    "DT",
    "TIME_OF_DAY",
    "TOD",
    "STRING",
    "WSTRING",
    "ANY_STRING",
    "BYTE",
    "WORD",
    "DWORD",
    "LWORD",
    "ANY",
    "ANY_BIT",
    "ANY_DATE",
    "ANY_INT",
    "ANY_NUM",
    "ANY_REAL",
    "%I*",
    "%Q*",
  ];

  const BUILT_IN = [
    "ABS",
    "SQRT",
    "LN",
    "LOG",
    "EXP",
    "EXPT",
    "SIN",
    "COS",
    "TAN",
    "ASIN",
    "ACOS",
    "ATAN",
    "ATAN2",
    "SHL",
    "SHR",
    "ROL",
    "ROR",
    "GT",
    "GE",
    "LT",
    "LE",
    "EQ",
    "NE",
    "MIN",
    "MAX",
    "LIMIT",
    "SEL",
    "MUX",
    "TO_INT",
    "TO_DINT",
    "TO_LINT",
    "TO_REAL",
    "TO_LREAL",
    "TO_BOOL",
    "TO_TIME",
    "TO_DATE",
    "TO_LTIME",
    "TO_DT",
    "TO_DATE_AND_TIME",
    "TO_TIME_OF_DAY",
    "TO_TOD",
    "TO_BYTE",
    "TO_WORD",
    "TO_DWORD",
    "TO_LWORD",
    "TRUNC",
    "ROUND",
    "TRUNC_INT",
    "SIZEOF",
    "XSIZEOF",
    "ADR",
    "ADRINST",
    "__NEW",
    "__DELETE",
    "__ISVALIDREF",
    "__QUERYINTERFACE",
    "__QUERYPOINTER",
    "__VARINFO",
    "__POUNAME",
    "__POSITION",
    "UPPER_BOUND",
    "LOWER_BOUND",
  ];

  const COMMENT = {
    className: "comment",
    variants: [
      hljs.C_LINE_COMMENT_MODE,
      { begin: "\\(\\*", end: "\\*\\)", contains: ["self"] },
    ],
  };

  const DIRECTIVE = {
    className: "meta",
    variants: [
      {
        begin: /\{\$/,
        end: /\}/,
      },
      {
        begin: /\(\*\$/,
        end: /\*\)/,
      },
    ],
  };

  const STRING = {
    className: "string",
    variants: [
      {
        begin: /"/,
        end: /"/,
      },
      {
        begin: /'/,
        end: /'/,
      },
    ],
  };

  const OPERATORS_LIST = [
    "+",
    "-",
    "*",
    "/",
    "^",
    ">",
    "<",
    "=",
    ":=",
    ":",
    ";",
    ",",
    ".",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "$",
  ];

  const OPERATOR_RE = new RegExp(
    `(${OPERATORS_LIST.map(
      (op) => op.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") // escape regex chars
    ).join("|")})`
  );

  const OPERATORS = {
    className: "operator",
    begin: OPERATOR_RE,
  };

  const TYPED_LITERALS = {
    className: "literal",
    variants: [
      {
        begin: "\\b(2|D?L?WORD#2)#[01]+(_[01]+)*\\b",
      },
      {
        begin: "\\b(BOOL|BIT)#[0-9]+(_[0-9]+)*\\b",
      },
      {
        begin: "\\b(8|(D|L)?WORD#8)#[0-9]+(_[0-9]+)*\\b",
      },
      {
        begin: "\\b(16|(D|L)?WORD#16)#[0-9A-F]+(_[0-9A-F]+)*\\b",
      },
      {
        begin: "\\b((S|D|L|US|U|UD|UL)?INT|(D|L)?WORD)#[0-9]+(_[0-9A-F]+)*\\b",
      },
      {
        begin:
          "\\bL?REAL#[0-9]+(?:_[0-9]+)*(?:\\.[0-9]+(?:_[0-9]+)*)?(?:[eE][-+]?[0-9]+(?:_[0-9]+)*)?\\b",
      },
      {
        begin:
          "\\b(T|TIME)#(\\d+d)?(\\d+h)?(\\d+m)?(\\d+s)?(\\d+ms)?(\\d+us)?\\b",
      },
      {
        begin:
          "\\b(LT|LTIME)#(\\d+d)?(\\d+h)?(\\d+m)?(\\d+s)?(\\d+ms)?(\\d+us)?(\\d+ns)?\\b",
      },
      {
        begin: "\\b(L?D|L?DATE)#\\d{4}-\\d{1,2}-\\d{1,2}\\b",
      },
      {
        begin:
          "\\b(L?TOD|L?TIME_OF_DAY)#\\d{1,2}:\\d{1,2}:\\d{1,2}(\\.\\d+)?\\b",
      },
      {
        begin:
          "\\b(L?DT|L?DATE_AND_TIME)#\\d{4}-\\d{1,2}-\\d{1,2}-\\d{1,2}:\\d{1,2}:\\d{1,2}(\\.\\d+)?\\b",
      },
    ],
  };

  const NUMBER = {
    className: "number",
    variants: [
      {
        begin:
          "\\b[0-9]+(?:_[0-9]+)*(?:\\.[0-9]+(?:_[0-9]+)*)?(?:[eE][-+]?[0-9]+(?:_[0-9]+)*)?\\b",
      },
    ],
  };

  const POINTER_TYPE = {
    className: "type",
    begin: /\bPOINTER\s+TO\b/i,
    contains: ["self"],
    end: /\b\w+\b/i,
  };

  const REFERENCE_TYPE = {
    className: "type",
    begin: /\bREFERENCE\s+TO\b/i,
    end: /\b((?:(?!REFERENCE\s+TO)\w+))\b/i,
    returnEnd: true,
  };

  const ARRAY_TYPE = {
    className: "type",
    begin: /\bARRAY\s*\[/,
    end: /\]\s*OF\b/i,
    contains: [
      COMMENT,
      {
        className: "number",
        begin: /([a-zA-Z_]\w*|\d+|\*)\s*\.\.\s*([a-zA-Z_]\w*|\d+)/,
        relevance: 0,
      },
    ],
  };

  return {
    name: "IEC 61131-3 Structured Text",
    aliases: ["iecst", "iec-st", "iec61131", "scl", "stl", "structured-text"],
    case_insensitive: true,
    keywords: {
      keyword: KEYWORDS.join(" "),
      literal: "TRUE FALSE",
      type: TYPES.join(" "),
      built_in: BUILT_IN.join(" "),
    },
    contains: [
      COMMENT,
      STRING,
      DIRECTIVE,
      TYPED_LITERALS,
      NUMBER,
      POINTER_TYPE,
      REFERENCE_TYPE,
      ARRAY_TYPE,
      OPERATORS,
    ],
  };
}
