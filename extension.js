({
    name: "Wireless-X14",
    description: "WX14 receiver for MicroPython using machine.UART",
    author: "INEX / microBlock",
    category: "Device Control",
    version: "1.0.0",
    icon: "/static/icon.png",
    color: "#010101",
    blocks: [
        {
            xml: `
                <block type="wx14_begin">
                    <value name="UART_ID">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="RX">
                        <shadow type="math_number">
                            <field name="NUM">5</field>
                        </shadow>
                    </value>
                    <value name="BAUD">
                        <shadow type="math_number">
                            <field name="NUM">9600</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="wx14_update"></block>
            `
        },
        {
            xml: `
                <block type="wx14_button"></block>
            `
        },
        {
            xml: `
                <block type="wx14_raw_data"></block>
            `
        },
        {
            xml: `
                <block type="wx14_has_signal"></block>
            `
        }
    ]
});
