Blockly.defineBlocksWithJsonArray([
{
  "type": "wx14_begin",
  "message0": "WX14 begin UART %1 RX pin %2 baud %3",
  "args0": [
    {
      "type": "input_value",
      "name": "UART_ID",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "RX",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "BAUD",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#010101",
  "tooltip": "Start WX14 receiver with MicroPython machine.UART. RX pin is the only required signal pin.",
  "helpUrl": ""
},
{
  "type": "wx14_update",
  "message0": "WX14 update button state",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#010101",
  "tooltip": "Read latest WX14 data and update all button states.",
  "helpUrl": ""
},
{
  "type": "wx14_button",
  "message0": "WX14 button %1 pressed",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BUTTON",
      "options": [
        ["LU", "LU"],
        ["LL", "LL"],
        ["LR", "LR"],
        ["LD", "LD"],
        ["LT", "LT"],
        ["L1", "L1"],
        ["L2", "L2"],
        ["RU", "RU"],
        ["RL", "RL"],
        ["RR", "RR"],
        ["RD", "RD"],
        ["RT", "RT"],
        ["R1", "R1"],
        ["R2", "R2"]
      ]
    }
  ],
  "output": "Boolean",
  "colour": "#010101",
  "tooltip": "Return True when selected WX14 button is pressed.",
  "helpUrl": ""
},
{
  "type": "wx14_raw_data",
  "message0": "WX14 raw data",
  "output": "Number",
  "colour": "#010101",
  "tooltip": "Return raw 16-bit WX14 packet value.",
  "helpUrl": ""
},
{
  "type": "wx14_has_signal",
  "message0": "WX14 has signal",
  "output": "Boolean",
  "colour": "#010101",
  "tooltip": "Return True while the receiver still has valid recent data.",
  "helpUrl": ""
}
]);
