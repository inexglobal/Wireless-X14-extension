function wx14MPDefinitions() {
  Blockly.Python.definitions_['from_machine_import_uart_pin'] = 'from machine import UART, Pin';
  Blockly.Python.definitions_['from_time_import_ticks'] = 'from time import ticks_ms, ticks_diff';

  Blockly.Python.definitions_['wx14_class'] = `
class WX14:
    def __init__(self):
        self.last_time = ticks_ms()
        self.sample_time = 100
        self.uart = None
        self.LU = False
        self.LL = False
        self.LR = False
        self.LD = False
        self.LT = False
        self.L1 = False
        self.L2 = False
        self.RU = False
        self.RL = False
        self.RR = False
        self.RD = False
        self.RT = False
        self.R1 = False
        self.R2 = False
        self.rawData = 0
        self.hasSignal = False

    def clear_buttons(self):
        self.LT = False
        self.L2 = False
        self.L1 = False
        self.LU = False
        self.LR = False
        self.LL = False
        self.LD = False
        self.RT = False
        self.R2 = False
        self.R1 = False
        self.RU = False
        self.RR = False
        self.RL = False
        self.RD = False
        self.rawData = 0
        self.hasSignal = False

    def begin(self, uart_id=1, rx_pin=5, baudrate=9600):
        # Try RX-only UART first. Some MicroPython ports allow this.
        try:
            self.uart = UART(int(uart_id), baudrate=int(baudrate), rx=Pin(int(rx_pin)))
        except TypeError:
            # Some ports require a TX pin even if this receiver does not transmit.
            self.uart = UART(int(uart_id), baudrate=int(baudrate), rx=Pin(int(rx_pin)), tx=Pin(int(rx_pin) + 1))
        self.last_time = ticks_ms()
        self.clear_buttons()

    def parse_buttons(self, value):
        self.rawData = value

        if value != 0x0000:
            self.LT = (value & 0x4000) != 0
            self.L2 = (value & 0x2000) != 0
            self.L1 = (value & 0x1000) != 0
            self.LU = (value & 0x0800) != 0
            self.LL = (value & 0x0400) != 0
            self.LR = (value & 0x0200) != 0
            self.LD = (value & 0x0100) != 0

            self.RT = (value & 0x0040) != 0
            self.R2 = (value & 0x0020) != 0
            self.R1 = (value & 0x0010) != 0
            self.RU = (value & 0x0008) != 0
            self.RR = (value & 0x0004) != 0
            self.RL = (value & 0x0002) != 0
            self.RD = (value & 0x0001) != 0
            self.hasSignal = True
        else:
            self.clear_buttons()

    def getButton(self):
        value = 0
        has_packet = False

        if self.uart is None:
            self.clear_buttons()
            return False

        available = self.uart.any()
        if available >= 2:
            # Keep only the newest complete 2-byte packet.
            while self.uart.any() >= 2:
                buf = self.uart.read(2)
                if buf is None or len(buf) != 2:
                    break

                b0 = buf[0]
                b1 = buf[1]

                if b0 & 0x80:
                    b0, b1 = b1, b0

                value = (b1 << 8) | b0
                has_packet = True

            if has_packet:
                self.last_time = ticks_ms()

                if value != 0x8000:
                    self.parse_buttons(value)
                    return True

                self.clear_buttons()
                return False

        if ticks_diff(ticks_ms(), self.last_time) >= self.sample_time:
            self.clear_buttons()
            return False

        self.hasSignal = True
        return True
`;

  Blockly.Python.definitions_['wx14_object'] = 'wx14 = WX14()';
}

Blockly.Python['wx14_begin'] = function(block) {
  wx14MPDefinitions();

  var uart_id = Blockly.Python.valueToCode(block, 'UART_ID', Blockly.Python.ORDER_ATOMIC) || '1';
  var rx = Blockly.Python.valueToCode(block, 'RX', Blockly.Python.ORDER_ATOMIC) || '5';
  var baud = Blockly.Python.valueToCode(block, 'BAUD', Blockly.Python.ORDER_ATOMIC) || '9600';

  var code = `wx14.begin(${uart_id}, ${rx}, ${baud})\n`;
  return code;
};

Blockly.Python['wx14_update'] = function(block) {
  wx14MPDefinitions();

  var code = 'wx14.getButton()\n';
  return code;
};

Blockly.Python['wx14_button'] = function(block) {
  wx14MPDefinitions();

  var button = block.getFieldValue('BUTTON');
  var code = `wx14.${button}`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['wx14_raw_data'] = function(block) {
  wx14MPDefinitions();

  var code = 'wx14.rawData';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['wx14_has_signal'] = function(block) {
  wx14MPDefinitions();

  var code = 'wx14.hasSignal';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Arduino fallback: this extension is intended for MicroPython code generation.
Blockly.JavaScript['wx14_begin'] = function(block) {
  return '// WX14 MicroPython extension is not for Arduino code generation.\\n';
};

Blockly.JavaScript['wx14_update'] = function(block) {
  return '// WX14 MicroPython update is not for Arduino code generation.\\n';
};

Blockly.JavaScript['wx14_button'] = function(block) {
  return ['false', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['wx14_raw_data'] = function(block) {
  return ['0', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['wx14_has_signal'] = function(block) {
  return ['false', Blockly.JavaScript.ORDER_ATOMIC];
};
