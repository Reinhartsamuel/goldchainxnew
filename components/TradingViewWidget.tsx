// 'use client'
// // TradingViewWidget.jsx
// import React, { useEffect, useRef, memo } from 'react';

// function TradingViewWidget() {
//   const container = useRef<HTMLDivElement>(null);

//   useEffect(
//     () => {
//       const script = document.createElement("script");
//       script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//       script.type = "text/javascript";
//       script.async = true;
//       script.innerHTML = `
//         {
//           "autosize": true,
//           "symbol": "FX_IDC:XAUIDR",
//           "interval": "D",
//           "timezone": "Etc/UTC",
//           "theme": "light",
//           "style": "2",
//           "locale": "en",
//           "enable_publishing": false,
//           "allow_symbol_change": true,
//           "support_host": "https://www.tradingview.com"
//         }`;
//       container.current?.appendChild(script);
//     },
//     []
//   );

//   return (
//     <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}/>
//   );
// }

// export default memo(TradingViewWidget);



'use client'

import React, { useEffect } from 'react';

const YourComponent: React.FC = () => {
    useEffect(() => {
        // Function to insert script tags dynamically
        const loadScript = (url: string, id: string) => {
            const script = document.createElement('script');
            script.src = url;
            script.id = id;
            script.async = true;
            document.body.appendChild(script);
        };

        // Insert the first script tag
        loadScript('https://harga-emas.org/widget/widget.js', 'hargaEmasWidgetScript');

        // Insert the second script tag after the first one has loaded
        const widgetScriptElement = document.getElementById('hargaEmasWidgetScript');

        if (widgetScriptElement) {
            widgetScriptElement.onload = () => {
                const widgetScript = document.createElement('script');
                widgetScript.text = `
          v_widget_type="chart_gold_antam";
          v_period=90; // hari
          v_width=900;
          v_height=500;
          he_org_show_chart(v_widget_type, v_period, v_width, v_height, 'div_chart_antam');
        `;
                document.body.appendChild(widgetScript);
            };
        }
    }, []);

    return (
        <div id="div_chart_antam" style={{ alignItems: 'center' }}></div>
    );
};

export default YourComponent;
